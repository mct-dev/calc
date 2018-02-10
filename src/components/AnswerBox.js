import React, { Component } from "react";

export default class AnswerBox extends Component {
  render() {
    const styles = {
      margin: "5px"
    };
    return (
      <div className="columns is-mobile">
        <input
          style={styles}
          id="currOperation"
          className="column input"
          type="text"
          placeholder="words"
          readOnly
        />
        <input style={styles} className="column input" type="text" readOnly />
      </div>
    );
  }
}
