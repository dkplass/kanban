function containsObject(obj, list) {
  let x = 0

  for (x = 0; x < list.length; x++) {
    if (JSON.stringify(list[x]) === JSON.stringify(obj)) {
      return true
    }
  }

  return false
}

// eslint-disable-next-line no-unused-vars
function randomRGBA() {
  var o = Math.round
  var r = Math.random
  var s = 255
  return `rgba(${o(r() * s)}, ${o(r() * s)}, ${o(r() * s)}, 1)`
  // return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')'
}

/**
 * @description 迴路達成率折線圖
 * @param {array} data
 * @return {object}
 */

export function loopProgressRateToLineChart(data) {
  const result = {
    labels: [],
    datasets: []
  }

  const timespanList = []

  const _data = data

  // X軸資料為間區隔
  _data.forEach(element => {
    const timeSpan = {
      BeginDateTime: element.BeginDateTime,
      EndDateTime: element.EndDateTime
    }
    if (!containsObject(timeSpan, timespanList)) {
      timespanList.push(timeSpan)
      result.labels.push([timeSpan.BeginDateTime, '~', timeSpan.EndDateTime])
    }
  })

  // 整理出以WorkNodeNo為一組的dataset
  _data.forEach(element => {
    const dataSet = {
      label: '',
      fill: false,
      data: []
    }

    // const exist = result.datasets.find(i => i.label === element.WorkNodeNo)
    const exist = result.datasets.find(i => i.label === `${element.bWorkNodeNo}-${element.eWorkNodeNo}`)

    if (!exist) {
      dataSet.label = `${element.bWorkNodeNo}-${element.eWorkNodeNo}`
      // dataSet.label = element.bWorkNodeNo

      result.datasets.push(dataSet)
    }
  })

  result.datasets.forEach(dataset => {
    timespanList.forEach(label => {
      _data.forEach(element => {
        if (element.BeginDateTime === label.BeginDateTime && element.EndDateTime === label.EndDateTime && `${element.bWorkNodeNo}-${element.eWorkNodeNo}` === dataset.label) {
          const progressrate = element.FinishRate
          dataset.data.push(progressrate)
        }
      })
    })
  })

  // result.datasets.forEach(dataset => {
  //   timespanList.forEach(label => {
  //     _data.forEach(element => {
  //       if (element.BeginDateTime === label.BeginDateTime && element.EndDateTime === label.EndDateTime && element.WorkNodeNo === dataset.label) {
  //         // console.log(typeof element.OutputQty, typeof element.BadQty)
  //         const progressrate = ((element.OutputQty - element.BadQty) * 100) / element.OutputQty || 0
  //         dataset.data.push(progressrate)
  //       }
  //     })
  //   })
  // })

  // if (result.datasets.length > 0) {
  //   result.datasets[0]['borderColor'] = 'rgba(259,177,89,1)'
  //   result.datasets[0]['strokeColor'] = 'rgba(220,180,0,1)'
  //   result.datasets[0]['pointBackgroundColor'] = 'rgba(220,180,0,1)'

  //   result.datasets[1]['borderColor'] = 'rgba(151,187,205,1)'
  //   result.datasets[1]['strokeColor'] = 'rgba(151,187,205,1)'
  //   result.datasets[1]['pointBackgroundColor'] = 'rgba(151,187,205,1)'
  // }

  // result.datasets[0]['fillColor'] = 'rgba(220,220,220,0)'
  // result.datasets[0]['strokeColor'] = 'rgba(220,180,0,1)'
  // result.datasets[0]['pointColor'] = 'rgba(220,180,0,1)'

  // result.datasets[1]['fillColor'] = 'rgba(151,187,205,0)'
  // result.datasets[1]['strokeColor'] = 'rgba(151,187,205,1)'
  // result.datasets[1]['pointColor'] = 'rgba(151,187,205,1)'

  const storeColor = [
    'rgba(255,164,91,1)',
    'rgba(255,218,119,1)',
    'rgba(251,246,240,1)',
    'rgba(174,230,230,1)',
    'rgba(190,220,250,1)',
    'rgba(152,172,248,1)',
    'rgba(176,136,249,1)',
    'rgba(218,159,249,1)'
  ]

  if (result.datasets.length > 0) {
    result.datasets.forEach((dataset, index) => {
      const color = storeColor[index] || 'rgba(255, 255, 255, 1)'
      dataset.borderColor = color
      dataset.strokeColor = color
      dataset.pointBackgroundColor = color
    })
  }

  return result
}

