import React, { Component } from "react";
import { connect } from "react-redux";
import AnswerBox from "./components/AnswerBox";
import NumsAndOpsBox from "./components/NumsAndOpsBox";
import styles from "./app.scss";

export class App extends Component {
  render() {
    return (
      <div id="app">
        <AnswerBox />
        <NumsAndOpsBox />
      </div>
    );
  }
}

export default connect(state => state, dispatch => ({}))(App);
