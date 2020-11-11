const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const rm = require('rimraf')
const commander = require('commander')
const packageJSON = require('../package')
const beautify = require('js-beautify').js_beautify
const pathToRegexp = require('path-to-regexp')
const config = require('./config')

const templatePath = path.join(__dirname, config.templatesDir)
const apiRender = getRender('api.js')
const storeRender = getRender('store.js')
const mixinRender = getRender('mixin.js')

/**
 * 读取模板渲染函数
 * @param file
 */
function getRender(file) {
  return require(path.join(templatePath, file))
}

/**
 * 转换成规范的js命名，如：sys_log.js 转换成 sysLog
 * @param name
 */
function toSchemaName(name) {
  return _.camelCase(name.replace('.js', ''))
}

/**
 * 获取架构配置文件列表
 * @param root 从那个路径开始查找
 * @param parent 当前的目录名称，可选
 * @returns {Array}
 */
function getSchemaFiles(root, parent) {
  let fileList = []
  let files = fs.readdirSync(root)
  _.each(files, function (file) {
    let filePath = path.join(root, file)
    let stat = fs.lstatSync(filePath)
    if (stat.isDirectory()) {
      fileList = fileList.concat(getSchemaFiles(filePath, file))
    } else {
      if (file.indexOf('.js') > 0) {
        fileList.push({
          name: toSchemaName(parent ? [parent, file].join('_') : file),
          path: filePath
        })
      }
    }
  })
  return fileList
}

/**
 * 根据配置文件生成配置JSON
 * @param files
 * @returns {{}}
 */
function getSchemaInfo(files) {
  let models = {}
  _.each(files, function (file) {
    models[file.name] = require(file.path)
  })
  return models
}

/**
 * 创建文件
 * @param path
 * @param fileName
 * @param content
 */
function writeFile(path, fileName, content) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
  fs.writeFileSync(path + toKebabCase(fileName) + '.js', content, { encoding: 'utf8' })
}

function toUpperCase(name) {
  return name.toUpperCase()
}

/**
 * Foo Bar | --foo-bar | __foo_bar__ => fooBar
 * @param name
 */
function toCamelCase(name) {
  return _.camelCase(name)
}

/**
 * Foo Bar | fooBar | --foo-bar => foo_bar
 * @param name
 */
function toSnakeCase(name) {
  return _.snakeCase(name)
}

/**
 * fooBar => foo-bar
 * @param name
 */
function toKebabCase(name) {
  return _.kebabCase(name)
}

function toUpperSnakeCaseName(name) {
  return toUpperCase(toSnakeCase(name))
}

/**
 * 格式化js代码
 * @param content
 * @returns {*}
 */
