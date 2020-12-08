/**
 * @description 報工點不良原因長條圖
 * @param {array} data
 * @return {object}
 */
export function NodesBadReason(data) {
  console.log(data)

  /**
    {
      labels: []
      datasets: [
        {
          label
          backgroundColor
          data
        }
      ]
    }
   */

  const result = {
    labels: [],
    datasets: [
      {
        maxBarThickness: 40,
        backgroundColor: 'rgba(255,164,91,1)',
        data: []
      }
    ]
  }

  const _data = JSON.parse(JSON.stringify(data))

  // X軸資料為不良原因
  result.labels = _data.map(element => element.BadReasonName)
  // _data.forEach(element => {
  //   const found = reasonList.find(reason => reason === element.BadReasonName)

  //   if (!found) {
  //     reasonList.push(element.BadReasonName)
  //   }
  // })

  // 整理出以不良原因為一組的dataset
  result.datasets[0].data = _data.map(element => element.Qty)

  // reasonList.forEach(element => {
  //   const sumQty = _data.reduce((accumulator, currentValue) => {
  //     accumulator += currentValue.OutputQty
  //   }, 0)

  //   result.datasets[0].data.push(sumQty)
  // })

  return result
}
