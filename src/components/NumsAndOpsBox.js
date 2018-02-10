import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setCurrNum } from "../store/reducers";
import styles from "./numsAndOps.scss";

const Btn = ({ onClick, char, type = null, style, ...rest }) => {
  const styles = {
    fontSize: "1.2em",
    margin: "5px",
    display: "flex",
    alignItems: "center",
    padding: 0,
    ...style
  };

  return (
    <a
      onClick={onClick}
      style={{ ...styles }}
      className="column button"
      {...rest}
    >
      <p>{char}</p>
    </a>
  );
};

export class NumsAndOpsBox extends Component {
  constructor(props) {
    super(props);
    this.ops = {
      leftParen: "(",
      rightParen: ")",
      percent: "\u0025",
      mult: "\u00D7",
      divide: "\u00f7",
      minus: "\u2796",
      plus: "\u2795"
    };
    this.nums = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "."];
    this.equals = "=";
    this.clear = "AC";
  }
  calculate(char) {
    console.log("char: ", char);
    let opers = Object.keys(this.ops).map(key => this.ops[key]);
    opers.forEach(op => {
      char === op ? console.log("operation found: ", char) : false;
    });
    this.nums.forEach(num => {
      char === num ? console.log("number found: ", char) : false;
    });
    char === this.clear ? console.log("clear found: ", char) : false;
    char === this.equals ? console.log("equals found: ", char) : false;
    this.props.setCurrNum(char);
  }
  render() {
    return (
      <div>
        <div className="columns is-mobile">
          <Btn
            onClick={() => this.calculate(this.ops.leftParen)}
            char={this.ops.leftParen}
          />
          <Btn
            onClick={() => this.calculate(this.ops.rightParen)}
            char={this.ops.rightParen}
          />
          <Btn
            onClick={() => this.calculate(this.ops.percent)}
            char={this.ops.percent}
          />
          <Btn
            style={{ color: "blue" }}
            onClick={() => this.calculate(this.clear)}
            char={this.clear}
          />
        </div>
        <div className="columns is-mobile">
          <Btn onClick={() => this.calculate("7")} char="7" />
          <Btn onClick={() => this.calculate("8")} char="8" />
          <Btn onClick={() => this.calculate("9")} char="9" />
          <Btn
            onClick={() => this.calculate(this.ops.mult)}
            char={this.ops.mult}
          />
        </div>
        <div className="columns is-mobile">
          <Btn onClick={() => this.calculate("4")} char="4" />
          <Btn onClick={() => this.calculate("5")} char="5" />
          <Btn onClick={() => this.calculate("6")} char="6" />
          <Btn
            onClick={() => this.calculate(this.ops.divide)}
            char={this.ops.divide}
          />
        </div>
        <div className="columns is-mobile">
          <Btn onClick={() => this.calculate("1")} char="1" />
          <Btn onClick={() => this.calculate("2")} char="2" />
          <Btn onClick={() => this.calculate("3")} char="3" />
          <Btn
            onClick={() => this.calculate(this.ops.minus)}
            char={this.ops.minus}
          />
        </div>
        <div className="columns is-mobile">
          <Btn onClick={() => this.calculate("0")} char="0" />
          <Btn onClick={() => this.calculate(".")} char="." />
          <Btn
            onClick={() => this.calculate(this.equals)}
            style={{ backgroundColor: "blue", color: "white" }}
            char={this.equals}
          />
          <Btn
            onClick={() => this.calculate(this.ops.plus)}
            char={this.ops.plus}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    state: state.calc
  }),
  dispatch => ({ setCurrNum: newNum => dispatch(setCurrNum(newNum)) })
)(NumsAndOpsBox);
