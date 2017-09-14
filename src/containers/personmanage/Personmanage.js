
import React from 'react';
import {connect} from 'react-redux';
import * as Act from 'actions';

require('./personmanage.styl');

import {
    Button,
    Tree,
    Breadcrumb,
    Table,
    Pagination,
    message,
    Modal,
    Checkbox,
    Select
} from 'antd';

const TreeNode = Tree.TreeNode;

// 递归遍历部门列表
let getDeptTree = (depts) => {
	var arr = [];
	depts.map((_dept1)=>{
		depts.map((_dept2)=>{
			if(_dept1.deptParentId == _dept2.deptId)
				_dept1.hasParent = 1;
		})
		if(!_dept1.hasParent){
			arr.push({
				title: _dept1.deptName,
				key: _dept1.deptId,
				children: formatDept(depts, _dept1.deptId)
			})
		}
	})
	return arr
}
let formatDept = (depts, deptParentId) => {
	let arr = [];
	depts.map((item)=>{
		if(item.deptParentId == deptParentId){
			arr.push({
				title: item.deptName,
				key: item.deptId,
				children: formatDept(depts, item.deptId)
			})
		}
	})
	return arr
}

class Personmanage extends React.Component {

	initState = (props) => {
		this.setState({
		// weight: props.trade.packageWeight,
		});
	}

	componentWillMount() {
		this.props.dispatch({type: Act.USER_INFO_USER_LIST, id: 321});
	}

	componentWillReceiveProps(newProps) {
		// this.initState(newProps);
	}

	render() {
		return (
			<div className="demo">
				demo222
			</div>
		);
	}
}

// Uncomment properties you need
// PersonmanageComponent.propTypes = {};
// PersonmanageComponent.defaultProps = {};

const mapStateToProps = state => {
	return {
		abc: state.personmanage.abc,
		dept_list: state.personmanage.dept_list,
		user_list: state.personmanage.user_list,
		total: state.personmanage.total,
		address: state.trade.address
	}
}

export default connect(mapStateToProps)(Personmanage);
