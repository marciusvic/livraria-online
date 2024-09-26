import React from "react";
import { LoginComponent } from "../../components/Login/LoginComponent";
import loginLogo from "../../images/loginLogo.svg";

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-tsmx-gray">
        <LoginComponent />
      </div>

      <div className="hidden lg:flex lg:w-1/2 bg-tsmx-blue justify-center items-center">
        <img src={loginLogo} alt="Login Logo" className="max-w-full h-auto" />
      </div>
    </div>
  );
};
