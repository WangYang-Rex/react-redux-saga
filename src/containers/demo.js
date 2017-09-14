
import React from 'react';
import {connect} from 'react-redux';
import * as Act from 'actions';

class Demo extends React.Component {

  initState = (props) => {
    this.setState({
      // weight: props.trade.packageWeight,
    });
  }

  componentWillMount() {
    // this.initState(this.props);
  }

  componentWillReceiveProps(newProps) {
    // this.initState(newProps);
  }

  render() {
    return (
      <div className="demo">
        Please edit src/components/containers/personmanage//PersonmanageComponent.js to update this component!
      </div>
    );
  }
}


// Uncomment properties you need
// PersonmanageComponent.propTypes = {};
// PersonmanageComponent.defaultProps = {};

const mapStateToProps = state => {
  // return some state
  return {
      // trade: state.trade.draft
  }
}

export default connect(mapStateToProps)(Demo);
