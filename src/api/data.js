import axios from '@/libs/api.request'
export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: '/api/image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getTreeSelectData = () => {
  return axios.request({
    url: 'get_tree_select_data',
    method: 'get'
  })
}
//新增管理员
export const addAdminUser = adminData =>{
  return axios.request({
    url:'/admin/add',
    data:adminData,
    method:'post'
  })
}
//新增公告
export const addNotice = noticeData =>{
  return axios.request({
    url:'/notice/add',
    data:noticeData,
    method:'post'
  })
}
//获取最新公告
export const getNoticeLatest = () =>{
  return axios.request({
    url:'/notice/get/latest',
    method:'get'
  })
}
//编辑公告
export const editNotice = noticeData =>{
  return axios.request({
    url:'/notice/edit',
    data:noticeData,
    method:'post'
  })
}
//同步學期
export const syncSemester = () =>{
  return axios.request({
    url:'/sync/semester',
    method:'post'
  })
}
//同步學院
export const syncFaculty = () =>{
  return axios.request({
    url:'/sync/college',
    method:'post'
  })
}
//同步課程
export const syncCourse = () =>{
  return axios.request({
    url:'/sync/lesson',
    method:'post'
  })
}


