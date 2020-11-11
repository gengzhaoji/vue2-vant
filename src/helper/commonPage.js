import Vue from 'vue'

// 扫描当前目录下.vue结尾的文件，并扫描子文件夹
const componentsContext = require.context('../components/common', true, /\.vue$/)
// 枚举componentsContext对象组
componentsContext.keys().forEach(component => {
    const componentConfig = componentsContext(component)
    // 文件名作组件名
    // component --> ./HeaderBar/main.vue
    // let name = component.replace('../../pages/commComponents', '').replace('/main.vue', '')
    // 兼容 import export 和 require module.export 两种规范
    const ctrl = componentConfig.default || componentConfig
    Vue.component(ctrl.name, ctrl)
})
