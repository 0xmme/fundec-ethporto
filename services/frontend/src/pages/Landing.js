/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// React
import { useState, useEffect } from "react";
import console from "console-browserify";
import { useNavigate } from "react-router-dom";

// react-router-dom components
import { Link } from "react-router-dom";

// Soft UI Dashboard PRO React components
import SoftBox from "components/atoms/SoftBox";
import SoftInput from "components/atoms/SoftInput";
import SoftButton from "components/atoms/SoftButton";

// Images
const curved9 = require("assets/images/curved9.jpg");

// Authentication layout components
import AuthCoverLayout from "components/molecules/LayoutContainers/CoverLayout/AuthCoverLayout";

// Redux
import { useDispatch } from "react-redux";
import { useSingleCodeLoginMutation, useVerifyCodeMutation } from "state/auth/authApiSlice";
import { setCredentials } from "state/auth/authSlice";

// Others
import { validateEmail } from "utils/validations";

function validateCode(value) {
  return value.length == 157;
}
function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return {
        title: "Welcome",
        description: "Enter your email for a one time login code",
        placeholder: "Email",
        buttonText: "Send Link",
        validationFunction: validateEmail,
      };
    case 1:
      return {
        title: "Almost There",
        description: "Input the one-time login code that you received.",
        placeholder: "Login Code",
        buttonText: "Log In",
        validationFunction: validateCode,
      };
    default:
      return null;
  }
}

export default function Landing() {
  const [value, setValue] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sendLink, { isSuccess: isSuccessEmail, isError: isErrorEmail, error: errorEmail }] =
    useSingleCodeLoginMutation();

  const [verifyCode, { isSuccess: isSuccessCode, isError: isErrorCode, error: errorCode }] =
    useVerifyCodeMutation();

  const canSend = getStepContent(activeStep).validationFunction(value);
  const onChangeValue = (e) => setValue(e.target.value);
  const onClickConfirm = async () => {
    switch (activeStep) {
      case 0:
        return await sendLink({ email: value, type: "INVESTOR" });
      case 1:
        const user = await verifyCode({ code: value }).unwrap();
        dispatch(setCredentials(user));
      default:
        return;
    }
  };

  useEffect(() => {
    switch (activeStep) {
      case 0:
        if (isSuccessEmail) {
          setActiveStep(1);
          setValue("");
          setError(undefined);
        }

        break;
      case 1:
        if (isSuccessCode) {
          navigate("/open-communities");
        }
        break;
      default:
        break;
    }
  }, [isSuccessEmail, isSuccessCode]);

  useEffect(() => {
    if (isErrorEmail || isErrorCode) {
      const errorResponse = errorEmail ?? errorCode;
      setError(
        (errorResponse?.data?.message ||
          (typeof errorResponse.data?.detail == String && errorResponse?.data?.detail) ||
          errorResponse?.error) ??
          "There has been an error. Please, try again later"
      );
    }
  }, [isErrorEmail, isErrorCode]);

  return (
    <AuthCoverLayout
      title={getStepContent(activeStep).title}
      description={getStepContent(activeStep).description}
      image={curved9}
    >
      <SoftBox display="flex" flexDirection="row" justifyContent="space-between">
        <SoftBox flexGrow={3} mr={1}>
          <SoftInput
            type="email"
            placeholder={getStepContent(activeStep).placeholder}
            name="email"
            onChange={onChangeValue}
            error={value.length > 0 ? !canSend : null}
            success={value.length > 0 ? canSend : null}
            value={value}
          />
        </SoftBox>
        <SoftBox flexGrow={1}>
          <SoftButton variant="gradient" color="info" onClick={onClickConfirm} disabled={!canSend}>
            {getStepContent(activeStep).buttonText}
          </SoftButton>
        </SoftBox>
      </SoftBox>
      <SoftBox mt={2} mb={2} textAlign="center" marginRight={"184px"}>
        <h6
          style={{
            fontSize: ".7em",
            color: "red",
            textAlign: "center",
            fontWeight: 400,
            transition: ".2s all",
          }}
        >
          {error}
        </h6>
      </SoftBox>
    </AuthCoverLayout>
  );
}
