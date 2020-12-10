export function NodesYieldRate(data, endWorkNode) {
  let _data = data;
  const _endWorkNode = endWorkNode;
  let result = [];

  _data = _data.filter(element => {
    if (element.WorkNodeNo !== _endWorkNode) {
      return false; // skip
    }
    return true;
  });

  result = _data.map(element => {
    const set = {
      nodeNo: element.WorkNodeNo,
      nodeTitle: `${element.BeginDateTime} ~ ${element.EndDateTime}`,
      chartData: {
        labels: [],
        datasets: []
      }
    };

    let goodRate = ((element.OutputQty - element.BadQty) * 100) / element.OutputQty || 0;
    let badRate = 100 - goodRate;

    if (element.OutputQty === 0 && element.BadQty === 0) {
      goodRate = 100;
      badRate = 0;
    }

    set.chartData.labels = ['良率', '不良率'];
    set.chartData.datasets[0] = {
      backgroundColor: ['#6bcab6', '#c71e1d'],
      data: [goodRate, badRate]
    };

    return set;
  });

  return result;
}
