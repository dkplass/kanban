const jsonFiles = require.context('./th', true, /\.json$/)

const jsons = jsonFiles.keys().reduce((jsons, jsonPath) => {
  const json = jsonPath.replace(/^\.\/(.*)\.\w+$/, '$1')
  let value

  try {
    value = jsonFiles(jsonPath) || {}
  } catch {
    value = {}
  }

  jsons[json] = value

  return jsons
}, {})

export default jsons
