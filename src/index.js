import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="279196154837-nrr8nodlnpjf47932easvnntpqjlumt6.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
