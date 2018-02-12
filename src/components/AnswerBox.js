import React, { Component } from "react";
import { connect } from "react-redux";
import { setResult } from "../store/reducers";

class AnswerBox extends Component {
  render() {
    const styles = {
      margin: "5px"
    };
    return (
      <div className="columns is-mobile">
        <input
          style={styles}
          className="column input"
          type="text"
          readOnly
          value={this.props.result}
        />
        <input style={styles} className="column input" type="text" readOnly />
      </div>
    );
  }
}

export default connect(
  state => ({ result: state.result }),
  dispatch => ({ setResult: value => dispatch(setResult(value)) })
)(AnswerBox);
