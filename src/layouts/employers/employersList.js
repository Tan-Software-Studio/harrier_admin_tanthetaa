import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  TextField,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";

import axiosInstanceAuth from "apiServices/axiosInstanceAuth";
import Encrypt from "customHook/EncryptDecrypt/Encrypt";
import Decrypt from "customHook/EncryptDecrypt/Decrypt";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import EmployerEdit from "./employerEdit";

export default function EmployersList() {
  const response = "";
  const [employerData, setEmployerData] = useState([]);
  const [oldEmployerData, setOldEmployerData] = useState([]);
  const [lastPage, setlastPage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [credentials, setCredentials] = useState();
  const [openEditBox, setOpenEditBox] = useState(false);

  const [details, setDetails] = useState({
    email: "",
    status: "",
  });

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") !== null;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  });

  useEffect(() => {
    getEmployerList();
  }, []);

  const employerColumn = [
    { Header: "Name", accessor: "name", align: "left" },
    { Header: "Website", accessor: "url", align: "left" },
    { Header: "Email", accessor: "email", align: "left" },
    { Header: "UK Address", accessor: "uk_address", align: "left" },
    { Header: "HQ Address", accessor: "hq_address", align: "left" },
    { Header: "Billing Address", accessor: "billing_address", align: "left" },
    { Header: "Contact Details", accessor: "contact_details", align: "left" },
    { Header: "status", accessor: "status", align: "left" },
    { Header: "view / edit", accessor: "view", align: "left" },
  ];

  // const handleChange = (event, value) => {
  //   getEmployerList(value);
  // };

  const createEmployer = () => {
    navigate("/employer-create");
  };

  const handleClickOpen = (e) => {
    setOpenStatus(true);
  };

  const handleClose = () => {
    setOpenStatus(false);
  };

  const handleViewEdit = (e) => {
    setOpenEditBox(true);
    setCredentials(e);
  };

  const getEmployerList = async () => {
    setIsLoading(true);
    const encryptedData = Encrypt(
      JSON.stringify({
        response: response,
      })
    );
    await axiosInstanceAuth
      .post(`/v1/adm/employers/list?page=`, {
        response: encryptedData,
      })
      .then((res) => {
        setIsLoading(false);
        const myData = JSON.parse(Decrypt(res?.data?.data));
        const employersList = myData?.data;

        if (res?.data?.success) {
          const temp = [];
          for (let d of employersList) {
            temp.push({
              name: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {d?.name}
                  </MDTypography>
                </MDBox>
              ),
              url: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {d?.url}
                  </MDTypography>
                </MDBox>
              ),
              email: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {d?.email}
                  </MDTypography>
                </MDBox>
              ),
              status: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {d?.status}
                  </MDTypography>
                </MDBox>
              ),
              uk_address: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {d?.uk_address}
                  </MDTypography>
                </MDBox>
              ),
              hq_address: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {d?.hq_address}
                  </MDTypography>
                </MDBox>
              ),
              billing_address: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {d?.billing_address}
                  </MDTypography>
                </MDBox>
              ),
              contact_details: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {d?.contact_details}
                  </MDTypography>
                </MDBox>
              ),
              status: (
                <MDBox MDBox lineHeight={1}>
                  {d?.status == 1 ? (
                    <MDButton
                      onClick={(e) => {
                        handleClickOpen(),
                          setDetails({ ...details, email: d?.email, status: d?.status });
                      }}
                      variant="outlined"
                      color="success"
                    >
                      Active
                    </MDButton>
                  ) : d?.status == 0 ? (
                    <MDButton
                      onClick={(e) => {
                        handleClickOpen(),
                          setDetails({ ...details, email: d?.email, status: d?.status });
                      }}
                      variant="outlined"
                      color="error"
                    >
                      Inactive
                    </MDButton>
                  ) : (
                    " "
                  )}
                </MDBox>
              ),
              view: (
                <MDBox lineHeight={1}>
                  <MDButton
                    onClick={(e) => {
                      handleViewEdit(d);
                    }}
                    variant="outlined"
                    color="info"
                    fullWidth
                  >
                    <VisibilityIcon />
                  </MDButton>
                </MDBox>
              ),
            });
          }
          setEmployerData(temp);
          setOldEmployerData(temp);
          // setlastPage(myData?.last_page);
        } else {
          setEmployerData([]);
          toast.error("error");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("err--->", err);
      });
  };

  const getUpdateEmployerList = async (status) => {
    const encryptedData = Encrypt(
      JSON.stringify({
        email: details.email,
        status: status,
      })
    );
    await axiosInstanceAuth
      .post("/v1/adm/emp/status/update", {
        response: encryptedData,
      })
      .then((res) => {
        const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

        if (res?.data?.success) {
          getEmployerList();
          toast.success(msg);
        } else {
          toast.error(msg);
        }
        handleClose();
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };

  const downloadReport = async (data) => {
    const encryptedData = Encrypt(
      JSON.stringify({
        response: response,
      })
    );
    await axiosInstanceAuth
      .post(`/v1/adm/all/employers/list`, {
        response: encryptedData,
      })
      .then((res) => {
        const myData = JSON.parse(Decrypt(res?.data?.data));
        const workSheet = XLSX.utils.json_to_sheet(myData);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "employers");
        //Buffer
        let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        //Binary string
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
        //Download
        XLSX.writeFile(workBook, "employerData.xlsx");
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };

  const handelSearch = (e) => {
    if (e.target.value) {
      const searchData = oldEmployerData.filter((i) => {
        let name = i?.name?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
        let url = i?.url?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
        let email = i?.email?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
        let uk_address = i?.uk_address?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
        let hq_address = i?.hq_address?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
        let billing_address = i?.billing_address?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
        let contact_details = i?.contact_details?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());

        return (
          name || url || email || uk_address || hq_address || billing_address || contact_details
        );
      });
      setEmployerData(searchData);
    } else {
      setEmployerData(oldEmployerData);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <MDTypography variant="h6" color="white">
                  Employers Details
                </MDTypography>

                <MDBox
                  sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <MDBox mx={1} bgColor="white" borderRadius="lg">
                    <MDButton onClick={downloadReport} variant="outlined" color="success">
                      Download / Export to Excel
                    </MDButton>
                  </MDBox>

                  <MDBox bgColor="white" borderRadius="lg">
                    <MDButton
                      sx={{ px: 2, py: 1 }}
                      onClick={createEmployer}
                      size="mediam"
                      variant="outlined"
                      color="success"
                    >
                      <AddCircleIcon sx={{ marginRight: 0.5 }} />
                      Create Employer
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>

              <MDBox mx={2} py={3}>
                <TextField
                  type="text"
                  placeholder="Search"
                  onChange={handelSearch}
                  sx={{ flex: 1, margin: "0 10px" }}
                />
              </MDBox>

              <MDBox pt={3}>
                {isLoading ? (
                  <Skeleton
                    highlightColor="#d4d4d4"
                    baseColor="#e0e0e0"
                    borderRadius="8px"
                    count={18}
                    width="97%"
                    style={{ margin: "0px 1.5%" }}
                  />
                ) : (
                  <DataTable
                    table={{ columns: employerColumn, rows: employerData }}
                    isSorted={false}
                    canSearch={false}
                    showTotalEntries={true}
                    pagination={true}
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      {/* <Stack spacing={2} alignItems="center">
        <Pagination count={lastPage} onChange={handleChange} size="small" />
      </Stack> */}

      {/* Acion Status Change Pop Up */}

      <Dialog open={openStatus} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to Change status of this Employer?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <MDButton
            onClick={() => {
              getUpdateEmployerList(1);
            }}
            variant="outlined"
            color="success"
          >
            Active
          </MDButton>
          <MDButton
            onClick={() => {
              getUpdateEmployerList(0);
            }}
            variant="outlined"
            color="error"
          >
            Inactive
          </MDButton>
        </DialogActions>
      </Dialog>

      <EmployerEdit
        openEditBox={openEditBox}
        setOpenEditBox={setOpenEditBox}
        credentials={credentials}
      />
    </DashboardLayout>
  );
}
