import { isSSR } from "@helpers/global";
import { loadState } from "@helpers/redux";
import { pick } from "lodash";
import { useMemo } from "react";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { combinedInitialState, statesToBePersisted } from "./states";

let store;

const persistedState = isSSR()
  ? pick(combinedInitialState, statesToBePersisted)
  : loadState(); // #NOTE: We are checking as there's no local storage or states on the server side.

const initStore = (preloadedState = persistedState) => {
  return createStore(reducers, preloadedState, applyMiddleware(thunk));
};

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }
  if (isSSR()) return _store;
  if (!store) store = _store;
  return _store;
};

export const useStore = (initialState) => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};