// eslint-disable-next-line no-unused-vars
const fake = [
  {
    'ComNo': 'L1 ',
    'AsNo': 'L2002-0015',
    'bWorkNodeNo': 'GI',
    'bOutputQty': 0.0,
    'eWorkNodeNo': 'CI',
    'eOutputQty': 0.0,
    'FinishRate': 90,
    'BadQty': 0.0,
    'BeginDateTime': '2020-11-27T07:30:00',
    'EndDateTime': '2020-11-27T09:30:00'
  },
  {
    'ComNo': 'L1 ',
    'AsNo': 'L2002-0015',
    'bWorkNodeNo': 'GI',
    'bOutputQty': 0.0,
    'eWorkNodeNo': 'CI',
    'eOutputQty': 0.0,
    'FinishRate': 110,
    'BadQty': 0.0,
    'BeginDateTime': '2020-11-27T09:30:00',
    'EndDateTime': '2020-11-27T11:30:00'
  },
  {
    'ComNo': 'L1 ',
    'AsNo': 'L2002-0015',
    'bWorkNodeNo': 'GI',
    'bOutputQty': 0.0,
    'eWorkNodeNo': 'CI',
    'eOutputQty': 0.0,
    'FinishRate': 40,
    'BadQty': 0.0,
    'BeginDateTime': '2020-11-27T12:30:00',
    'EndDateTime': '2020-11-27T14:30:00'
  },
  {
    'ComNo': 'L1 ',
    'AsNo': 'L2002-0015',
    'bWorkNodeNo': 'GI',
    'bOutputQty': 0.0,
    'eWorkNodeNo': 'CI',
    'eOutputQty': 0.0,
    'FinishRate': 80,
    'BadQty': 0.0,
    'BeginDateTime': '2020-11-27T14:30:00',
    'EndDateTime': '2020-11-27T16:30:00'
  },
  {
    'ComNo': 'L1 ',
    'AsNo': 'L2002-0015',
    'bWorkNodeNo': 'GI',
    'bOutputQty': 0.0,
    'eWorkNodeNo': 'CO',
    'eOutputQty': 0.0,
    'FinishRate': 30,
    'BadQty': 0.0,
    'BeginDateTime': '2020-11-27T07:30:00',
    'EndDateTime': '2020-11-27T09:30:00'
  },
  {
    'ComNo': 'L1 ',
    'AsNo': 'L2002-0015',
    'bWorkNodeNo': 'GI',
    'bOutputQty': 0.0,
    'eWorkNodeNo': 'CO',
    'eOutputQty': 0.0,
    'FinishRate': 10,
    'BadQty': 0.0,
    'BeginDateTime': '2020-11-27T09:30:00',
    'EndDateTime': '2020-11-27T11:30:00'
  },
  {
    'ComNo': 'L1 ',
    'AsNo': 'L2002-0015',
    'bWorkNodeNo': 'GI',
    'bOutputQty': 0.0,
    'eWorkNodeNo': 'CO',
    'eOutputQty': 0.0,
    'FinishRate': 100,
    'BadQty': 0.0,
    'BeginDateTime': '2020-11-27T12:30:00',
    'EndDateTime': '2020-11-27T14:30:00'
  },
  {
    'ComNo': 'L1 ',
    'AsNo': 'L2002-0015',
    'bWorkNodeNo': 'GI',
    'bOutputQty': 0.0,
    'eWorkNodeNo': 'CO',
    'eOutputQty': 0.0,
    'FinishRate': 50,
    'BadQty': 0.0,
    'BeginDateTime': '2020-11-27T14:30:00',
    'EndDateTime': '2020-11-27T16:30:00'
  }
]