function beautifyJs(content) {
  content = content.replace(/(\r\n|\n)\s*/g, '\n')
    .replace(/\(\n/g, '(')
    .replace(/,\n/g, ',')
    .replace(/\/\*\*/g, '\n/**')
    .replace(/\n\/\//g, '\n\n//')

  return beautify(content, {
    indent_with_tabs: false,
    indent_size: 2,
    jslint_happy: true,
    end_with_newline: true,
    space_after_anon_function: true
  })
}

/**
 * JSON转换成字符串，并把双引号转换成单引号
 * @param json
 */
function stringify(json) {
  let str = JSON.stringify(json)
  return str ? str.replace(/'/g, '\\\'').replace(/"/g, '\'') : ''
}

/**
 * 解析models
 * @param schemas
 * @returns {{}}
 */
function parseSchemas(schemas) {
  let result = {}
  _.each(schemas, function (schema, name) {
    result[name] = parseModel(schema.model, name, schema.vuex)
  })
  return result
}

function getTitle(name, item, info) {
  let methodComment = config.methodCommentMap[item.methodType] || item.title || '<%=cname%> ' + (item.upperSnakeCaseName || '')
  return _.template(methodComment)({ cname: info[name].name || name })
}

/**
 * 解析单个model
 * @param model
 * @param name
 * @param vuex
 * @returns {Array}
 */
function parseModel(model, name, vuex) {
  let result = []
  if (_.isArray(model)) {
    _.each(model, function (item) {
      if (item.disabled !== true && item.path) {
        result = result.concat(parseModel(item, name, vuex))
      }
    })
  } else {
    if (model.disabled !== true && model.path) {
      if (model.methods === false) {
        if (!model.name) {
          throw Error('methods为false时，必须要设置name')
        }
        if (vuex && (!model.state && !model.method)) {
          throw Error('vuex模式，methods为false，并且method为空时，必须要设置state')
        }

        if (model.method && !config.methods.includes(model.method)) {
          throw Error('method的值必须是' + config.methods.join(' ') + '中的一个')
        }
        // ajax请求类型
        let httpMethod = config.methodTypeMap[model.method || model.name] || 'post'

        let options = _.extend({}, { method: httpMethod }, model.options || {})
        result.push({
          path: model.path,
          prefix: model.prefix || config.pathPrefix,
          transform: model.transform,
          options: options,
          columns: model.columns,
          methodType: model.method || model.name,
          httpMethod: options.method,
          suffix: '',
          upperSnakeCaseName: toUpperSnakeCaseName(model.name),
          camelCaseName: toCamelCase(model.name),
          template: model.template,
          name: model.name,
          state: model.state,
          title: model.title,
          cache: model.cache,
          socket: model.socket
        })
      } else {
        let methods = model.methods || config.methods
        _.each(methods, function (method) {

          // 检测是否开启了批量删除
          if (method === 'batch' && !config.batchEnabled) return

          // ajax请求类型
          let httpMethod = config.methodTypeMap[method] || 'get'
          // axios options
          let options = _.extend({}, { method: httpMethod }, model.options || {})
          result.push({
            path: model.path,
            transform: model.transform,
            prefix: model.prefix || config.pathPrefix,
            suffix: config.methodSuffixMap[method] || '',
            options: options,
            columns: model.columns,
            methodType: method,
            httpMethod: httpMethod,
            upperSnakeCaseName: toUpperSnakeCaseName(method + '_' + name),
            camelCaseName: toCamelCase(method + '_' + name),
            template: model.template,
            title: model.title,
            cache: model.cache,
            socket: model.socket
          })
        })
      }
    }
  }
  return result
}

/**
 * 生成api文件
 */
function writeApi(json, info) {
  _.each(json, function (model, name) {
    let items = [], configKeys = [], transforms = []
    _.each(model, function (item) {
      if (item.prefix) {
        configKeys.push(item.prefix)
      }
      if (item.transform) {
        transforms.push(item.transform)
      }
      let url = item.path + item.suffix
      let keys = []
      pathToRegexp(url, keys)

      // 去重，在数组中已存在的URL不加进去
      if (!items.some(n => n.URL === item.upperSnakeCaseName)) {
        items.push({
          URL: item.upperSnakeCaseName,
          url: item.path + item.suffix,
          prefix: item.prefix,
          params: keys.map(n => n.name),
          camelCaseName: item.camelCaseName,
          options: item.options,
          ajaxParam: 'data',
          transform: item.transform,
          title: getTitle(name, item, info),
          cache: item.cache,
          socket: item.socket
        })
      }
    })
    // 去重
    configKeys = _.uniq(configKeys)
    transforms = _.uniq(transforms)
    const outPath = path.join(__dirname, config.outApiPath)
    writeFile(outPath, name, beautifyJs(apiRender({
      cname: info[name].name,
      name: name,
      transforms: transforms,
      configKeys: configKeys,
      items: items
    })))
  })
}


/**
 * 生成mixin文件
 */
function writeMixin(json, info) {
  let extendsArray = []
  _.each(json, function (model, name) {
    if (info[name].vuex) {
      return
    }
    extendsArray.push(name)
    let importTypeArray = [],
      importApiArray = [],
      customStateArray = [],
      items = []
    _.each(model, function (item) {
      importTypeArray.push(item.upperSnakeCaseName)
      importApiArray.push(item.camelCaseName)
      if (item.state) {
        customStateArray.push({
          state: item.state,
          title: item.title || item.upperSnakeCaseName
        })
      }
      let url = item.path + item.suffix
      let keys = []
      pathToRegexp(url, keys)

      items.push({
        NAME: item.upperSnakeCaseName,
        name: item.camelCaseName,
        state: item.state,
        params: keys.map(n => n.name),
        httpMethod: item.httpMethod,
        methodType: item.methodType,
        ajaxParam: 'data',
        title: getTitle(name, item, info),
        cache: item.cache
      })
    })
    importTypeArray = _.uniq(importTypeArray)
    importApiArray = _.uniq(importApiArray)
    customStateArray = _.uniq(customStateArray)
    const outPath = path.join(__dirname, config.outMixinPath)
    writeFile(outPath, name, beautifyJs(mixinRender({
      name: name,
      cname: info[name].name || name,
      kebabCaseName: toKebabCase(name),
      importTypeArray: importTypeArray,
      importApiArray: importApiArray,
      customStateArray: customStateArray,
      page: config.statePageName || 'page',
      limit: config.statePageSizeName || 'limit',
      total: config.stateTotalName || 'total',
      list: config.stateListName || 'list',
      model: config.stateModelName || 'model',
      items: items
    })))
  })
}

/**
 * 生成store文件
 */
function writeStore(json, info) {
  let types = {}
  let modules = [], extendsArray = []
  _.each(json, function (model, name) {
    if (!info[name].vuex) {
      return
    }
    modules.push(`import ${name} from '@/base/store/${toKebabCase(name)}'`)
    extendsArray.push(name)

    let importTypeArray = [],
      importApiArray = [],
      customStateArray = [],
      items = []
    types[name] = []
    _.each(model, function (item) {
      types[name].push({
        name: item.upperSnakeCaseName,
        title: getTitle(name, item, info)
      })
      importTypeArray.push(item.upperSnakeCaseName)
      importApiArray.push(item.camelCaseName)
      if (item.state) {
        customStateArray.push({
          state: item.state,
          title: item.title || item.upperSnakeCaseName
        })
      }
      let url = item.path + item.suffix
      let keys = []
      pathToRegexp(url, keys)
      items.push({
        NAME: item.upperSnakeCaseName,
        name: item.camelCaseName,
        state: item.state,
        params: keys.map(n => n.name),
        httpMethod: item.httpMethod,
        methodType: item.methodType,
        ajaxParam: 'data',
        title: getTitle(name, item, info),
        cache: item.cache
      })
    })
    importTypeArray = _.uniq(importTypeArray)
    importApiArray = _.uniq(importApiArray)
    customStateArray = _.uniq(customStateArray)
    const outPath = path.join(__dirname, config.outStorePath)
    writeFile(outPath, name, beautifyJs(storeRender({
      name: name,
      cname: info[name].name || name,
      kebabCaseName: toKebabCase(name),
      importTypeArray: importTypeArray,
      importApiArray: importApiArray,
      customStateArray: customStateArray,
      page: config.statePageName || 'page',
      limit: config.statePageSizeName || 'limit',
      total: config.stateTotalName || 'total',
      list: config.stateListName || 'list',
      model: config.stateModelName || 'model',
      items: items
    })))
  })
  const outStore = path.join(__dirname, config.outStoreType)
  modules.push(`export default {${extendsArray.join(', ')}}`)
}

const schemaFiles = getSchemaFiles(path.join(__dirname, config.schemasDir))
const schemaInfo = getSchemaInfo(schemaFiles)
const schemaJSON = parseSchemas(schemaInfo)

function build(dir) {
  console.log('开始生成代码.....')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  setTimeout(() => {
    writeApi(schemaJSON, schemaInfo)
    writeStore(schemaJSON, schemaInfo)
    writeMixin(schemaJSON, schemaInfo)
    console.log('代码生成完成！')
  }, 100)
}

commander.version(packageJSON.version)
  .option('-f, --force', '是否删除目录')
  .parse(process.argv);

const _path = path.join(__dirname, '../src/base/')
if (commander.force) {
  rm.sync(_path)
}
build(_path)
