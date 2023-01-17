import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./index.scss"
import axiosInstanceAuth from "apiServices/axiosInstanceAuth";
import Encrypt from "customHook/EncryptDecrypt/Encrypt";
import Decrypt from "customHook/EncryptDecrypt/Decrypt";

// Authentication layout components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import { Checkbox } from "@mui/material";

function EmployerCreate() {
    const navigate = useNavigate();
    const [fields, setFields] = useState({
        url: "",
        name: "",
        email: "",
        uk_address: "",
        hq_address: "",
        billing_address: "",
        contact_details: "",
    });

    const [isChecked1, setIsChecked1] = useState(true);
    const [isChecked2, setIsChecked2] = useState(false);



    const [logo, setLogo] = useState([])
    const [preview, setPreview] = useState()

    const onChangeLogo = (e) => {
        e.preventDefault()
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onloadend = () => {
            setLogo(file)
            setPreview(reader.result)
        };
        reader.readAsDataURL(file)
    }

    const handelNavigate = () => {
        navigate("/employers")
    }

    const handelCreate = () => {
        createEmployer();
    }

    const onChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setFields({
            ...fields,
            [name]: value,
        });
    }

    const createEmployer = async () => {
        const encryptedData = Encrypt(
            JSON.stringify({
                url: fields.url,
                name: fields.name,
                email: fields.email,
                uk_address: fields.uk_address,
                hq_address: fields.hq_address,
                billing_address: fields.billing_address,
                contact_details: fields.contact_details,
                is_terms_and_conditions: isChecked1 == true ? 1 : 0,
                is_marketing_sign_up: isChecked2 == true ? 1 : 0,
            })
        );

        const formData = new FormData()
        formData.append("response", encryptedData)
        formData.append("logo", logo)

        await axiosInstanceAuth
            .post("v1/adm/employer/register", formData)
            .then((res) => {
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                if (res?.data?.success) {
                    toast.success(msg)
                    navigate("/employers")
                } else {
                    toast.error(msg)
                }
                // navigate("/employers")
            })
            .catch((err) => {
                console.log("err --->", err);
            });
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox component="form" role="form" className="employer-details-container">
                <MDBox className="employer-fields">
                    <MDBox m={2} className="detail-content">
                        <MDTypography className="title">Website URL <span className="text-red"> * </span></MDTypography>
                        <MDInput
                            type="text"
                            name="url"
                            onChange={onChange}
                            value={fields.url || ""}
                            className="text-field"
                        />
                    </MDBox>
                    <MDBox m={2} className="detail-content">
                        <MDTypography className="title">Full Legal Name <span className="text-red"> * </span></MDTypography>
                        <MDInput
                            type="text"
                            name="name"
                            onChange={onChange}
                            value={fields.name || ""}
                            className="text-field"
                        />
                    </MDBox>
                    <MDBox m={2} className="detail-content">
                        <MDTypography className="title">UK Address <span className="text-red"> * </span></MDTypography>
                        <MDInput
                            type="text"
                            name="uk_address"
                            onChange={onChange}
                            value={fields.uk_address || ""}
                            className="text-field"
                        />
                    </MDBox>
                    <MDBox m={2} className="detail-content">
                        <MDTypography className="title">HQ Address (if other than UK address)
                            {/* <span className="text-red"> * </span> */}
                        </MDTypography>
                        <MDInput
                            type="text"
                            name="hq_address"
                            onChange={onChange}
                            value={fields.hq_address || ""}
                            className="text-field"
                        />
                    </MDBox>
                    <MDBox m={2} className="detail-content">
                        <MDTypography className="title">Billing Address <span className="text-red"> * </span></MDTypography>
                        <MDInput
                            type="text"
                            name="billing_address"
                            onChange={onChange}
                            value={fields.billing_address || ""}
                            className="text-field"
                        />
                    </MDBox>
                    <MDBox m={2} className="detail-content">
                        <MDTypography className="title">Point of Contact for Invoices (email address preferred) <span className="text-red"> * </span></MDTypography>
                        <MDInput
                            type="text"
                            name="contact_details"
                            onChange={onChange}
                            value={fields.contact_details || ""}
                            className="text-field"
                        />
                    </MDBox>
                    <MDBox m={2} className="detail-content">
                        <MDTypography className="title">Super-User Email Address <span className="text-red"> * </span></MDTypography>
                        <MDInput
                            type="email"
                            name="email"
                            onChange={onChange}
                            value={fields.email || ""}
                            className="text-field"
                        />
                    </MDBox>
                    <MDBox m={2} className="detail-content">
                        <MDTypography className="title">Upload Logo <span className="text-red"> * </span></MDTypography>
                        <MDInput
                            type="file"
                            name="logo"
                            onChange={onChangeLogo}
                            className="text-field"
                        />
                    </MDBox>

                    <MDBox className="bottom-terms-content">

                        <MDBox mx={3} my={1} className="bottom-content">
                            <Checkbox
                                checked={isChecked1}
                                onChange={(event) => {
                                    setIsChecked1(!isChecked1);
                                }}
                                className="check-box-field"
                            />
                            <MDTypography className="title">
                                By signing-up you agree to
                                <span className="text-blue"> Our Terms of Service </span>
                                <span className="text-red"> * </span>
                            </MDTypography>
                        </MDBox>


                        <MDBox mx={3} my={1} className="bottom-content">
                            <Checkbox
                                checked={isChecked2}
                                onChange={(event) => {
                                    setIsChecked2(!isChecked2);
                                }}
                                className="check-box-field"
                            />
                            <MDTypography className="title">
                                <span className="text-blue">Marketing signup</span>
                            </MDTypography>
                        </MDBox>

                    </MDBox>


                </MDBox>
            </MDBox>

            <MDBox m={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <MDButton
                    sx={{ mx: 2 }}
                    onClick={handelCreate}
                    variant="gradient"
                    color="success"
                    disabled={isChecked1 == true ? false : true}
                >
                    Submit
                </MDButton>
                <MDButton sx={{ mx: 2 }} onClick={handelNavigate} variant="outlined" color="info">
                    Back
                </MDButton>
            </MDBox >
        </DashboardLayout >

    );
};

export default EmployerCreate;
