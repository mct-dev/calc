import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ops, nums, equals, clear, delBtn, calc } from "../store/reducers";
import { equal } from "assert";

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
    this.ops = ops;
    this.nums = nums;
    this.delBtn = delBtn;
    this.equals = equals;
    this.clear = clear;
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
          {/* <Btn
            style={{ backgroundColor: "#C0C0C3" }}
            onClick={() => this.calculate(this.ops.leftParen.char)}
            char={this.ops.leftParen.char}
          />
          <Btn
            style={{ backgroundColor: "#C0C0C3" }}
            onClick={() => this.calculate(this.ops.rightParen.char)}
            char={this.ops.rightParen.char}
          /> */}
          <Btn
            style={{ backgroundColor: "#9A6E7E", color: "white" }}
            onClick={() => this.calculate(this.delBtn)}
            char={this.delBtn}
          />
          <Btn
            style={{ backgroundColor: "#4B4E6D", color: "white" }}
            onClick={() => this.calculate(this.clear)}
            char={this.clear}
          />
        </div>
        <div className="columns is-mobile">
          {["7", "8", "9"].map((num, index) => (
            <Btn
              key={index + "-789"}
              style={{ backgroundColor: "#DFDFE1" }}
              onClick={() => calculate(num)}
              char={num}
            />
          ))}
          <Btn
            style={{ backgroundColor: "#C0C0C3" }}
            onClick={() => this.calculate(this.ops.mult.char)}
            char={this.ops.mult.char}
          />
        </div>
        <div className="columns is-mobile">
          {["4", "5", "6"].map((num, index) => (
            <Btn
              key={index + "-456"}
              style={{ backgroundColor: "#DFDFE1" }}
              onClick={() => calculate(num)}
              char={num}
            />
          ))}
          <Btn
            style={{ backgroundColor: "#C0C0C3" }}
            onClick={() => this.calculate(this.ops.divide.char)}
            char={this.ops.divide.char}
          />
        </div>
        <div className="columns is-mobile">
          {["1", "2", "3"].map((num, index) => (
            <Btn
              key={index + "-123"}
              style={{ backgroundColor: "#DFDFE1" }}
              onClick={() => calculate(num)}
              char={num}
            />
          ))}
          <Btn
            style={{ backgroundColor: "#C0C0C3" }}
            onClick={() => this.calculate(this.ops.minus.char)}
            char={this.ops.minus.char}
          />
        </div>
        <div className="columns is-mobile">
          {["0", "."].map((num, index) => (
            <Btn
              key={index + "-0."}
              style={{ backgroundColor: "#DFDFE1" }}
              onClick={() => calculate(num)}
              char={num}
            />
          ))}
          <Btn
            onClick={() => this.calculate(this.equals)}
            style={{ backgroundColor: "#4B4E6D", color: "white" }}
            char={this.equals}
          />
          <Btn
            style={{ backgroundColor: "#C0C0C3" }}
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
