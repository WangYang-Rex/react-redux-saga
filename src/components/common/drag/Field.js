require('./drag.styl')
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import {Input,Button,Checkbox,Icon} from 'antd';

const fieldSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const fieldTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        if (dragIndex === hoverIndex) {
            return;
        }
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        const hoverClientX  = clientOffset.x - hoverBoundingRect.left;
        console.log(hoverClientX)
        if(hoverClientX < hoverBoundingRect.width){
            return
        }
        // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        //     return;
        // }
        // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        //     return;
        // }
        props.moveField(dragIndex, hoverIndex);
        monitor.getItem().index = hoverIndex;
    },
    drop(props, monitor, component){
        console.log(props, monitor, component)
    },
};

@DropTarget(ItemTypes.FIELD, fieldTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.FIELD, fieldSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class Field extends React.Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        text: PropTypes.string.isRequired,
        moveCard: PropTypes.func.isRequired,
        deleteCard: PropTypes.func.isRequired
    };
    render() {
        const { text, isDragging, connectDragSource, connectDropTarget ,isRequired  ,id} = this.props;
        const opacity = isDragging ? 0 : 1;
        let t = this;
        return connectDragSource(connectDropTarget(
            <div style={{ opacity }} className="field">
                <span className="t-ML50">{text}:</span>
            </div>,
        ));
    }
}
