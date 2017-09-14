import Fetch from '../fetch';
// demo
export let demo = (...arg) => Fetch.post('demo', ...arg);

// 免登配置信息请求
export let get_free_login_cfg = (...arg) => Fetch.post('/jsTicket/getCfg.rjson', ...arg);
// 免登认证
export let get_free_login_auth = (...arg) => Fetch.post('/jsTicket/auth.rjson', ...arg);
// 企业会话消息(用户反馈方法)发送
export let send_corp_msg_by_code = (...arg) => Fetch.post('/message/sendCorpMsgByCode.rjson', ...arg);

// 部门信息列表
export let user_info_dept_list = (...arg) => Fetch.post('user/info/dept/list.rjson', ...arg);
// 人员信息列表
export let user_info_user_list = (...arg) => Fetch.post('user/info/user/list.rjson', ...arg);

// 业务对象配置字段获取
export let business_get_business_list = (...arg) => Fetch.post('business/deploy/list.rjson', ...arg);
// 业务对象配置字段获取
export let business_get_business_field_list = (...arg) => Fetch.post('business/deploy/field/list.rjson', ...arg);
// 业务对象配置字段保存
export let business_save_business_field_list = (...arg) => Fetch.post('business/deploy/field/save.rjson', ...arg);
// 业务对象配置字段删除
export let business_delete_business_field_list = (...arg) => Fetch.post('business/deploy/field/delete.rjson', ...arg);
// 业务对象配置布局保存
export let business_save_business_layout_list = (...arg) => Fetch.post('user/info/dept/sync.rjson', ...arg);

// 获取公司所有角色
export let premission_get_role_list = (...arg) => Fetch.post('premission/get/role/list.rjson', ...arg);
// 获取角色对应权限
export let premission_get_role_premission_list = (...arg) => Fetch.post('premission/get/role/permission/list.rjson', ...arg);
// 设置角色对应权限
export let premission_init_role = (...arg) => Fetch.post('premission/init/role/permission.rjson', ...arg);
// 获取数据权限列表
export let premission_get_data_list = (...arg) => Fetch.post('premission/role/viewdata/list.rjson', ...arg);
// 设置数据权限
export let premission_init_data = (...arg) => Fetch.post('premission/init/role/viewdata.rjson', ...arg);
// 初始化公司模块及角色
export let premission_init_corp_module = (...arg) => Fetch.post('premission/init/corp/module.rjson', ...arg);
// 删除角色
export let premission_delete_role = (...arg) => Fetch.post('premission/delete/role.rjson', ...arg);
// 新增角色
export let premission_add_role = (...arg) => Fetch.post('premission/add/role.rjson', ...arg);
// 更新公司默认角色
export let premission_update_default_role = (...arg) => Fetch.post('premission/update/default/role.rjson', ...arg);
// 更新用户角色
export let premission_update_user_role = (...arg) => Fetch.post('premission/update/user/role.rjson', ...arg);
// 更新角色信息
export let premission_update_role = (...arg) => Fetch.post('premission/update/role.rjson', ...arg);
// 校验角色名称
export let premission_check_role_name = (...arg) => Fetch.post('premission/check/role/name.rjson', ...arg);
// 初始化业务配置对象接口 [只在测试时调用 发布上线记得删掉]
export let business_deploy_init = (...arg) => Fetch.post('business/deploy/init.rjson', ...arg);
// 模拟登录接口
export let test_login = (...arg) => Fetch.post('test/login.rjson', ...arg);