---
category: Components
type: example
cols: 1
title: resizable-table
---

增加自定义列宽功能的增强版table

## 优点
1. 性能好，拖拽过程只渲染那根线
2. 高阶组件，扩展性好

## 缺点
1. 使用`this.refs.TableWrapper.offsetWidth`来获取table的宽度
2. `componentWillReceiveProps`和`constructor`的时候都需要遍历columns以重新初始化数据（因为有自定义列这种东西）
3. 开始拖拽和结束一刻都会导致table重新渲染
4. 使用`ReactDOM.findDOMNode(me.refs.ResizeTable).getElementsByClassName('ant-table-body')[0].scrollLeft`来获取滚动的距离

## 如何使用


## API

### resizable-table

| 参数             | 说明                                         | 类型     | 默认值        |
|------------------|----------------------------------------------|----------|---------------|
| handleResizeEnd        | 拖动完成后执行的函数                      | func   | 无            |
