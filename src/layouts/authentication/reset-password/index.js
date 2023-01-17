import React, { useState } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "apiServices/axiosInstance";
import Encrypt from "customHook/EncryptDecrypt/Encrypt";
import Decrypt from "customHook/EncryptDecrypt/Decrypt";

import queryString from "query-string"

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

import { toast } from "react-toastify";
import MDAvatar from "components/MDAvatar";
import logo from "../../../assets/images/logos/logo.png";


function ResetPassword() {
  const [error, setError] = useState({ status: false, type: "", message: "" });
  const [fields, setFields] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const navigate = useNavigate();

  const queryParams = queryString.parse(window.location.search)

  const onChange = (e) => {
    const value = e.target.value.replace(/^\s+|\s+$/gm, "");
    const name = e.target.name;
    if (name === "password") {
      if (value.length > 5) {
        setError({
          ...error,
          status: false,
          type: "",
          message: "",
        });
        setFields({
          ...fields,
          [name]: value,
        });
      } else {
        setError({
          ...error,
          status: true,
          type: "password",
          message: "must be 6 character",
        });
        setFields({
          ...fields,
          [name]: value,
        });
      }
    }

    if (name === "passwordConfirmation") {
      if (value.length < 5) {
        setError({
          ...error,
          status: true,
          type: "password",
          message: "password does not match",
        });
        setFields({
          ...fields,
          [name]: value,
        });
      } else {
        setError({
          ...error,
          status: false,
          type: "",
          message: "",
        });
        setFields({
          ...fields,
          [name]: value,
        });
      }
    }
  };

  const handleSubmit = async () => {
    // if (!emailRegex.test(fields.email)) {
    //   setError({
    //     ...error,
    //     status: true,
    //     type: "email",
    //     message: "Enter valid email ID",
    //   });
    // } else 
    if (fields.password.length < 6) {
      setError({
        ...error,
        status: true,
        type: "password",
        message: "must be 6 character",
      });

    } else if (fields.passwordConfirmation !== fields.password) {
      setError({
        ...error,
        status: true,
        type: "password",
        message: "password does not match",
      });

    } else {
      const encryptedData = Encrypt(
        JSON.stringify({
          email: queryParams.email,
          password: fields.password,
          password_confirmation: fields.passwordConfirmation,
          token: queryParams.token,
        })
      );
      await axiosInstance
        .post("/v1/admin/new/password/update", {
          response: encryptedData,
        })
        .then((res) => {
          const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

          if (res?.data?.success) {
            toast.success(msg);
            navigate("/authentication/sign-in");
          } else {
            toast.error(msg);
          }
        })
        .catch((err) => {
          console.log("err --->", err);
        });
    }
  };

  return (
    <BasicLayout>
      <MDBox
        sx={{ mx: "auto", width: 500, mt: 15 }}
      >
        <MDBox
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <MDAvatar src={logo} size="xxl" variant="square" />
        </MDBox>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            py={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
              Reset Password
            </MDTypography>
          </MDBox>

          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput
                  type="email"
                  label="Email"
                  name="email"
                  value={queryParams.email}
                  variant="standard"
                  fullWidth
                />
                {error.status && error.type === "email" && (
                  <MDTypography variant="button" color="error">
                    {error.message}
                  </MDTypography>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Password"
                  name="password"
                  onChange={onChange}
                  value={fields.password}
                  variant="standard"
                  fullWidth
                />
                {error.status && error.type === "password" && (
                  <MDTypography variant="button" color="error">
                    {error.message}
                  </MDTypography>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Confirm Password"
                  name="passwordConfirmation"
                  onChange={onChange}
                  value={fields.passwordConfirmation}
                  variant="standard"
                  fullWidth
                />
                {error.status && error.type === "passwordConfirmation" && (
                  <MDTypography variant="button" color="error">
                    {error.message}
                  </MDTypography>
                )}
              </MDBox>
              <MDBox mt={6} mb={1}>
                <MDButton onClick={handleSubmit} variant="gradient" color="info" fullWidth>
                  Submit
                </MDButton>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography
                  component={Link}
                  to="/authentication/forgot-password"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Back
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card >
      </MDBox>
    </BasicLayout >
  );
}

export default ResetPassword;
