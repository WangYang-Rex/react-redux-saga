// See https://github.com/Jias/natty-fetch for more details.
import nattyFetch from 'natty-fetch'
let fetch_config = {
    mockUrlPrefix: '/mock/',
    urlPrefix: '/',
    // mock: __LOCAL__ ? true : false,
    // mock:isDev ? true : false,
    // jsonp: true,
    header: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
    method: 'POST',
    withCredentials: true,
    traditional: true,
    data: {
        _tb_token_: ''
    },
    timeout: 20000,
    fit: function(response) {
        return response;
    }
}
let apis = {
    //免登配置信息请求
    get_free_login_cfg: {
        mockUrl: 'get_free_login_cfg.json',
        url: '/jsTicket/getCfg.rjson'
    },
    //免登认证
    get_free_login_auth: {
        mockUrl: 'get_free_login_auth.json',
        url: '/jsTicket/auth.rjson'
    },
    //企业会话消息(用户反馈方法)发送
    send_corp_msg_by_code: {
        mockUrl: 'send_corp_msg_by_code.json',
        url: '/message/sendCorpMsgByCode.rjson'
    },

    //人员以及部门信息同步
    user_info_dept_sync: {
        mockUrl: 'result.json',
        url: 'user/info/dept/sync.rjson'
    },
    //部门信息列表
    user_info_dept_list: {
        mockUrl: 'user_info_dept_list.json',
        url: 'user/info/dept/list.rjsonn'
    },
    //人员信息列表
    user_info_user_list: {
        mockUrl: 'user_info_user_list.json',
        url: 'user/info/user/list.rjson'
    },

    // 业务对象配置字段获取
    business_get_business_list : {
        mockUrl: 'get_business_list.json',
        url: 'business/deploy/list.rjson'
    },
    // 业务对象配置字段获取
    business_get_business_field_list : {
        mockUrl: 'get_business_field_list.json',
        url: 'business/deploy/field/list.rjson'
    },
    // 业务对象配置字段保存
    business_save_business_field_list : {
        mockUrl: 'save_business_field_list.json',
        url: 'business/deploy/field/save.rjson'
    },
    // 业务对象配置字段删除
    business_delete_business_field_list : {
        mockUrl: 'delete_business_field_list.json',
        url: 'business/deploy/field/delete.rjson'
    },
    // 业务对象配置布局保存
    business_save_business_layout_list : {
        mockUrl: 'save_business_layout_list.json',
        url: 'user/info/dept/sync.rjson'
    },

    // 获取公司所有角色
    premission_get_role_list : {
        mockUrl: 'premission_get_role_list.json',
        url: 'premission/get/role/list.rjson'
    },
    // 获取角色对应权限
    premission_get_role_premission_list : {
        mockUrl: 'premission_get_role_permission_list.json',
        url: 'premission/get/role/permission/list.rjson'
    },
     // 设置角色对应权限
    premission_init_role : {
        mockUrl: 'premission_get_role_permission_list.json',
        url: 'premission/init/role/permission.rjson'
    },
     // 获取数据权限列表
     premission_get_data_list : {
        mockUrl: 'premission_get_role_permission_list.json',
        url: 'premission/role/viewdata/list.rjson'
    },
     // 设置数据权限
     premission_init_data : {
        mockUrl: 'premission_get_role_permission_list.json',
        url: 'premission/init/role/viewdata.rjson'
    },
     // 初始化公司模块及角色
     premission_init_corp_module : {
        mockUrl: 'premission_get_role_permission_list.json',
        url: 'premission/init/corp/module.rjson'
    },
     // 删除角色
     premission_delete_role : {
        mockUrl: 'premission_get_role_permission_list.json',
        url: 'premission/delete/role.rjson'
    },
     // 新增角色
     premission_add_role : {
        mockUrl: 'premission_get_role_permission_list.json',
        url: 'premission/add/role.rjson'
    },
     // 更新公司默认角色
     premission_update_default_role : {
        mockUrl: 'premission_get_role_permission_list.json',
        url: 'premission/update/default/role.rjson'
    },
     // 更新用户角色
     premission_update_user_role : {
        mockUrl: 'premission_get_role_permission_list.json',
        url: 'premission/update/user/role.rjson'
    },
     // 更新角色信息
     premission_update_role : {
        mockUrl: 'premission_get_role_permission_list.json',
        url: 'premission/update/role.rjson'
    },
    // 校验角色名称
    premission_check_role_name : {
        mockUrl: 'premission_get_role_permission_list.json',
        url: 'premission/check/role/name.rjson'
    },

    //初始化业务配置对象接口 [只在测试时调用 发布上线记得删掉]
    business_deploy_init : {
        mockUrl: 'business_deploy_init.json',
        url: 'business/deploy/init.rjson'
    },
    // 模拟登录接口
    test_login : {
        mockUrl: 'test_login.json',
        url: 'test/login.rjson'
    }
}
const context = nattyFetch.context(fetch_config);
context.create( 'API', apis)


window.request = context.api;
module.exports = context.api;

