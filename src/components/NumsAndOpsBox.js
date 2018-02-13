import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./numsAndOps.scss";
import { calc } from "../store/reducers";

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
      leftParen: { char: "(", oper: "(" },
      rightParen: { char: ")", oper: ")" },
      percent: { char: "\u0025", oper: "%" },
      mult: { char: "\u00D7", oper: "*" },
      divide: { char: "\u00f7", oper: "/" },
      minus: { char: "\u2796", oper: "-" },
      plus: { char: "\u2795", oper: "+" }
    };
    this.nums = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "."];
    this.equals = "=";
    this.clear = "AC";
    this.calculate = this.calculate.bind(this);
  }
  calculate(char) {
    this.props.calc(char);
  }
  render() {
    let calculate = this.calculate;
    return (
      <div>
        <div className="columns is-mobile">
          <Btn
            onClick={() => this.calculate(this.ops.leftParen.char)}
            char={this.ops.leftParen.char}
          />
          <Btn
            onClick={() => this.calculate(this.ops.rightParen.char)}
            char={this.ops.rightParen.char}
          />
          <Btn
            onClick={() => this.calculate(this.ops.percent.char)}
            char={this.ops.percent.char}
          />
          <Btn
            style={{ color: "blue" }}
            onClick={() => this.calculate(this.clear)}
            char={this.clear}
          />
        </div>
        <div className="columns is-mobile">
          {["7", "8", "9"].map((num, index) => (
            <Btn
              key={index + "-789"}
              onClick={() => calculate(num)}
              char={num}
            />
          ))}
          <Btn
            onClick={() => this.calculate(this.ops.mult.char)}
            char={this.ops.mult.char}
          />
        </div>
        <div className="columns is-mobile">
          {["4", "5", "6"].map((num, index) => (
            <Btn
              key={index + "-456"}
              onClick={() => calculate(num)}
              char={num}
            />
          ))}
          <Btn
            onClick={() => this.calculate(this.ops.divide.char)}
            char={this.ops.divide.char}
          />
        </div>
        <div className="columns is-mobile">
          {["1", "2", "3"].map((num, index) => (
            <Btn
              key={index + "-123"}
              onClick={() => calculate(num)}
              char={num}
            />
          ))}
          <Btn
            onClick={() => this.calculate(this.ops.minus.char)}
            char={this.ops.minus.char}
          />
        </div>
        <div className="columns is-mobile">
          {["0", "."].map((num, index) => (
            <Btn
              key={index + "-0."}
              onClick={() => calculate(num)}
              char={num}
            />
          ))}
          <Btn
            onClick={() => this.calculate(this.equals)}
            style={{ backgroundColor: "blue", color: "white" }}
            char={this.equals}
          />
          <Btn
            onClick={() => this.calculate(this.ops.plus.char)}
            char={this.ops.plus.char}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    calc: char => dispatch(calc(char))
  };
};
const mapStateToProps = state => {
  return {
    state
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NumsAndOpsBox);
