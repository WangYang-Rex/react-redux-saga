import React from 'react';

require('./Dtable.styl');

import enhancedResizableTable from '../resizable-table';

import {Table} from 'antd';

const ResizableTable = enhancedResizableTable(Table);

class Dtable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleRowClick () {
        alert(2)
    }
    render() {
        let t = this,
            columns = this.props.columns,
            data = this.props.data,
            handleClick = this.props.clickfn;
        return (
            <div className="dtable">
                <ResizableTable
                    columns={columns}
                    dataSource={data}
                    bordered
                    size="defalut"
                    scroll={{ x: '130%', y: 240 }}
                    rowSelection = {{type : "checkbox"}}
                    onChange = {handleClick} // 分页、排序、筛选变化时触发
                    onRowClick = {t.handleRowClick.bind(this)} //点击行时 }
                />
            </div>
        );
    }

    componentWillMount() {
    }

    componentDidMount() {
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

module.exports = Dtable;
