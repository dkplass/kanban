export function nodeYieldRateToPieChart(data, endWorkNode) {
  /*
  [
    {
      node: '',
      chartData: {
        labels: ['良率', '不良率'],
        datasets: [{
          backgroundColor: [],
          data: []
        }]
      }
    }
  ]
  */

  let _data = data
  const _endWorkNode = endWorkNode
  let result = []

  _data = _data.filter(element => {
    if (element.WorkNodeNo !== _endWorkNode) {
      return false // skip
    }
    return true
  })

  result = _data.map(element => {
    const set = {
      nodeNo: element.WorkNodeNo,
      nodeTitle: `${element.BeginDateTime} ~ ${element.EndDateTime}`,
      chartData: {
        labels: [],
        datasets: []
      }
    }

    const goodRate = ((element.OutputQty - element.BadQty) * 100) / element.OutputQty || 0
    const badRate = 100 - goodRate

    set.chartData.labels = ['良率', '不良率']
    set.chartData.datasets[0] = {
      backgroundColor: ['#6bcab6', '#c71e1d'],
      data: [goodRate, badRate]
    }

    return set
  })

  console.log(result)

  return result
}
