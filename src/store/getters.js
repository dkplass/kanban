const getters = {
  language: state => state.app.language,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  permission_routes: state => state.permission.routes,
  time_tables: state => state.selectData.TimeTables,
  work_node: state => state.selectData.WorkNode
}

export default getters
