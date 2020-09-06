import React from "react";
import ChatNavigator from "./app/features/ChatNavigator";

import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import authReducer from "./app/core/store/reducer/auth";
import errorReducer from "./app/core/store/reducer/error";
const rootReducer = combineReducers({
  auth: authReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <ChatNavigator />
    </Provider>
  );
};

export default App;
