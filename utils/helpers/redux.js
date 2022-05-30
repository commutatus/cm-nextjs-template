import { REDUX_PERSIST } from "@localization";
import { combinedInitialState, statesToBePersisted } from "@redux/states";
import { pick } from "lodash";
import { logger } from "./logger";

const _persistedState = combinedInitialState;

/*#NOTE: State reconciliation and hydration, we are doing this to persist redux state 
through different pages and routes via local storage, we override and reconcile the state 
values which we want to be derived on page load  */

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(REDUX_PERSIST);
    if (serializedState === null) {
      return logger.warn("No state found in local storage");
    }
    const persistedState = JSON.parse(serializedState);
    /* #NOTE: We are overriding the persisted state with selected values from helper's 
    initial state as we want those values to be derived on page load */
    return {
      ..._persistedState,
      ...persistedState,
    };
  } catch (err) {
    return logger.info("Error loading state from local storage", err);
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      ...pick(state, statesToBePersisted),
    });
    localStorage.setItem(REDUX_PERSIST, serializedState);
  } catch (err) {
    return logger.info("Error saving state to local storage", err);
  }
};
