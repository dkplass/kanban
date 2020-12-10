function containsObject(obj, list) {
  let x = 0;

  for (x = 0; x < list.length; x++) {
    if (JSON.stringify(list[x]) === JSON.stringify(obj)) {
      return true;
    }
  }

  return false;
}

/**
 * @description 報工點產出線圖資料
 * @param {array} data
 * @return {object}
 */

export function NodesOutput(data) {
  const result = {
    labels: [],
    datasets: []
  };

  const timespanList = [];

  const _data = data;

  // X軸資料為間區隔
  _data.forEach(element => {
    const timeSpan = {
      BeginDateTime: element.BeginDateTime,
      EndDateTime: element.EndDateTime
    };
    if (!containsObject(timeSpan, timespanList)) {
      timespanList.push(timeSpan);
      result.labels.push([timeSpan.BeginDateTime, '~', timeSpan.EndDateTime]);
    }
  });

  // 整理出以WorkNodeNo為一組的dataset
  _data.forEach(element => {
    const dataSet = {
      label: '',
      fill: false,
      data: []
    };

    const exist = result.datasets.find(i => i.label === element.WorkNodeNo);

    if (!exist) {
      dataSet.label = element.WorkNodeNo;

      result.datasets.push(dataSet);
    }
  });

  result.datasets.forEach(dataset => {
    timespanList.forEach(label => {
      _data.forEach(element => {
        if (element.BeginDateTime === label.BeginDateTime && element.EndDateTime === label.EndDateTime && element.WorkNodeNo === dataset.label) {
          // console.log(typeof element.OutputQty, typeof element.BadQty)
          const output = element.OutputQty;
          dataset.data.push(output);
        }
      });
    });
  });

  const storeColor = [
    'rgba(255,164,91,1)',
    'rgba(255,218,119,1)',
    'rgba(251,246,240,1)',
    'rgba(174,230,230,1)',
    'rgba(190,220,250,1)',
    'rgba(152,172,248,1)',
    'rgba(176,136,249,1)',
    'rgba(218,159,249,1)'
  ];

  if (result.datasets.length > 0) {
    result.datasets.forEach((dataset, index) => {
      const color = storeColor[index] || 'rgba(255, 255, 255, 1)';
      dataset.borderColor = color;
      dataset.strokeColor = color;
      dataset.pointBackgroundColor = color;
    });
  }

  return result;
}
