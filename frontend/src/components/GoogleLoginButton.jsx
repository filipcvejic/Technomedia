import React from "react";
import { GoogleLogin } from "react-google-login";

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const clientId = import.meta.env.REACT_APP_GOOGLE_CLIENT_ID;

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      // onSuccess={onSuccess}
      // onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleLoginButton;
