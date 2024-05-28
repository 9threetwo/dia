import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store, { persistor } from "./Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import GlobalStyles from "./global-styles";

// console.log = () => {};
// console.error = () => {};
// console.warn = () => {};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyles />
      <App />
    </PersistGate>
  </Provider>
);
