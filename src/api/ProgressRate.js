import request from '@/utils/request';

/**
 * @description 取得迴路中各點在時間段的狀態
 * @param {ComNo, AsNo, LoopNum, BeginDateTime, EndDateTime, TimeTableNo} data
 */
export function GetLoopProgressRate(data) {
  return request({
    url: '/ProgressRate/GetLoopProgressRate',
    method: 'post',
    data
  });
}

/**
 * @description 取得該迴路的第一個報工點
 * @param {comNo, asNo, loopNum} data
 */
export function GetLoopFisrtWorkNode(data) {
  return request({
    url: '/ProgressRate/GetLoopFisrtWorkNode',
    method: 'post',
    data
  });
}

/**
 * @description 取得該迴路的最終報工點
 * @param {comNo,asNo,loopNum} data
 */
export function GetLoopLastWorkNode(data) {
  return request({
    url: '/ProgressRate/GetLoopLastWorkNode',
    method: 'post',
    data
  });
}

/**
 * @description 取得該迴路的最終報工點
 * @param {ProgressRateViewModels: Array,WorkNodesFilters: Object} data
 */
export function GetWorkNodesInterval(data) {
  return request({
    url: '/ProgressRate/GetWorkNodesInterval',
    method: 'post',
    data
  });
}
