import axios from '@/utils/axios'

/**
 * 新增
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export function personnelInsert(data) {
    return axios({
        method: 'post',
        data: data,
        url: '/service/personnel/insert'
    })
}

/**
 * 查询
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export function personnelQuery(data) {
    return axios({
        method: 'get',
        data: data,
        url: '/service/personnel/query'
    })
}

/**
 * 查询
 * @param {object} [data] 发送键值对数据
 * @returns {promise}
 */
export function vehicleQuery(data) {
    return axios({
        method: 'get',
        data: data,
        url: '/service/vehicle/query'
    })
}
