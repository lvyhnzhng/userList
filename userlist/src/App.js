import React from "react";
import Main from "./UI/index";
import { Provider } from "react-redux";
import storeRTK from "./app/store";
function App() {
  return (
    <>
      <Provider store={storeRTK}>
        <Main />
      </Provider>
    </>
  );
}

export default App;
