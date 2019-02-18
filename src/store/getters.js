const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token && JSON.parse(state.user.token),
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  //业务模块getter
}
export default getters
