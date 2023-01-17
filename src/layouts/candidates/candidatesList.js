import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Grid,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axiosInstanceAuth from "apiServices/axiosInstanceAuth";
import Encrypt from "customHook/EncryptDecrypt/Encrypt";
import Decrypt from "customHook/EncryptDecrypt/Decrypt";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import Skeleton from "react-loading-skeleton";
import dayjs from "dayjs";

export default function CandidatesList() {
  const response = "";
  // const [candidates, setCandidates] = useState([]);
  const [candidatesData, setCandidatesData] = useState([]);
  const [oldCandidatesData, setOldCandidatesData] = useState([]);
  const [lastPage, setlastPage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({
    uuid: "",
    status: 1,
  });

  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);
  const [deleteID, setDeleteID] = useState();

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") !== null;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  });

  useEffect(() => {
    getData();
  }, []);

  const handleOpenConfirmation = (uuid) => {
    setDeleteID(uuid);
    setIsDeleteConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setIsDeleteConfirmation(false);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "0px solid #000",
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
  };

  const candidatesColumn = [
    { Header: "id", accessor: "id", align: "left" },
    { Header: "name", accessor: "name", align: "left" },
    { Header: "job title", accessor: "job_title", align: "left" },
    { Header: "time in industry", accessor: "time_in_industry", align: "left" },
    { Header: "current salary", accessor: "current_salary", align: "left" },
    {
      Header: "current bonus or commission",
      accessor: "current_bonus_or_commission",
      align: "left",
    },
    { Header: "desired salary", accessor: "desired_salary", align: "left" },
    {
      Header: "desired bonus or commission",
      accessor: "desired_bonus_or_commission",
      align: "left",
    },
    { Header: "notice period", accessor: "notice_period", align: "left" },
    { Header: "pqe", accessor: "pqe", align: "left" },
    { Header: "last updated", accessor: "updated_at", align: "left" },
    { Header: "harrier candidate", accessor: "harrier_candidate", align: "left" },
    { Header: "status", accessor: "status", align: "center", width: "500px" },
    { Header: "view / edit", accessor: "view", align: "left" },
    { Header: "delete", accessor: "delete", align: "center" },
  ];

  // const handleChange = (event, value) => {
  //   getData(value);
  // };

  const handleEdit = (uuid) => {
    navigate(`/candidates-update/${uuid}`);
  };

  const handleClickOpen = (uuid) => {
    setOpen(true);
    setDetails({ ...details, uuid: uuid });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = async (status) => {
    const encryptedData = Encrypt(
      JSON.stringify({
        uuid: details.uuid,
        status: status,
      })
    );
    await axiosInstanceAuth
      .post("/v1/adm/candidate/status/change", {
        response: encryptedData,
      })
      .then((res) => {
        const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

        if (res?.data?.success) {
          getData();
          handleClose();
          toast.success("Details Updated successfully");
        } else {
          toast.error(msg);
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  const getData = async () => {
    setIsLoading(true);
    const encryptedData = Encrypt(
      JSON.stringify({
        response: response,
      })
    );
    await axiosInstanceAuth
      .post(`/v1/adm/candidates/list?page=`, {
        response: encryptedData,
      })
      .then((res) => {
        setIsLoading(false);
        const myData = JSON.parse(Decrypt(res?.data?.data));
        const candidateList = myData?.data;

        console.log("--------->>> candidateList", candidateList);

        if (res?.data?.success) {
          const temp = [];
          for (let i of candidateList) {
            temp.push({
              id: (
                <MDBox
                  lineHeight={1}
                  sx={{ cursor: "pointer" }}
                  onClick={(e) => {
                    navigate("/applicant-tracking-system");
                  }}
                >
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    #{i?.id}
                  </MDTypography>
                </MDBox>
              ),
              name: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {i?.first_name} {i?.last_name}
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
              time_in_industry: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {dayjs(i?.time_in_industry).format("DD-MM-YYYY") !== "Invalid Date"
                      ? dayjs(i?.time_in_industry).format("DD-MM-YYYY")
                      : "-"}
                  </MDTypography>
                </MDBox>
              ),
              current_salary: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {i?.current_salary_symbol_list?.currency_code} {i?.current_salary}
                  </MDTypography>
                </MDBox>
              ),
              current_bonus_or_commission: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {i?.current_bonus_or_commission_symbol_list?.currency_code}{" "}
                    {i?.current_bonus_or_commission}
                  </MDTypography>
                </MDBox>
              ),
              desired_salary: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {i?.desired_salary_symbol_list?.currency_code} {i?.desired_salary}
                  </MDTypography>
                </MDBox>
              ),
              desired_bonus_or_commission: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {i?.desired_bonus_or_commission_symbol_list?.currency_code}{" "}
                    {i?.desired_bonus_or_commission}
                  </MDTypography>
                </MDBox>
              ),
              notice_period: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {/* {i?.notice_period !== null ? `${i?.notice_period} Week` : "-"} */}
                    {i?.notice_period == 0 || i?.notice_period == 1
                      ? `${i?.notice_period} Week`
                      : i?.notice_period == null
                      ? "-"
                      : `${i?.notice_period} Weeks`}
                  </MDTypography>
                </MDBox>
              ),
              pqe: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {i?.pqe}
                    {/* {dayjs(i?.pqe).format("DD-MM-YYYY") !== "Invalid Date" ? dayjs(i?.pqe).format("DD-MM-YYYY") : "-"} */}
                  </MDTypography>
                </MDBox>
              ),
              profile_about: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {i?.profile_about}
                  </MDTypography>
                </MDBox>
              ),
              email: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {i?.email}
                  </MDTypography>
                </MDBox>
              ),
              employer: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {i?.employer}
                  </MDTypography>
                </MDBox>
              ),
              current_company_url: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {i?.current_company_url}
                  </MDTypography>
                </MDBox>
              ),
              desired_region: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {i?.desired_region}
                  </MDTypography>
                </MDBox>
              ),
              area_of_law: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {i?.area_of_law}
                  </MDTypography>
                </MDBox>
              ),
              jurisdiction: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {i?.jurisdiction}
                  </MDTypography>
                </MDBox>
              ),
              legal_experience: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {i?.legal_experience}
                  </MDTypography>
                </MDBox>
              ),
              deal_size: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {i?.deal_size_symbol_list?.currency_code} {i?.deal_size}
                  </MDTypography>
                </MDBox>
              ),
              sales_quota: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {i?.sales_quota_symbol_list?.currency_code} {i?.sales_quota}
                  </MDTypography>
                </MDBox>
              ),

              updated_at: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {dayjs(i?.updated_at).format("DD-MM-YYYY") !== "Invalid Date"
                      ? dayjs(i?.updated_at).format("DD-MM-YYYY")
                      : "-"}
                  </MDTypography>
                </MDBox>
              ),
              harrier_candidate: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {i?.harrier_candidate == 1 ? "Yes" : "No"}
                  </MDTypography>
                </MDBox>
              ),
              status: (
                <MDBox lineHeight={1} sx={{ minWidth: "135px" }}>
                  {i?.status == 1 ? (
                    <MDButton
                      onClick={(e) => handleClickOpen(i?.uuid)}
                      variant="outlined"
                      color="success"
                      fullWidth
                    >
                      Active
                    </MDButton>
                  ) : i?.status == 2 ? (
                    <MDButton
                      onClick={(e) => handleClickOpen(i?.uuid)}
                      variant="outlined"
                      color="warning"
                      fullWidth
                    >
                      Passive
                    </MDButton>
                  ) : i?.status == 3 ? (
                    <MDButton
                      onClick={(e) => handleClickOpen(i?.uuid)}
                      variant="outlined"
                      color="info"
                      fullWidth
                    >
                      Very Passive
                    </MDButton>
                  ) : (
                    <MDButton
                      onClick={(e) => handleClickOpen(i?.uuid)}
                      variant="outlined"
                      color="error"
                      fullWidth
                    >
                      Closed
                    </MDButton>
                  )}
                </MDBox>
              ),
              delete: (
                <MDBox lineHeight={1}>
                  <MDButton
                    onClick={(e) => handleOpenConfirmation(i?.uuid)}
                    variant="text"
                    color="error"
                    size="large"
                  >
                    <DeleteForeverIcon />
                  </MDButton>
                </MDBox>
              ),
              view: (
                <MDBox lineHeight={1}>
                  <MDButton
                    onClick={(e) => handleEdit(i.uuid)}
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
          setCandidatesData(temp);
          setOldCandidatesData(temp);
          // setlastPage(myData?.last_page);
        } else {
          setCandidatesData([]);
          toast.error("error");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("err--->", err);
      });
  };

  const deleteThisCandidate = async (uuid) => {
    const encryptedData = Encrypt(
      JSON.stringify({
        c_uuid: uuid,
      })
    );
    await axiosInstanceAuth
      .post(`/v1/adm/candidate/details/delete`, {
        response: encryptedData,
      })
      .then((res) => {
        const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
        if (res?.data?.success) {
          toast.success("Deleted successfully");
          getData();
        } else {
          toast.error(msg);
        }
        handleCloseConfirmation();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const downloadReport = async (data) => {
    const encryptedData = Encrypt(
      JSON.stringify({
        response: response,
      })
    );
    await axiosInstanceAuth
      .post(`/v1/adm/all/candidates/list`, {
        response: encryptedData,
      })
      .then((res) => {
        const myData = JSON.parse(Decrypt(res?.data?.data));
        const workSheet = XLSX.utils.json_to_sheet(myData);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "candidates");
        //Buffer
        let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        //Binary string
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
        //Download
        XLSX.writeFile(workBook, "candidatesData.xlsx");
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };

  const handelSearch = (e) => {
    if (e.target.value) {
      const searchData = oldCandidatesData.filter((i) => {
        console.log("------->>>> i", i);

        let job_title = i?.job_title?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
        let time_in_industry = i?.time_in_industry?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
        let current_salary = i?.current_salary?.props?.children?.props?.children?.[2]
          ?.toString()
          .includes(e.target.value.toLowerCase());
        let current_bonus_or_commission =
          i?.current_bonus_or_commission?.props?.children?.props?.children?.[2]
            ?.toString()
            .includes(e.target.value.toLowerCase());
        let desired_salary = i?.desired_salary?.props?.children?.props?.children?.[2]
          ?.toString()
          .includes(e.target.value.toLowerCase());
        let desired_bonus_or_commission =
          i?.desired_bonus_or_commission?.props?.children?.props?.children?.[2]
            ?.toString()
            .includes(e.target.value.toLowerCase());

        let current_salary_symbol = i?.current_salary?.props?.children?.props?.children?.[0]
          ?.toLowerCase()
          ?.toString()
          .includes(e.target.value.toLowerCase());
        let current_bonus_or_commission_symbol =
          i?.current_bonus_or_commission?.props?.children?.props?.children?.[0]
            ?.toLowerCase()
            ?.toString()
            .includes(e.target.value.toLowerCase());
        let desired_salary_symbol = i?.desired_salary?.props?.children?.props?.children?.[0]
          ?.toLowerCase()
          ?.toString()
          .includes(e.target.value.toLowerCase());
        let desired_bonus_or_commission_symbol =
          i?.desired_bonus_or_commission?.props?.children?.props?.children?.[0]
            ?.toLowerCase()
            ?.toString()
            .includes(e.target.value.toLowerCase());

        let notice_period = i?.notice_period?.props?.children?.props?.children
          ?.toLowerCase()
          ?.toString()
          .includes(e.target.value.toLowerCase());
        let pqe = i?.pqe?.props?.children?.props?.children
          ?.toString()
          .includes(e.target.value.toLowerCase());
        let updated_at = i?.updated_at?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
        let name1 = i?.name?.props?.children?.props?.children?.[0]
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
        let name2 = i?.name?.props?.children?.props?.children?.[2]
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());

        let id = i?.id?.props?.children?.props?.children?.[1]
          ?.toString()
          .includes(e.target.value.toLowerCase());

        let profile_about = i?.profile_about?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());

        let email = i?.email?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());

        let employer = i?.employer?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());

        let current_company_url = i?.current_company_url?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());

        let desired_region = i?.desired_region?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());

        let area_of_law = i?.area_of_law?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());

        let jurisdiction = i?.jurisdiction?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());

        let legal_experience = i?.legal_experience?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());

        let deal_size = i?.deal_size?.props?.children?.props?.children?.[2]
          ?.toString()
          .includes(e.target.value.toLowerCase());
        let deal_size_symbol = i?.deal_size?.props?.children?.props?.children?.[0]
          ?.toLowerCase()
          ?.toString()
          .includes(e.target.value.toLowerCase());

        let sales_quota = i?.sales_quota?.props?.children?.props?.children?.[2]
          ?.toString()
          .includes(e.target.value.toLowerCase());
        let sales_quota_symbol = i?.sales_quota?.props?.children?.props?.children?.[0]
          ?.toLowerCase()
          ?.toString()
          .includes(e.target.value.toLowerCase());

        return (
          job_title ||
          time_in_industry ||
          current_salary ||
          current_bonus_or_commission ||
          desired_salary ||
          desired_bonus_or_commission ||
          current_salary_symbol ||
          current_bonus_or_commission_symbol ||
          desired_salary_symbol ||
          desired_bonus_or_commission_symbol ||
          notice_period ||
          pqe ||
          updated_at ||
          name1 ||
          name2 ||
          id ||
          profile_about ||
          email ||
          employer ||
          current_company_url ||
          desired_region ||
          area_of_law ||
          jurisdiction ||
          legal_experience ||
          deal_size ||
          deal_size_symbol ||
          sales_quota ||
          sales_quota_symbol
        );
      });
      setCandidatesData(searchData);
    } else {
      setCandidatesData(oldCandidatesData);
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
                  Candidates Details
                </MDTypography>

                <MDBox bgColor="white" borderRadius="lg">
                  <MDButton onClick={downloadReport} variant="outlined" color="success">
                    Download / Export to Excel
                  </MDButton>
                </MDBox>
              </MDBox>

              <MDBox mx={2} py={3}>
                <TextField
                  type="text"
                  placeholder="Search"
                  onChange={handelSearch}
                  sx={{ width: "99%", flex: 1, margin: "0 10px" }}
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
                    table={{ columns: candidatesColumn, rows: candidatesData }}
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

      {/* Candidates Status Change Pop Up */}

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to Change status of this Candidate?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MDButton
            onClick={() => {
              setDetails({ ...details, status: 1 }), handleAction(1);
            }}
            variant="outlined"
            color="success"
          >
            Active
          </MDButton>
          <MDButton
            onClick={() => {
              setDetails({ ...details, status: 2 }), handleAction(2);
            }}
            variant="outlined"
            color="warning"
          >
            Passive
          </MDButton>
          <MDButton
            onClick={() => {
              setDetails({ ...details, status: 3 }), handleAction(3);
            }}
            variant="outlined"
            color="info"
          >
            Very Passive
          </MDButton>
          <MDButton
            onClick={() => {
              setDetails({ ...details, status: 4 }), handleAction(4);
            }}
            variant="outlined"
            color="error"
          >
            Closed
          </MDButton>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Pop Up */}

      <Modal
        open={isDeleteConfirmation}
        onClose={() => setIsDeleteConfirmation(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h3"
            sx={{ display: "flex", justifyContent: "center", padding: "15px" }}
          >
            Are you sure ?
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="h6"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            you want to delete this Candidate !
          </Typography>
          <MDBox
            component="form"
            role="form"
            mt={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <MDBox mx={1}>
              <MDButton onClick={handleCloseConfirmation} variant="outlined" color="info" fullWidth>
                Close
              </MDButton>
            </MDBox>
            <MDBox mx={1}>
              <MDButton
                onClick={(e) => deleteThisCandidate(deleteID)}
                variant="outlined"
                color="error"
                fullWidth
              >
                Delete
              </MDButton>
            </MDBox>
          </MDBox>
        </Box>
      </Modal>
    </DashboardLayout>
  );
}
