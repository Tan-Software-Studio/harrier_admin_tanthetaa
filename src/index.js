import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "App";
import "./index.css";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-loading-skeleton/dist/skeleton.css'
import { slice } from "stylis";

ReactDOM.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        Transition={slice}
        style={{ fontSize: "16px" }}
        pauseOnHover
      />
      <App />
    </MaterialUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
