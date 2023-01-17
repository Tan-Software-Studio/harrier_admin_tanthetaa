import { useState, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import logo from "../../../assets/images/logos/logo.png";
import axiosInstance from "apiServices/axiosInstance";
import { toast } from "react-toastify";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Encrypt from "customHook/EncryptDecrypt/Encrypt";
import Decrypt from "customHook/EncryptDecrypt/Decrypt";
import MDAvatar from "components/MDAvatar";

function Basic() {
  const [error, setError] = useState({ status: false, type: "", message: "" });
  const [fields, setFields] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const isLoggedIn = localStorage.getItem("token") !== null;

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  });

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setFields({
      ...fields,
      showPassword: !fields.showPassword,
    });
  };

  const emailRegex =
    // eslint-disable-next-line no-useless-escape
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
  };

  const handleSubmit = async () => {
    if (!emailRegex.test(fields.email)) {
      setError({
        ...error,
        status: true,
        type: "email",
        message: "Enter valid email ID",
      });
    } else if (fields.password.length < 6) {
      setError({
        ...error,
        status: true,
        type: "password",
        message: "must be 6 character",
      });
    } else {
      const encryptedData = Encrypt(
        JSON.stringify({
          email: fields.email,
          password: fields.password,
        })
      );
      await axiosInstance
        .post("/v1/admin/login", {
          response: encryptedData,
        })
        .then((res) => {
          const data = Decrypt(res?.data?.data);
          const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
          const token = JSON.parse(data);

          if (res?.data?.success) {
            toast.success(msg);
            localStorage.setItem("token", token.access_token);
            navigate("/dashboard");
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
    <BasicLayout >
      <MDBox
      >
        <MDBox
          mx={2}
          p={2}
          mb={2}
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
              Sign in
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  name="email"
                  label="Email"
                  value={fields.email}
                  onChange={onChange}
                  fullWidth
                />
                {error.status && error.type === "email" && (
                  <MDTypography variant="button" color="error">
                    {error.message}
                  </MDTypography>
                )}
              </MDBox>
              <MDBox mb={2}
                onKeyPress={(event) => {
                  var key = event.keyCode || event.which;
                  if (key === 13) {
                    handleSubmit()
                  }
                }}>
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    name="password"
                    id="outlined-adornment-password"
                    type={fields.showPassword ? "text" : "password"}
                    value={fields.password}
                    onChange={onChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {fields.showPassword ? (
                            <VisibilityIcon fontSize="small" />
                          ) : (
                            <VisibilityOffIcon fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                {error.status && error.type === "password" && (
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
                  to="/authentication/forgot-password"
                  sx={{ cursor: "pointer" }}
                >
                  forgot password
                </MDTypography>
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton
                  onClick={handleSubmit}
                  variant="gradient"
                  color="info"
                  fullWidth>
                  sign in
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
    </BasicLayout >
  );
}

export default Basic;
