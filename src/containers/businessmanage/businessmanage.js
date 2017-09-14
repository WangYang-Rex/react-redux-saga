import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Act from 'actions';
require('./businessmanage.styl');

const FieldMap = {
    'INPUT' : '单行文本',
    'TEXTAREA' : '多行文本',
    'SELECT' : '单选',
    'CHECK_BOX' : '多选',
    'MULTILEVEL_SELECT' : '二级单选',
    'INTEGER' : '整数',
    'DECIMAL' : '小数',
    'AMOUNT' : '金额',
    'DATE' : '日期',
    'PICTURE' : '图片',
    'FILE' : '附件',
    'SPLIT' : '分割线',
    'TELE' : '电话',
    'EMAIL' : '邮件',
    'AUTO_NUMBER' : '自动编号',
    'CALCULATION' : '计算字段'
};
const columns = [{
    title: '字段名称',
    dataIndex: 'fieldTitle',
    width : 150
    }, {
        title: '字段类型',
        dataIndex: 'fieldDomType',
        width : 150
    }, {
        title: '是否必填',
        dataIndex: 'isRequired',
        width : 150
    }, {
        title: '是否隐藏',
        dataIndex: 'isVisible',
        width : 150
    }, {
        title: '操作',
        dataIndex: 'action',
}];

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Container from '../../components/common/drag/Container';
import Card from '../../components/common/drag/Card';

import {Radio,Input,Button,Tabs,Table,Spin,Modal,message} from 'antd';
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

const cardSource = {
    beginDrag(props) {
        return {
        text: props.text
        };
    }
};

