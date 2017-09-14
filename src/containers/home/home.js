
import React from 'react';
require('./home.styl');

const DTable = require('../../components/common/dtable')
import { Input } from 'antd';


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isShopwFilter : true
        };
    }
    handleTest() {
        this.setState({
            isShopwFilter : !this.state.isShopwFilter
        })
    }

    handleChange(event){
        console.log(event.target.value)
    }
    handleClick(){
        alert(1)
    }
    render() {
        let t = this;
        let titleTest = this.state.isShopwFilter ?
                        <div><div className="headerTop">name</div><div className="headerBottom"><Input style={{width: '85%'}} onPressEnter={t.handleChange.bind(this)}/></div></div>
                        : <div><div className="headerTopOnly">name</div></div>;

        const columns = [
            { title: titleTest, width: 150, dataIndex: 'name', key: 'name', fixed: 'left' ,
            },
            { title: titleTest, dataIndex: 'address', key: '1', width: 150 ,isResizable:true,
            },
            { title: titleTest, dataIndex: 'address', key: '2', width: 150 ,isResizable: true ,
            },
            { title: titleTest, dataIndex: 'address', key: '3', width: 150 ,isResizable: true ,
            },
            { title: titleTest, dataIndex: 'address', key: '4', width: 150 ,isResizable: true ,
            },
            { title: titleTest, dataIndex: 'address', key: '5', width: 150 ,isResizable: true ,
            },
            { title: titleTest, dataIndex: 'address', key: '6', width: 150 ,isResizable: true ,
            },
            { title: titleTest, dataIndex: 'address', key: '7', width: 150 ,isResizable: true ,
            },
            { title: titleTest, dataIndex: 'address', key: '8', width: 150,isResizable: true  ,
            },
            { title: titleTest, dataIndex: 'address', key: '9', width: 150 ,isResizable: true ,
            },
            { title: titleTest, dataIndex: 'address', key: '10', width: 150,isResizable: true ,
            },
            { title: titleTest, dataIndex: 'address', key: '11', width: 150,isResizable: true ,
            },
            { title: titleTest, dataIndex: 'address', key: '12', width: 150,isResizable: true ,
            },
            { title: <div class="" onClick={t.handleTest.bind(this)}>展开</div>, width: 30, dataIndex: 'right', key: 'right', fixed: 'right' ,
            },
          ];

          const data = [];
          for (let i = 0; i < 100; i++) {
            data.push({
              key: i,
              name: `Edrward ${i}`,
              age: 32,
              address: `Londo no. ${i}`,
              filter : `filter. ${i}`,
            });
          }
        return (
            <div className="home">
                <div className="page-home t-FBV">
                    <div className="containerheader">
                        <span className="headerName">首页</span>
                    </div>
                    <div className="contentWrap t-FB1">
                        <DTable columns={columns} data = {data} clickfn = {this.handleClick}></DTable>
                    </div>
                </div>
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

module.exports = Home;
