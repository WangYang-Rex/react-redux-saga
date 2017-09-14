import React, { Component, PropTypes } from 'react';

import DOMMouseMoveTracker from './DOMMouseMoveTracker'

class TableRowResizeHandle extends Component {
  constructor(props, context) {
    super(props, context);
    this._onMove = this._onMove.bind(this)
    this._onColumnResizeEnd = this._onColumnResizeEnd.bind(this)
  }
  static propTypes = {
    visible: PropTypes.bool.isRequired,

    /**
     * This is the height of the line
     */
    height: PropTypes.string.isRequired,

    /**
     * Offset from left border of the table, please note
     * that the line is a border on diff. So this is really the
     * offset of the column itself.
     */
    leftOffset: PropTypes.number.isRequired,

    /**
     * Height of the clickable region of the line.
     * This is assumed to be at the top of the line.
     */
    knobHeight: PropTypes.number.isRequired,

    /**
     * The line is a border on a diff, so this is essentially
     * the width of column.
     */
    initialWidth: PropTypes.number,

    /**
     * The minimum width this dragger will collapse to
     */
    minWidth: PropTypes.number,

    /**
     * The maximum width this dragger will collapse to
     */
    maxWidth: PropTypes.number,

    /**
     * Initial click event on the header cell.
     */
    initialEvent: PropTypes.object,

    /**
     * When resizing is complete this is called.
     */
    onColumnResizeEnd: PropTypes.func,

    /**
     * Column key for the column being resized.
     */
    columnKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  }

  state = {
    width: 0,
    cursorDelta: 0
  }

  componentWillReceiveProps(/*object*/ newProps) {
    if (newProps.initialEvent && !this._mouseMoveTracker.isDragging()) {
      this._mouseMoveTracker.captureMouseMoves(newProps.initialEvent);
      this.setState({
        width: newProps.initialWidth,
        cursorDelta: newProps.initialWidth
      });
    }
  }

  componentDidMount() {
    this._mouseMoveTracker = new DOMMouseMoveTracker(
      this._onMove,
      this._onColumnResizeEnd,
      document.body
    );

  }

  componentWillUnmount() {
    this._mouseMoveTracker.releaseMouseMoves();
    this._mouseMoveTracker = null;
  }

  render() /*object*/ {
    const { visible } = this.props
    var style = {
      width: this.state.width,
      height: this.props.height,
      display: visible ? 'block' : 'none',
    };
    if (Locale.isRTL()) {
      style.right = this.props.leftOffset;
    } else {
      style.left = this.props.leftOffset;
    }
    return (
      <div
        className="component-TableRowResizeHandle"
        style={style}>
        {/* 仅仅是为了在hover的时候给上面的border线添加一个鼠标效果 */}
        <div
          className="tableRowResizeHandle-line"
          style={{height: this.props.height}}
        />
      </div>
    );
  }

  _onMove(/*number*/ deltaX) {
    if (Locale.isRTL()) {
      deltaX = -deltaX;
    }
    var newWidth = this.state.cursorDelta + deltaX;
    var newColumnWidth =
      clamp(newWidth, this.props.minWidth, this.props.maxWidth);
    this.setState({
      width: newColumnWidth,
      cursorDelta: newWidth
    });
  }

  _onColumnResizeEnd() {
    this._mouseMoveTracker.releaseMouseMoves();

    this.props.onColumnResizeEnd(
      this.state.width,
      this.props.columnKey
    );
  }
}

var Locale = {
  isRTL: () => false,
  getDirection: () => 'LTR'
};

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

export default TableRowResizeHandle
