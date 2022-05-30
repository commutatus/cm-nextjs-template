import { initialHelperState } from "@redux/states";

let initialState = initialHelperState;

const helperReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default helperReducer;
