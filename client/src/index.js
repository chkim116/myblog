import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./Styles/reset.scss";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { Provider } from "react-redux";
import rootReducer from "./Modules/rootReducer";

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);
