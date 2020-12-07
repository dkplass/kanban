import request from '@/utils/request'

/**
 * @description 取得該單號下所有的迴路編號
 * @param {comNo, asNo} data
 */
export function GetLoop(data) {
  return request({
    url: '/SelectData/GetLoop',
    method: 'post',
    data
  })
}

/**
 * @description 取得該單號及迴路下的所有報工點
 * @param {comNo, asNo, loopNum} data
 */
export function GetWorkNode(data) {
  return request({
    url: '/SelectData/GetWorkNode',
    method: 'post',
    data
  })
}

/**
 * @description 取得該公司別下所有的時間區段
 * @param {comNo} data
 */
export function GetTimeTables(data) {
  return request({
    url: '/SelectData/GetTimeTables',
    method: 'post',
    data
  })
}

