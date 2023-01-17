import React, { useState } from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import Encrypt from "customHook/EncryptDecrypt/Encrypt";
import Decrypt from "customHook/EncryptDecrypt/Decrypt";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import logo from "../../../assets/images/logos/logo.png";

import axiosInstance from "apiServices/axiosInstance";
import { toast } from "react-toastify";
import MDAvatar from "components/MDAvatar";

function ForgotPassword() {

    const url = window.location.origin;


    const [error, setError] = useState({ status: false, type: "", message: "" });
    const [fields, setFields] = useState({
        email: "",
    });

    const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const onChange = (e) => {
        const value = e.target.value.replace(/^\s+|\s+$/gm, "");
        const name = e.target.name;
        if (name === "email") {
            if (!emailRegex.test(value)) {
                setError({
                    ...error,
                    status: true,
                    type: "email",
                    message: "Enter valid email ID",
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

    const onSendEmail = async (e) => {
        if (!emailRegex.test(fields.email)) {
            setError({
                ...error,
                status: true,
                type: "email",
                message: "Enter valid email ID",
            });
        } else {
            const encryptedData = Encrypt(
                JSON.stringify({
                    email: fields.email,
                    url: e,
                })
            );
            await axiosInstance
                .post("/v1/admin/forget/password", {
                    response: encryptedData,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                })
                .then((res) => {
                    const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                    if (res?.data?.success) {
                        toast.success(msg);
                        setFields({ email: "" });
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
                        coloredShadow="info"
                        mx={2}
                        mt={-3}
                        p={2}
                        mb={1}
                        textAlign="center"
                    >
                        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                            Forgot Password
                        </MDTypography>
                    </MDBox>
                    <MDBox pt={4} pb={3} px={3}>
                        <MDBox component="form" role="form">
                            <MDBox mb={4}>
                                <MDInput
                                    type="email"
                                    label="Email"
                                    name="email"
                                    onChange={onChange}
                                    onKeyPress={(event) => {
                                        var key = event.keyCode || event.which;
                                        if (key === 13) {
                                            onSendEmail(url)
                                        }
                                    }}
                                    value={fields.email}
                                    variant="standard"
                                    fullWidth
                                />
                                {error.status && error.type === "email" && (
                                    <MDTypography variant="button" color="error">
                                        {error.message}
                                    </MDTypography>
                                )}
                            </MDBox>
                            <MDBox display="flex" alignItems="center" justifyContent="flex-end">
                                <MDTypography
                                    variant="button"
                                    fontWeight="regular"
                                    color="info"
                                    component={Link}
                                    to="/"
                                    sx={{ cursor: "pointer" }}
                                >
                                    Sign In
                                </MDTypography>
                            </MDBox>
                            <MDBox mt={4} mb={1}>
                                <MDButton onClick={(e) => onSendEmail(url)} variant="gradient" color="info" fullWidth>
                                    Forgot Password
                                </MDButton>
                            </MDBox>
                        </MDBox>
                    </MDBox>
                </Card>
            </MDBox>
        </BasicLayout>
    );
}

export default ForgotPassword;
