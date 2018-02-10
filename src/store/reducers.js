const initialState = {
  currNum: null
};

export const calc = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_CN":
      return {
        currNum: action.payload,
        ...state
      };
    default:
      return state;
  }
};

export const setCurrNum = newNum => {
  return {
    type: "CHANGE_CN",
    payload: newNum
  };
};