class Businessmanage extends Component {
    constructor(props) {
        super(props);
        let t = this;
        this.state = {
            field : {
                type : 'singleText',
                name : '单行文本',
                desc : '适用于填写简短的文字，如"姓名"'
            },
            fName : '字段名称',
            deployId : '',
            isRequire : 1,
            businessList: [],
            systemField : [],
            customField : [],
            allField : [],
            otherField : [],
            hideField : [],
            isField : true //true表示在字段tab false表示在布局tab
        };
    }
    render() {
      console.log(this.props)
        let t = this;
        let field = this.state.field;
        let fName = this.state.fName;
        let isRequire = this.state.isRequire;
        let allField = this.state.allField;
        let hideField = this.state.hideField;
        let isField = this.state.isField;
        let deployId = this.state.deployId;
        return (
            <div className="businessmanage t-FBV">
                <div className="containerheader">
                    <span className="headerName">业务对象管理</span>
                    {
                        isField ?  <Button type="primary" className="t-FR t-MT12" onClick={t.handleAddCustomField.bind(this,deployId)}>添加自定义字段</Button> : ''
                    }
                </div>
                <div className="contentWrap t-FB1 t-FBH">
                    <div className="t-FB1 t-FBH">
                        <div className="business">
                            <ul>
                                {
                                    t.state.businessList.map((item,i) => {
                                        return <li key={i} className={item.isEdit ? 'currentItem item' : 'item'} onClick={t.handleClickBusiness.bind(this,i,item.deployId)}>{item.deployName}</li>
                                    })
                                }
                            </ul>
                        </div>
                        <div className="business-wrap t-FB1 t-FBV">
                            <div>
                                <div className="t-FS18">
                                    {
                                        t.state.businessList.map((item) => {
                                            if(item.isEdit){
                                                return item.deployName
                                            }
                                        })
                                    }
                                </div>
                                <p className="t-MT10">系统默认业务对象</p>
                            </div>
                            <div className="t-MT20 t-FB1 t-FBV t-MB30">
                                <Tabs defaultActiveKey="1" type="card" onChange={t.handleTabChange.bind(this)} className="t-FB1 t-FBV">
                                    <TabPane tab="字段" key="1" className="t-FB1 t-FBV">
                                        <p className="t-FS18 t-MB20">系统字段</p>
                                        <Table columns={columns} dataSource={t.state.systemField} pagination={false} />
                                        <p className="t-FS18 t-MT30 t-MB20">自定义字段</p>
                                        <Table columns={columns} dataSource={t.state.customField} pagination={false} />
                                    </TabPane>
                                    <TabPane tab="布局" key="2" className="layoutTab">
                                        <div className="layout">
                                            <p>1、隐藏的字段，默认不出现在布局中，一旦拖动到布局中，就会改为非隐藏</p>
                                            <p>2、拖动右侧字段，可以调整布局顺序</p>
                                        </div>
                                        <div className="t-MT10 layoutPanel t-FB1 t-FBH">
                                                <div className="layoutRight">
                                                    <Container data = {allField} data2 = {hideField}/>
                                                </div>
                                        </div>
                                    </TabPane>
                                </Tabs>
                            </div>
                            {
                                isField ? '' : <div className = "layoutSave"><Button onClick={t.handleSaveFieldLayout.bind(this)}>保存</Button></div>
                            }
                        </div>

                    </div>

                </div>
            </div>
        );
    }
    /**
     * 保存字段布局
     *
     * @param {any} params
     * @memberof Businessmanage
     */
    handleSaveFieldLayout(params){
        let t = this;
        Actions.business_save_business_layout_list({
            params : params
        }, function(data) {
            console.log(data)
            // t.setState({
            //     businessList : data.content.businessList
            // })
        });
    }
    /**
     * 获取业务对象列表
     *
     * @param {any} params
     * @memberof Businessmanage
     */
    getBusinessList(){
        let t = this;
        Actions.getBusinessList({

        }, function(data) {
            data.content[0].isEdit = true;
            t.setState({
                businessList : data.content,
                deployId : data.content[0].deployId
            })
            t.getBusinessFieldList(data.content[0].deployId);
            // cal(data.content[0].deployId)
        });
    }
    /**
     * 获取业务对象配置字段
     *
     * @param {any} params
     * @memberof Businessmanage
     */
    getBusinessFieldList(deployId) {
        let t = this;
        Actions.getBusinessFieldList({
            deployId : deployId || 'customer'
        }, function(data) {
            let fields = data.content.fields,
                allField = [],
                hideField = [],
                systemField = [],
                otherField =[],
                customField = [];
            fields.map((item)=>{
                if(item.fieldType == 'SYSTEM_FIELD'){//系统字段
                    systemField.push({
                        fieldTitle : item.fieldTitle,
                        fieldDomType : FieldMap[item.fieldDomType],
                        isRequired : item.isRequired == 'YES' ? '是' : '否',
                        isVisible : item.isVisible == 'YES' ? '是' : '否',
                        action : <div className="editBusinessField" onClick={t.handleEditBusinessField.bind(t,item.fieldId,deployId,true)}>编辑</div>
                    })
                }else if(item.fieldType == 'CUSTOM_FIELD'){//自定义字段
                    customField.push({
                        fieldTitle : item.fieldTitle,
                        fieldId : item.fieldId,
                        fieldDomType : FieldMap[item.fieldDomType],
                        isRequired : item.isRequired == 'YES' ? '是' : '否',
                        isVisible : item.isVisible == 'YES' ? '是' : '否',
                        action : <div>
                                    <span className="editBusinessField" onClick={t.handleEditBusinessField.bind(t,item.fieldId,deployId,false)}>编辑 </span>
                                    <span className="deleteBusinessField" onClick={t.handleDeleteField.bind(t,item.fieldId,deployId)}>删除</span>
                                </div>
                    })
                }else{//其他字段
                    if(item.isVisible == 'YES'){
                        allField.push({
                            fieldTitle : item.fieldTitle,
                            fieldId : item.fieldId,
                            fieldOrder : item.fieldOrder
                        })
                    }else{
                        hideField.push({
                            fieldTitle : item.fieldTitle,
                            fieldId : item.fieldId,
                            fieldOrder : item.fieldOrder
                        })
                    }
                }
            })
            t.setState({
                systemField : systemField,
                customField : customField,
                otherField : otherField,
                allField : allField,
                hideField : hideField
            })
        });
    }
    /**
     * 删除业务对象
     *
     * @memberof Businessmanage
     */
    handleDeleteField(fieldId,deployId){
        let t = this;
        confirm({
            title: '确定要删除该字段吗?',
            content: '删除字段之后，之前填写的字段信息，将都丢失',
            onOk() {
                Actions.deleteField({
                    fieldId : fieldId,
                    deployId : deployId
                }, function(data) {
                    t.setState({
                        customField : t.state.customField.filter(item => item.fieldId !== fieldId)
                    });
                    message.success('删除字段成功');
                });
            },
            onCancel() {

            },
        });
    }
    /**
     * 业务对象配置字段编辑
     *
     * @memberof Businessmanage
     */
    handleEditBusinessField(fieldId,deployId,isSystem){
        DingTalkPC.biz.util.openSlidePanel({
            url: '/slidePanel/editbusinessfield?fieldId='+fieldId+'&deployId='+deployId+ '&type=update'+'&isSystem=' + isSystem, //打开侧边栏的url
            title: '字段详情', //侧边栏顶部标题
            onSuccess : function(result) {
                onselect.log(result)
               /*
                    调用biz.navigation.quit接口进入onSuccess, result为调用biz.navigation.quit传入的数值
                */
            },
            onFail : function() {
                /*
                    tips:点击右上角上角关闭按钮会进入onFail
                 */
            }
        })
    }
    /**
     *
     * 新增字段
     * @memberof Businessmanage
     */
    handleAddCustomField(deployId){
        console.log(deployId)
        DingTalkPC.biz.util.openSlidePanel({
            url: '/slidePanel/editbusinessfield?deployId'+deployId+'&type=add'+'&isSystem=false', //打开侧边栏的url
            title: '新增字段', //侧边栏顶部标题
            onSuccess : function(result) {
                onselect.log(result)
               /*
                    调用biz.navigation.quit接口进入onSuccess, result为调用biz.navigation.quit传入的数值
                */
            },
            onFail : function() {
                /*
                    tips:点击右上角上角关闭按钮会进入onFail
                 */
            }
        })
    }
    /**
     * 点击业务对象
     *
     * @param {any} index
     * @memberof Businessmanage
     */
    handleClickBusiness(index,deployId){
        let businessList = this.state.businessList;
        businessList.map((item) => {
            item.isEdit = false;
            return item
        })
        businessList[index].isEdit = true;
        this.setState({
            businessList : businessList,
            deployId : deployId
        })
        this.getBusinessFieldList(deployId);
    }
    /**
     * 切换tab
     *
     * @param {any} key
     * @memberof Businessmanage
     */
    handleTabChange(key){
        let t = this;
        this.setState({
            isField : !t.state.isField
        })
    }

    componentWillMount() {
    }
    componentDidMount() {
        // let t = this;
        // t.getBusinessList();
        this.props.dispatch({
          type : Act.GET_BUSINESS_LIST
        })
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
    }
}

module.exports = Businessmanage;
