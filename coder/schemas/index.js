module.exports = {
    // 是否生成store，如果设置false，不生成store，只会生成mixin
    vuex: false,
    model: [{
        title: '全国来港情况',
        // 接口地址路径，必须
        path: 'S01-SF',
        // 接口地址前缀，可选，默认为空, 名称必须要在 src/config.js中定义，否则报错
        prefix: 'baseUrl',
        // 生成请求方法，默认全部，如需要自定义，设置为false
        methods: false,
        options: {
            method: 'get'
        },
        // 自定义方法名称，methods为false，必须要设置
        name: 'chinaGet'
    }]
};