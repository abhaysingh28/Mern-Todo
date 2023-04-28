import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="768937949221-34vt3t0q1k2f2g17qmm25h9h8kuooj39.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
