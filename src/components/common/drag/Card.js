require('./drag.styl')
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import {Input,Button,Checkbox,Icon} from 'antd';

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
            type : props.type
        };
    },
    endDrag(props) {
    }
};

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const type = monitor.getItem().type;
        const hoverIndex = props.index;
        const hoverType = props.type;
        if(hoverType == "hide"){
            return
        }
        if(type !== "hide"){
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            props.moveCard(dragIndex, hoverIndex ,type);
            monitor.getItem().index = hoverIndex;
        }
    },
    drop(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const type = monitor.getItem().type;
        const hoverIndex = props.index;
        const hoverType = props.type;
        if(type == "hide"){
            props.moveCard(dragIndex, hoverIndex ,type);
            monitor.getItem().index = hoverIndex;
        }
    }
};

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class Card extends React.Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        text: PropTypes.string.isRequired,
        moveCard: PropTypes.func.isRequired,
        type: PropTypes.string
    };
    render() {
        const { text, isDragging, connectDragSource, connectDropTarget ,isRequired  ,id , type} = this.props;
        const draggingStyle = {
            backgroundColor: '#38ADFF',
            cursor: 'move',
            opacity : 0.1,
            border : '1px dashed red'
        }
        const style = isDragging ? draggingStyle : {};
        let t = this;
        if(type == 'hide'){
            return connectDragSource(connectDropTarget(
                <div style={style} className="field">
                    <span className="t-ML50">{text}:</span>
                </div>,
            ));
        }else{
            return connectDragSource(connectDropTarget(
                <div style={style} className="card">
                    <span className="t-ML50">{text}:</span>
                    <Input className="cardInput" disabled/>
                </div>,
            ));
        }
    }
}
