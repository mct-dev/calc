export const setOper = value => {
  return {
    type: "SET_OPER",
    payload: value
  };
};

export const setResult = value => {
  return {
    type: "SET_RESULT",
    payload: value
  };
};

export const setCurrNum = newNum => {
  return {
    type: "CHANGE_CN",
    payload: newNum
  };
};

export const setPrevNum = newNum => {
  return {
    type: "CHANGE_PN",
    payload: newNum
  };
};

export const calculateResult = () => {
  return (dispatch, getState) => {
    let num1 = getState(currNum);
    let num2 = getState(prevNum);
    let result = getState(result);
    let oper = getState(operation);

    if (num1 === null && num2 === null) {
      dispatch(setResult(0));
    } else if (num1 !== null && num2 === null) {
      this.props.setResult(num1);
    } else if (num1 !== null && num2 !== null && oper !== null) {
      switch (oper) {
        case this.ops.mult:
          this.props.setResult(num2 * num1);
          return num2 * num1;
        case this.ops.divide:
          this.props.setResult(num2 / num1);
          return num2 / num1;
        case this.ops.minus:
          this.props.setResult(num2 - num1);
          return num2 - num1;
        case this.ops.plus:
          this.props.setResult(num2 + num1);
          return num2 + num1;
        default:
          console.log("no case found in calculateResult()");
          return 0;
      }
    }
  };
};

const initialState = {
  currNum: null,
  prevNum: null,
  operation: null,
  result: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_CN":
      return {
        ...state,
        currNum: action.payload
      };
    case "CHANGE_PN":
      // return Object.assign({}, state, { prevNum: action.payload });
      return {
        ...state,
        prevNum: action.payload
      };
    case "SET_RESULT":
      // return Object.assign({}, state, { result: action.payload });
      return {
        ...state,
        result: action.payload
      };
    case "SET_OPER":
      // return Object.assign({}, state, { operation: action.payload });
      return {
        ...state,
        operation: action.payload
      };
    default:
      return state;
  }
};
