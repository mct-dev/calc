import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  calculateResult,
  setPrevNum,
  setCurrNum,
  setOper,
  setResult
} from "../store/reducers";
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
    this.calculate = this.calculate.bind(this);
  }
  calculate(char) {
    console.log(char);
    let opers = Object.keys(this.ops).map(key => this.ops[key]);
    opers.forEach(op => {
      if (char === op) {
        console.log("oper found");
        if (this.props.state.currNum !== null) {
          this.props.setOper(char);
        }
      }
    });
    this.nums.forEach(num => {
      if (char === num) {
        console.log("num found");
        let num1 = this.props.state.currNum;
        let num2 = this.props.state.prevNum;
        let oper = this.props.state.operation;

        if (num1 === null) {
          this.props.setCurrNum(char);
        } else if (num1 !== null && oper === null) {
          this.props.setCurrNum(num1 + char);
        } else if (num1 !== null && oper !== null) {
          this.props.setPrevNum(num1);
          this.props.setCurrNum(char);
        }
      }
    });
    if (char === this.clear) {
      console.log("clear found");
      this.props.setResult(0);
      this.props.setCurrNum(null);
      this.props.setPrevNum(null);
      this.props.setOper(null);
    }
    if (char === this.equals) {
      console.log("equals found");
    }
  }
  render() {
    let calculate = this.calculate;
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
          {["7", "8", "9"].map(num => (
            <Btn onClick={() => calculate(num)} char={num} />
          ))}
          <Btn
            onClick={() => this.calculate(this.ops.mult)}
            char={this.ops.mult}
          />
        </div>
        <div className="columns is-mobile">
          {["4", "5", "6"].map(num => (
            <Btn onClick={() => calculate(num)} char={num} />
          ))}
          <Btn
            onClick={() => this.calculate(this.ops.divide)}
            char={this.ops.divide}
          />
        </div>
        <div className="columns is-mobile">
          {["1", "2", "3"].map(num => (
            <Btn onClick={() => calculate(num)} char={num} />
          ))}
          <Btn
            onClick={() => this.calculate(this.ops.minus)}
            char={this.ops.minus}
          />
        </div>
        <div className="columns is-mobile">
          {["0", "."].map(num => (
            <Btn onClick={() => calculate(num)} char={num} />
          ))}
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
    state: state
  }),
  dispatch => ({
    setCurrNum: newNum => dispatch(setCurrNum(newNum)),
    setOper: value => dispatch(setOper(value)),
    setPrevNum: value => dispatch(setPrevNum(value)),
    calculateResult: calculateResult
  })
)(NumsAndOpsBox);
