export const setResult = value => {
  return {
    type: "SET_RESULT",
    payload: value
  };
};
export const addToEval = char => {
  return {
    type: "ADD_TO_EVAL",
    payload: char
  };
};
export const popEval = () => {
  return {
    type: "POP_EVAL",
    payload: null
  };
};
export const clearAll = () => {
  return {
    type: "CLEAR_All",
    payload: null
  };
};
export const clearEval = () => {
  return {
    type: "CLEAR_EVAL",
    payload: null
  };
};

let ops = {
  leftParen: { char: "(", oper: "(" },
  rightParen: { char: ")", oper: ")" },
  percent: { char: "\u0025", oper: "%" },
  mult: { char: "\u00D7", oper: "*" },
  divide: { char: "\u00f7", oper: "/" },
  minus: { char: "\u2796", oper: "-" },
  plus: { char: "\u2795", oper: "+" }
};
let nums = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "."];
let equals = "=";
let clear = "AC";

const calculateResult = () => {
  return (dispatch, getState) => {
    let { evalArray } = getState();
    console.log(evalArray);
    let result;
    try {
      result = eval(evalArray.join(""));
      console.log(result);
      dispatch(setResult(result));
    } catch (err) {
      console.log("nah bro. didn't work");
    }
  };
};

export const calc = char => {
  return (dispatch, getState) => {
    let { evalArray } = getState();
    // if char is a number
    if (nums.filter(num => num === char).length > 0) {
      /* 
       * Should be able to push to eval regardless of what 
       * chars are already in there.
      */
      dispatch(addToEval(char));
      dispatch(calculateResult());
      // else if char is an operator
    } else if (
      Object.keys(ops).filter(opKey => ops[opKey].char === char).length > 0
    ) {
      let newOper =
        ops[Object.keys(ops).filter(key => ops[key].char === char)].oper;
      // if evalArray is not empty
      if (evalArray.length > 0) {
        // if last item in eval is also an operator, remove it and replace
        if (
          Object.keys(ops).filter(
            opKey => ops[opKey].oper === evalArray[evalArray.length - 1]
          ).length > 0
        ) {
          dispatch(popEval);
          let oper = Object.keys(ops).filter(key => ops[key].char === char);
          dispatch(addToEval(newOper));
          // otherwise just add it to eval
        } else {
          dispatch(addToEval(newOper));
        }
      }
      dispatch(calculateResult());
    } else if (equals === char) {
      dispatch(calculateResult());
      dispatch(clearEval());
    } else if (clear === char) {
      dispatch(clearAll());
    } else {
      console.log("something went wrong in calc()");
    }
  };
};

const initialState = {
  evalArray: [],
  result: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_EVAL":
      return {
        ...state,
        // concat so we do not mutate the state
        evalArray: state.evalArray.concat(action.payload)
      };
    case "POP_EVAL":
      return {
        ...state,
        // slice (not splice) so we do not mutate the state
        evalArray: state.evalArray.slice(0, state.evalArray.length - 1)
      };
    case "CLEAR_All":
      return {
        ...state,
        evalArray: [],
        result: null
      };
    case "CLEAR_EVAL":
      return {
        ...state,
        evalArray: []
      };
    case "SET_RESULT":
      return {
        ...state,
        result: action.payload
      };
    default:
      return state;
  }
};
