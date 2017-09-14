
import React, { Component, PropTypes } from 'react';

import DOMMouseMoveTracker from './DOMMouseMoveTracker'
import emptyFunction from './emptyFunction'
import TableRowResizeHandle from './TableRowResizeHandle'
import ReactDOM from 'react-dom';
import './style.less';

function enhancedResizableTable(AntdTable) {
  return class ResizableTable extends Component {

    static propTypes = {
      dataSource: PropTypes.array.isRequired,
      columns: PropTypes.array.isRequired,
      handleResizeEnd: PropTypes.func
    };
    constructor(props, context) {
      super(props, context);
      // 用于存放变化的width，这样不会导致渲染，性能好
      // 这里的colums都是存数字
      this.columns = []
      props.columns.map(item => {
        if (item.isResizable && !item.width) {
          throw new Error(
            '允许的自定义列宽（isResizable === true）的默认列宽（width）不能为空！'
          );
        }
        if (item.isResizable) {
          this.columns.push({
            key: item.key,
            isResizable: item.isResizable || false,
            width: item.width && parseInt(item.width),
            minWidth: item.minWidth && parseInt(item.minWidth),
            maxWidth: item.maxWidth && parseInt(item.maxWidth),
            title: <span>
              <span>{item.title}</span>
              <div className="resize-colum-block" onMouseDown={this._startColumResize(item.key)}>
                <div className="resize-colum-line"></div>
              </div>
              <div className="resize-colum-border"></div>
            </span>
          })
        } else {
          this.columns.push({
            key: item.key,
            isResizable: item.isResizable || false,
            width: item.width && parseInt(item.width),
            title: <span>
              <span>{item.title}</span>
              <div className="resize-colum-border"></div>
            </span>
          })
        }
      })

      this._mouseMoveTracker = {};
      this._onColumnResize = this._onColumnResize.bind(this);
      this._startColumResize = this._startColumResize.bind(this)
      this.onColumnResizeEndCallback = this.onColumnResizeEndCallback.bind(this)
      this.state = {
        isColumnResizing: false,
        columns: this.columns,
        columnResizingData: {
          width: 0
        }
      }
    }
    componentWillReceiveProps(nextProps) {
      // 数据比较太耗性能，同步colum
      if (this.props.columns.length !== nextProps.columns ||
        JSON.stringify(this.props.columns) !== JSON.stringify(nextProps.columns)) {
          this.columns = []
          nextProps.columns.map(item => {
            if (item.isResizable && !item.width) {
              throw new Error(
                '允许的自定义列宽（isResizable === true）的默认列宽（width）不能为空！'
              );
            }
            if (item.isResizable) {
              this.columns.push({
                key: item.key,
                isResizable: item.isResizable || false,
                width: item.width && parseInt(item.width),
                minWidth: item.minWidth && parseInt(item.minWidth),
                maxWidth: item.maxWidth && parseInt(item.maxWidth),
                title: <span>
                  <span>{item.title}</span>
                  <div className="resize-colum-block" onMouseDown={this._startColumResize(item.key)}>
                    <div className="resize-colum-line"></div>
                  </div>
                  <div className="resize-colum-border"></div>
                </span>
              })
            } else {
              this.columns.push({
                key: item.key,
                isResizable: item.isResizable || false,
                width: item.width && parseInt(item.width),
                title: <span>
                  <span>{item.title}</span>
                  <div className="resize-colum-border"></div>
                </span>
              })
            }
          })
          this.setState({
            columns: this.columns,
            columnResizingData: {
              width: 0
            },
            isColumnResizing: false
          })
      }
    }
    componentWillUnmount() {
      this.setState({
        isColumnResizing: false,
        columnResizingData: {
          width: 0
        }
      })
    }

    onColumnResizeEndCallback (width, columnKey) {
      const { columns, columnResizingData } = this.state
      let idx;
      // const offsetWidth = this.refs.TableWrapper.offsetWidth // table真实的宽度
      columns.map((item, index) => {
        if (item.key === columnResizingData.key) {
          idx = index;
          item.width = clamp(width,
            this.columns[index].minWidth && this.columns[index].minWidth > 15 ? this.columns[index].minWidth : 16,
            this.columns[index].maxWidth && this.columns[index].maxWidth < 5000 ? this.columns[index].maxWidth : 5000)
        }
      })
      this.setState({
        isColumnResizing: false,
        columns: columns,
        columnResizingData: {
          width: 0
        }
      })
      this.props.handleResizeEnd && this.props.handleResizeEnd(columns[idx].width, columns[idx].key)
    }
    _startColumResize (columnKey) {
      const me = this
      return function(event) {
        const { columns } = me.state
        const { rowSelection } = me.props
        const scrollLeft = ReactDOM.findDOMNode(me.refs.ResizeTable).getElementsByClassName('ant-table-body')[0].scrollLeft
        const tableWrapperOffsetWidth = me.refs.ResizableTableWrapper.offsetWidth // table真实的宽度
        let combinedWidth = 0, // 通常计算的所选的colum的前面columns的宽度的和
        newCombinedWidth = 0,  // 计算分掉最后一个colum的17px的的前面的宽度的和
        allResizableColumWidthSum = 0, // 所有可调整宽度的colum的宽度和
        allColumWidthSum = 0; // 所有colum的宽度的和
        let index, hasCombinedWidth = false;
        // 计算前面的colum的联合总宽
        for (var i = 0, l = columns.length; i < l; i++) {
            var columnsW = columns[i].width - 5
            if (columns[i].key === columnKey) {
                index = i
                // break;
                hasCombinedWidth = true;
            } else if (!hasCombinedWidth) {
                if(typeof(columns[i].width) === 'number') combinedWidth += columnsW
            }
            if(typeof(columns[i].width) === 'number' && columns[i].isResizable) allResizableColumWidthSum += columns[i].width
            if(typeof(columns[i].width) === 'number') allColumWidthSum += columns[i].width;
        }
        // 如果是可调节大小的，多出的最右边空白列的17px将根据比率分配，所以宽度要特殊处理,只有在有滚动出现的情况才会出现
        // 注意在正式环境这个17px又不出现了，最右边那个直接不见了
        // 判断是否有滚动
        // if (allColumWidthSum > tableWrapperOffsetWidth) {
        //   for (var i = 0; i < index; i++) {
        //     newCombinedWidth += columns[i].width;
        //   }
        // }

        me._onColumnResize(combinedWidth,
          !!rowSelection && 50,
          columns[index].width,
          columns[index].minWidth && columns[index].minWidth > 15 ? columns[index].minWidth : 16,
          columns[index].maxWidth && columns[index].maxWidth < 5000 ? columns[index].maxWidth : 5000,
          columnKey,
          event,
          scrollLeft)
      }
    }
    _onColumnResize(
      /*number*/ combinedWidth, // 就是你要拖动的那个colum的前面那些colums的宽度的总和，不包括当前的的colum
      /*number*/ leftOffset, // 当前你要拖动的位置距离左边column的距离，Offset from left border of the table,就是要拖动的colum的宽
      /*number*/ cellWidth, // 就是当前你要拖动的colum的宽度，最后决定拖动线所在div的宽度
      /*?number*/ cellMinWidth,
      /*?number*/ cellMaxWidth,
      /*number|string*/ columnKey,
      /*object*/ event,
      /*number*/ scrollLeft
    ) {
      // scrollLeft > 0 ? leftOffset = leftOffset :leftOffset = leftOffset
      // this._mouseMoveTracker.captureMouseMoves(event);
      console.log(combinedWidth,
        leftOffset
        )
      this.setState({
        isColumnResizing: true,
        columnResizingData: {
          left: combinedWidth - scrollLeft + leftOffset,
          width: cellWidth,
          minWidth: cellMinWidth,
          maxWidth: cellMaxWidth,
          initialEvent: { // 计算拖动的距离用
            clientX: event.clientX,
            clientY: event.clientY,
            preventDefault: emptyFunction
          },
          key: columnKey
        }
      });
    }
    render() {
      const { columnResizingData, isColumnResizing } = this.state
      const { dataSource, columns } = this.props
      const calColums = this.state.columns
      let columsWidthSum = 0
      for (var i = 0, l = columns.length; i < l; i++) {
        if (typeof(calColums[i].width) === 'number') {
          columsWidthSum += parseInt(calColums[i].width)
          columns[i].width = parseInt(calColums[i].width) + 'px'
        }
        columns[i].title = calColums[i].title
      }
      // columns.map(item => {
      //   if (typeof(item.width) === 'number' || typeof(item.width) === 'string') {
      //     columsWidthSum += parseInt(item.width)
      //     item.width = parseInt(item.width) + 'px'
      //   }
      // })
      const scroll = { x: true, y: true }
      return (
        <div className="component-Resizable-TableWrapper"  ref="ResizableTableWrapper">
          <TableRowResizeHandle
            initialWidth={columnResizingData.width || 0}
            minWidth={columnResizingData.minWidth}
            maxWidth={columnResizingData.maxWidth}
            visible={isColumnResizing}
            leftOffset={columnResizingData.left || 0}
            knobHeight={50}
            initialEvent={columnResizingData.initialEvent}
            onColumnResizeEnd={this.onColumnResizeEndCallback}
            columnKey={columnResizingData.key}
            height={'calc(100% - 42px)'}
            />
          <AntdTable
            ref="ResizeTable"
            columns={columns}
            dataSource={dataSource}
            {...this.props}
            scroll={{ x: columsWidthSum, y: this.props.scroll && this.props.scroll.y }}
            />
        </div>
      );
    }
  }
}

var slashReplaceRegex = /\//g;
var cache = {};


function getClassName(className) {
  if (cache[className]) {
    return cache[className];
  }

  cache[className] = className.replace(slashReplaceRegex, '_');
  return cache[className];
}
function cx(classNames) {
  var classNamesArray;
  if (typeof classNames == 'object') {
    classNamesArray = Object.keys(classNames).filter(function(className) {
      return classNames[className];
    });
  } else {
    classNamesArray = Array.prototype.slice.call(arguments);
  }

  return classNamesArray.map(getClassName).join(' ');
}

// 如果value小于最小则返回最小，如果大于最大则返回最大
function clamp(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}
export default enhancedResizableTable
