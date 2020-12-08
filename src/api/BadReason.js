import request from '@/utils/request'

/**
 * @description 取得迴路中各點在時間段的狀態
 * @param {ComNo, AsNo, LoopNum, BeginDateTime, EndDateTime, LangNo, TimeTableNo} data
 */
export function GetBadReasons(data) {
  return request({
    url: '/BadReason/GetBadReasons',
    method: 'post',
    data
  })
}
