import axios from '@/utils/axios'

/**
 * 查询
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export function checkStatus(data) {
    return axios({
        method: 'get',
        data: data,
        url: 'monitor/data'
    })
}
