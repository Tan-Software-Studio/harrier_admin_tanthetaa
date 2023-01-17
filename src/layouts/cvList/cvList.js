import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  Pagination,
  Stack,
} from "@mui/material";

import axiosInstanceAuth from "apiServices/axiosInstanceAuth";
import Decrypt from "customHook/EncryptDecrypt/Decrypt";
import Encrypt from "customHook/EncryptDecrypt/Encrypt";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";

export default function CvList() {
  const [requestedCV, setRequestedCV] = useState([]);
  const [openStatus, setOpenStatus] = useState(false);
  const [lastPage, setlastPage] = useState();
  const [details, setDetails] = useState({
    id: "",
    is_cv: "",
  });

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") != null;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  });

  useEffect(() => {
    getCvList(1);
  }, []);

  const requestedDataColumn = [
    { Header: "Employer Name", accessor: "emp_name", align: "left" },
    { Header: "Job Title", accessor: "job_title", align: "left" },
    { Header: "Candidate Name", accessor: "name", align: "left" },
    { Header: "Candidate Email", accessor: "email", align: "left" },
    { Header: "CV Status", accessor: "is_cv", align: "center" },
  ];

  const handleClickOpen = (e) => {
    setOpenStatus(true);
  };
  const handleClose = () => {
    setOpenStatus(false);
  };

  const handleChange = (event, value) => {
    getCvList(value);
  };

  const getCvList = async (page) => {
    if (isLoggedIn) {
      await axiosInstanceAuth
        .post(`/v1/adm/requested/cv/list?page=${page}`)
        .then((res) => {
          const data = JSON.parse(Decrypt(res?.data?.data));
          const RequestedList = data?.list?.data;

          console.log("---res", RequestedList);
          if (res?.data?.success) {
            const temp = [];
            for (let i of RequestedList) {
              temp.push({
                emp_name: (
                  <MDBox lineHeight={1}>
                    <MDTypography display="block" variant="button" fontWeight="medium">
                      {i?.emp_name}
                    </MDTypography>
                  </MDBox>
                ),
                job_title: (
                  <MDBox lineHeight={1}>
                    <MDTypography display="block" variant="button" fontWeight="medium">
                      {i?.job_title}
                    </MDTypography>
                  </MDBox>
                ),
                name: (
                  <MDBox lineHeight={1}>
                    <MDTypography display="block" variant="button" fontWeight="medium">
                      {/* {i?.c_list?.name} */}
                      {i?.candidate_list?.first_name} {i?.candidate_list?.last_name}
                    </MDTypography>
                  </MDBox>
                ),
                email: (
                  <MDBox lineHeight={1}>
                    <MDTypography display="block" variant="button" fontWeight="medium">
                      {/* {i?.c_list?.email} */}
                      {i?.candidate_list?.email}
                    </MDTypography>
                  </MDBox>
                ),
                is_cv: (
                  <MDBox lineHeight={1}>
                    {i?.is_cv == 1 ? (
                      <MDButton
                        onClick={(e) => {
                          handleClickOpen(), setDetails({ ...details, id: i?.id, is_cv: i?.is_cv });
                        }}
                        variant="outlined"
                        color="warning"
                      >
                        Requested
                      </MDButton>
                    ) : i?.is_cv == 2 ? (
                      <MDButton
                        onClick={(e) => {
                          handleClickOpen(), setDetails({ ...details, id: i?.id, is_cv: i?.is_cv });
                        }}
                        variant="outlined"
                        color="success"
                      >
                        Accepted
                      </MDButton>
                    ) : i?.is_cv == 3 ? (
                      <MDButton
                        onClick={(e) => {
                          handleClickOpen(), setDetails({ ...details, id: i?.id, is_cv: i?.is_cv });
                        }}
                        variant="outlined"
                        color="error"
                      >
                        Rejected
                      </MDButton>
                    ) : (
                      " "
                    )}
                  </MDBox>
                ),
              });
            }
            setRequestedCV(temp);
            setlastPage(data?.list?.last_page);
          } else {
            setRequestedCV([]);
            toast.error("error");
          }
        })
        .catch((err) => {
          console.log("err --->", err);
        });
    }
  };

  const updateCV = async (is_cv) => {
    if (isLoggedIn) {
      const encryptedData = Encrypt(
        JSON.stringify({
          is_cv: is_cv,
        })
      );
      await axiosInstanceAuth
        .post(`/v1/adm/request/cv/accepted/${details?.id}`, {
          response: encryptedData,
        })
        .then((res) => {
          const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

          if (res?.data?.success) {
            getCvList();
            toast.success(msg);
            handleClose();
          } else {
            toast.error("error");
          }
        })
        .catch((err) => {
          console.log("err --->", err);
        });
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
              >
                <MDTypography variant="h6" color="white">
                  CV Requests
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: requestedDataColumn, rows: requestedCV }}
                  isSorted={false}
                  canSearch={false}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Stack spacing={2} alignItems="center">
        <Pagination count={lastPage} onChange={handleChange} size="small" />
      </Stack>

      {/* Status Change Pop Up */}
      <Dialog open={openStatus} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>Are you sure you want to Accept this CV Requested ?</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <MDButton
            onClick={(e) => {
              updateCV(2);
            }}
            variant="outlined"
            color="success"
          >
            Accepted
          </MDButton>
          <MDButton
            onClick={(e) => {
              updateCV(3);
            }}
            variant="outlined"
            color="error"
          >
            Rejected
          </MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}
