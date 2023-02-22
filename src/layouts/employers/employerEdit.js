import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstanceAuth from "apiServices/axiosInstanceAuth";
import axiosInstance from "apiServices/axiosInstance";
import Encrypt from "customHook/EncryptDecrypt/Encrypt";
import Decrypt from "customHook/EncryptDecrypt/Decrypt";
import "./index.scss";

// Authentication layout components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogActions, DialogContent, DialogContentText, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

function EmployerEdit({ openEditBox, setOpenEditBox, credentials }) {
  const [fields, setFields] = useState({});
  // console.log("-------->>> credentials", credentials);
  const [employerTypeOption, setEmployerTypeOption] = useState([]);
  const [sendEmpType, setSendEmpType] = useState({ id: "", title: "" });

  useEffect(() => {
    setFields({
      uuid: credentials?.uuid,
      url: credentials?.url,
      name: credentials?.name,
      email: credentials?.email,
      uk_address: credentials?.uk_address,
      hq_address: credentials?.hq_address,
      billing_address: credentials?.billing_address,
      contact_details: credentials?.contact_details,
    });
    setSendEmpType({ title: credentials?.uk_address });
  }, [credentials]);

  useEffect(() => {
    getOptions();
  }, []);

  const getOptions = async () => {
    await axiosInstance
      .get(`/v1/master_tables_list`)
      .then((res) => {
        const myData = JSON.parse(Decrypt(res?.data?.data));
        const employersTypeList = myData?.mst_employer_types;

        if (res?.data?.success) {
          setEmployerTypeOption(employersTypeList);
        }
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };

  const [logo, setLogo] = useState([]);
  const [preview, setPreview] = useState();

  const onChangeLogo = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setLogo(file);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handelecloseEditBox = () => {
    setOpenEditBox(false);
  };

  const editEmployer = async () => {
    const encryptedData = Encrypt(
      JSON.stringify({
        uuid: credentials?.uuid,
        url: fields?.url,
        name: fields?.name,
        email: fields?.email,
        // uk_address: fields?.uk_address,
        uk_address: sendEmpType?.title,
        hq_address: fields?.hq_address,
        billing_address: fields?.billing_address,
        contact_details: fields?.contact_details,
      })
    );

    const formData = new FormData();
    formData.append("response", encryptedData);
    formData.append("logo", logo);

    await axiosInstanceAuth
      .post("/v1/adm/employer/profile/update", formData)
      .then((res) => {
        const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
        handelecloseEditBox();
        if (res?.data?.success) {
          toast.success(msg);
        } else {
          toast.error(msg);
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  return (
    <>
      <Dialog open={openEditBox} onClose={handelecloseEditBox}>
        <MDBox className="guest-form-conatiner">
          <DialogContent>
            <DialogContentText>
              <MDBox className="close-btn">
                <MDButton onClick={handelecloseEditBox} variant="text" color="black">
                  <CloseIcon />
                </MDButton>
              </MDBox>
              <MDBox className="Heading">
                <MDTypography variant="h3">Edit Employer</MDTypography>
              </MDBox>
              <MDBox component="form" role="form" sx={{ px: "25px" }}>
                <MDBox className="employer-fields">
                  <MDBox m={2} className="detail-content">
                    <MDInput
                      type="text"
                      name="url"
                      onChange={onChange}
                      value={fields?.url || ""}
                      label="Website"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox m={2} className="detail-content">
                    <MDInput
                      type="text"
                      name="name"
                      onChange={onChange}
                      value={fields?.name || ""}
                      label="Name"
                      fullWidth
                    />
                  </MDBox>
                  {/* <MDBox m={2} className="detail-content">
                    <MDInput
                      type="text"
                      name="uk_address"
                      onChange={onChange}
                      value={fields?.uk_address || ""}
                      label="UK Address"
                      fullWidth
                    />
                  </MDBox> */}
                  <MDBox m={2} className="detail-content">
                    <Autocomplete
                      options={employerTypeOption}
                      getOptionLabel={(option) => option.title || ""}
                      value={sendEmpType || {}}
                      onChange={(e, value) => {
                        setSendEmpType(value);
                      }}
                      renderInput={(params) => <TextField {...params} label="Employer Type" />}
                      fullWidth
                    />
                  </MDBox>
                  {/* <MDBox m={2} className="detail-content">
                    <MDInput
                      type="text"
                      name="hq_address"
                      onChange={onChange}
                      value={fields?.hq_address || ""}
                      label="HQ Address"
                      fullWidth
                    />
                  </MDBox> */}
                  <MDBox m={2} className="detail-content">
                    <MDInput
                      type="text"
                      name="hq_address"
                      onChange={onChange}
                      value={fields?.hq_address || ""}
                      label="Office Address"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox m={2} className="detail-content">
                    <MDInput
                      type="text"
                      name="billing_address"
                      onChange={onChange}
                      value={fields?.billing_address || ""}
                      label="Billing Address"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox m={2} className="detail-content">
                    <MDInput
                      type="text"
                      name="contact_details"
                      onChange={onChange}
                      value={fields?.contact_details || ""}
                      label="Contact Details"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox m={2} className="detail-content">
                    <MDInput
                      type="email"
                      name="email"
                      onChange={onChange}
                      value={fields?.email || ""}
                      label="Email"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox m={2} className="detail-content">
                    <MDTypography variant="h6">Upload Logo :</MDTypography>
                    <MDInput type="file" name="logo" onChange={onChangeLogo} fullWidth />
                  </MDBox>
                </MDBox>
              </MDBox>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <MDButton
              onClick={editEmployer}
              variant="contained"
              color="info"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              Update
            </MDButton>
          </DialogActions>
        </MDBox>
      </Dialog>
    </>
  );
}

export default EmployerEdit;
