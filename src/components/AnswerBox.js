import React, { Component } from "react";
import { connect } from "react-redux";
import { setResult } from "../store/reducers";

class AnswerBox extends Component {
  render() {
    const styles = {
      headers: {
        margin: 0,
        textAlign: "center"
      },
      inputs: {},
      input: {
        margin: "5px 5px 20px 5px"
      }
    };
    let currEval =
      this.props.currEval.length > 0 ? this.props.currEval.join(" ") : " - ";
    return (
      <div>
        <div style={styles.headers} className="columns is-mobile">
          <h4 className="column label">Current Equation:</h4>
          <h4 className="column label">Result:</h4>
        </div>
        <div style={styles.inputs} className="columns is-mobile">
          <input
            style={styles.input}
            className="column input"
            type="text"
            value={currEval}
            readOnly
          />
          <input
            style={styles.input}
            className="column input"
            type="text"
            readOnly
            value={this.props.result ? this.props.result : 0}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ result: state.result, currEval: state.evalArray }),
  dispatch => ({ setResult: value => dispatch(setResult(value)) })
)(AnswerBox);
