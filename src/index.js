import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-336kg-o3.us.auth0.com"
    clientId="g7V2LUqhIV3TIAxw1y9puT70IMsDjTyR"
    redirectUri={window.location.origin}
    useRefreshTokens = {true}
    cacheLocation = "localstorage"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);