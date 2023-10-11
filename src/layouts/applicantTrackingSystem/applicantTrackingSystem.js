import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  Pagination,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axiosInstanceAuth from "apiServices/axiosInstanceAuth";
import Encrypt from "customHook/EncryptDecrypt/Encrypt";
import Decrypt from "customHook/EncryptDecrypt/Decrypt";
import "./index.scss";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { toast } from "react-toastify";
import MDInput from "components/MDInput";
import { Stack } from "@mui/system";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Skeleton from "react-loading-skeleton";

export default function ApplicantTrackingSystem() {
  const [requestData, setRequestData] = useState([]);
  const [oldRequestData, setOldRequestData] = useState([]);
  const [openBox, setOpenBox] = useState(false);
  // const [lastPage, setlastPage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [singleCandidateData, setSingleCandidateData] = useState({});

  const [cvReqDate, setCvReqDate] = useState("");
  const [interviewReqDate, setInterviewReqDate] = useState("");
  const [offerAcceptedDate, setOfferAcceptedDate] = useState("");
  const [joiningDate, setJoiningDate] = useState("");

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") !== null;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  });

  useEffect(() => {
    getJobStatusOptions();
  }, []);

  const interviewReqDateOptions = [
    { id: 1, title: "Yes" },
    { id: 0, title: "No" },
  ];
  const [interviewRequest, setInterviewRequest] = useState();

  const [jobStatusListOptions, setJobStatusListOptions] = useState([]);
  const [jobStatus, setJobStatus] = useState();

  const [currancyOptions, setCurrancyOptions] = useState([]);
  const [sendOfferSalarySymbol, setSendOfferSalarySymbol] = useState({ id: "", currency_code: "" });
  const [sendOfferBonusCommisionSymbol, setSendOfferBonusCommisionSymbol] = useState({
    id: "",
    currency_code: "",
  });

  const getJobStatusOptions = async () => {
    await axiosInstanceAuth
      .get(`/v1/list/mst_candidate_job_statuses`)
      .then((res) => {
        const myData = JSON.parse(Decrypt(res?.data?.data));
        setJobStatusListOptions(myData);
        getApplicantTrackingSystemList(myData);
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };

  // const getTitleFromId = (data) => {
  //     let FilteredID = jobStatusListOptions.filter((x) => x.id == data)
  //     let gotTitle = FilteredID[0]?.title;
  //     return gotTitle
  // }

  // const handlePageChange = (event, value) => {
  //     getApplicantTrackingSystemList();
  // }

  const getCurrancyOptions = async (myData) => {
    await axiosInstanceAuth
      .get("v1/list/mst_currencies")
      .then((res) => {
        const mydata = JSON.parse(Decrypt(res?.data?.data));
        const CurrancyList = mydata;

        if (res?.data?.success) {
          setCurrancyOptions(CurrancyList);
          setSendOfferSalarySymbol(
            CurrancyList.filter((x) => x.id == myData?.offer_salary_symbol)?.[0]
          );
          setSendOfferBonusCommisionSymbol(
            CurrancyList.filter((x) => x.id == myData?.offer_bonus_commission_symbol)?.[0]
          );
        }
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };

  const handleClickClosePopUp = () => {
    setOpenBox(false);
  };

  const handleEdit = (c_job_id) => {
    getSingleApplicantData(c_job_id);
    setOpenBox(true);
    // getInterviewdateFromId()
  };

  const handleUpdateATS = (singleCandidateData) => {
    setOpenBox(false);
    getUpdateApplicantDetails(singleCandidateData);
  };

  const onChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;

    setSingleCandidateData({
      ...singleCandidateData,
      [name]: value,
    });
  };

  const requestColumn = [
    { Header: "employer name", accessor: "employers_name", align: "left" },
    { Header: "job title", accessor: "job_title", align: "left" },
    { Header: "created at", accessor: "created_at", align: "left" },
    { Header: "Salary Range", accessor: "salary_range", align: "left" },
    { Header: "Candidate ID", accessor: "c_id", align: "left" },
    { Header: "CV Request Date", accessor: "request_date", align: "left" },
    { Header: "CV Status", accessor: "is_cv", align: "left" },
    { Header: "interview requests", accessor: "interview_request", align: "left" },
    { Header: "interview requests date", accessor: "interview_request_date", align: "left" },
    { Header: "Job status", accessor: "status", align: "left" },
    { Header: "Offer Accepted Date", accessor: "offer_accepted_date", align: "left" },
    { Header: "salary", accessor: "offer_salary", align: "left" },
    { Header: "bonus / commission", accessor: "offer_bonus_commission", align: "left" },
    { Header: "start date", accessor: "start_date", align: "left" },
    { Header: "view / edit", accessor: "view", align: "left" },
  ];

  const getApplicantTrackingSystemList = async (myData) => {
    setIsLoading(true);

    const encryptedData = Encrypt(
      JSON.stringify({
        title: "123",
        search: "",
      })
    );
    await axiosInstanceAuth
      .post(`/v1/adm/ats`, {
        response: encryptedData,
      })
      .then((res) => {
        const requestResponse = Decrypt(res?.data?.data);
        const parseData = JSON.parse(requestResponse);
        setIsLoading(false);

        const request = parseData;
        if (res?.data?.success) {
          const temp = [];
          for (let i of request) {
            temp.push({
              employers_name: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {i?.employers_name}
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
              created_at: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {dayjs(i?.created_at).format("DD-MM-YYYY")}
                  </MDTypography>
                </MDBox>
              ),
              salary_range: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {i?.salary_range_start_symbol_list?.currency_code} {i?.salary_range_end} -{" "}
                    {i?.salary_range_end_symbol_list?.currency_code} {i?.salary_range_start}
                  </MDTypography>
                </MDBox>
              ),
              is_cv: (
                <MDBox lineHeight={1}>
                  {i?.is_cv == 2 ? (
                    <MDTypography
                      variant="button"
                      fontWeight="medium"
                      color="success"
                      className="bg-Color-success"
                    >
                      Accepted
                    </MDTypography>
                  ) : i?.is_cv == 1 ? (
                    <MDTypography
                      variant="button"
                      fontWeight="medium"
                      color="warning"
                      className="bg-Color-warning"
                    >
                      Requested
                    </MDTypography>
                  ) : i?.is_cv == 3 ? (
                    <MDTypography
                      variant="button"
                      fontWeight="medium"
                      color="error"
                      className="bg-Color-error"
                    >
                      Rejected
                    </MDTypography>
                  ) : (
                    ""
                  )}
                </MDBox>
              ),
              c_id: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    #{i?.c_id}
                  </MDTypography>
                </MDBox>
              ),
              request_date: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {setCvReqDate(dayjs(i?.request_date).format("YYYY-MM-DD"))}

                    {dayjs(i?.request_date).format("DD-MM-YYYY") !== "Invalid Date"
                      ? dayjs(i?.request_date).format("DD-MM-YYYY")
                      : "-"}
                  </MDTypography>
                </MDBox>
              ),
              interview_request: (
                <MDBox lineHeight={1}>
                  {i?.interview_request == 1 ? (
                    <MDTypography
                      variant="button"
                      fontWeight="medium"
                      color="warning"
                      className="bg-Color-warning"
                    >
                      Requested
                    </MDTypography>
                  ) : i?.interview_request == 2 ? (
                    <MDTypography
                      variant="button"
                      fontWeight="medium"
                      color="success"
                      className="bg-Color-success"
                    >
                      Accepted
                    </MDTypography>
                  ) : i?.interview_request == 3 ? (
                    <MDTypography
                      variant="button"
                      fontWeight="medium"
                      color="error"
                      className="bg-Color-error"
                    >
                      Rejected
                    </MDTypography>) : (
                    ""
                  )}
                </MDBox>
              ),
              interview_request_date: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {dayjs(i?.interview_request_date).format("DD-MM-YYYY") !== "Invalid Date"
                      ? dayjs(i?.interview_request_date).format("DD-MM-YYYY")
                      : "-"}
                  </MDTypography>
                </MDBox>
              ),
              status: (
                <MDBox lineHeight={1}>
                  {myData?.filter((x) => x.id == i?.c_job_status)?.[0] ? (
                    <MDTypography
                      MDTypography
                      variant="button"
                      fontWeight="medium"
                      color="warning"
                      className="bg-Color-warning"
                    >
                      {/* {getTitleFromId(i?.c_job_status)} */}
                      {myData?.filter((x) => x.id == i?.c_job_status).map((x) => x?.title)}
                    </MDTypography>
                  ) : (
                    "-"
                  )}
                </MDBox>
              ),
              offer_accepted_date: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {dayjs(i?.offer_accepted_date).format("DD-MM-YYYY") !== "Invalid Date"
                      ? dayjs(i?.offer_accepted_date).format("DD-MM-YYYY")
                      : "-"}
                  </MDTypography>
                </MDBox>
              ),
              offer_salary: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {i?.offer_salary_symbol_list?.currency_code} {i?.offer_salary}
                  </MDTypography>
                </MDBox>
              ),
              offer_bonus_commission: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {i?.offer_bonus_commission_symbol_list?.currency_code}{" "}
                    {i?.offer_bonus_commission}
                  </MDTypography>
                </MDBox>
              ),
              start_date: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {dayjs(i?.start_date).format("DD-MM-YYYY") !== "Invalid Date"
                      ? dayjs(i?.start_date).format("DD-MM-YYYY")
                      : "-"}
                  </MDTypography>
                </MDBox>
              ),
              view: (
                <MDBox lineHeight={1}>
                  <MDButton
                    onClick={(e) => handleEdit(i?.c_job_id)}
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
          setRequestData(temp);
          setOldRequestData(temp);
          // setlastPage(parseData?.list?.last_page);
        } else {
          setRequestData([]);
          toast.error("error");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("err--->", err);
      });
  };

  const getSingleApplicantData = async (c_job_id) => {
    setIsLoading(true);
    await axiosInstanceAuth
      .post(`v1/adm/ats/single/ats/${c_job_id}`)
      .then((res) => {
        const response = JSON.parse(Decrypt(res?.data?.data));
        const myData = response;
        setSingleCandidateData(myData);
        setInterviewReqDate(myData?.interview_request_date);
        setOfferAcceptedDate(myData?.offer_accepted_date);
        setJoiningDate(myData?.start_date);
        setJobStatus(myData?.c_job_status);
        setInterviewRequest(myData?.interview_request);
        getCurrancyOptions(myData);

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("err--->", err);
      });
  };

  const jobStatusSend = jobStatusListOptions.filter((x) => x.id == jobStatus);
  const interviewReqSend = interviewReqDateOptions.filter((x) => x.id == interviewRequest);


  const getUpdateApplicantDetails = async (singleCandidateData) => {
    const encryptedData = Encrypt(
      JSON.stringify({
        c_job_id: singleCandidateData?.c_job_id,
        interview_request: interviewRequest,
        interview_request_date: interviewReqDate,
        c_job_status: jobStatus?.id,
        offer_accepted_date: offerAcceptedDate,
        offer_salary: singleCandidateData?.offer_salary,
        offer_bonus_commission: singleCandidateData?.offer_bonus_commission,
        start_date: joiningDate,
        offer_salary_symbol: sendOfferSalarySymbol?.id,
        offer_bonus_commission_symbol: sendOfferBonusCommisionSymbol?.id,

      })
    );
    await axiosInstanceAuth
      .post(`/v1/adm/ats/update`, {
        response: encryptedData,
      })
      .then((res) => {
        const response = JSON.parse(Decrypt(res?.data?.data));
        const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

        if (res?.data?.success) {
          getApplicantTrackingSystemList(jobStatusListOptions);
          toast.success(msg);
        } else {
          toast.error(msg);
        }
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };
  const SearchEmployersName = (e) => {
    if (e.target.value) {
      const searchData = oldRequestData.filter((i) => {
        return i?.employers_name?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setRequestData(searchData);
    } else {
      setRequestData(oldRequestData);
    }
  };
  const SearchJobTitle = (e) => {
    if (e.target.value) {
      const searchData = oldRequestData.filter((i) => {
        return i?.job_title?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setRequestData(searchData);
    } else {
      setRequestData(oldRequestData);
    }
  };
  const SearchCvStatus = (e) => {
    if (e.target.value) {
      const searchData = oldRequestData.filter((i) => {
        return i?.is_cv?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setRequestData(searchData);
    } else {
      setRequestData(oldRequestData);
    }
  };
  const SearchInterviewRequest = (e) => {
    if (e.target.value) {
      const searchData = oldRequestData.filter((i) => {
        return i?.interview_request?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setRequestData(searchData);
    } else {
      setRequestData(oldRequestData);
    }
  };
  const SearchJobStatus = (e) => {
    if (e.target.value) {
      const searchData = oldRequestData.filter((i) => {
        return i?.status?.props?.children?.props?.children?.[0]
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setRequestData(searchData);
    } else {
      setRequestData(oldRequestData);
    }
  };
  const SearchStartDate = (e) => {
    if (e.target.value) {
      const searchData = oldRequestData.filter((i) => {
        return i?.start_date?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setRequestData(searchData);
    } else {
      setRequestData(oldRequestData);
    }
  };

  const downloadReport = async (data) => {
    const encryptedData = Encrypt(
      JSON.stringify({
        title: "123",
        search: "",
      })
    );
    await axiosInstanceAuth
      .post(`/v1/adm/ats`, {
        response: encryptedData,
      })
      .then((res) => {
        const requestResponse = Decrypt(res?.data?.data);
        const parseData = JSON.parse(requestResponse);
        const workSheet = XLSX.utils.json_to_sheet(parseData);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "ATS");
        //Buffer
        let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        //Binary string
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
        //Download
        XLSX.writeFile(workBook, "ATS_Data.xlsx");
      })
      .catch((err) => {
        console.log("err--->", err);
      });
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
                  Applicant Tracking System
                </MDTypography>
                <MDBox bgColor="white" borderRadius="lg">
                  <MDButton onClick={downloadReport} variant="outlined" color="success">
                    Download / Export to Excel
                  </MDButton>
                </MDBox>
              </MDBox>

              <MDBox
                mx={2}
                py={3}
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <TextField
                  type="text"
                  placeholder="Search Employer Name"
                  onChange={SearchEmployersName}
                  sx={{ flex: 1, margin: "0 10px" }}
                />

                <TextField
                  type="text"
                  placeholder="Search Job Title"
                  onChange={SearchJobTitle}
                  sx={{ flex: 1, margin: "0 10px" }}
                />

                <TextField
                  type="text"
                  placeholder="Search CV Status"
                  onChange={SearchCvStatus}
                  sx={{ flex: 1, margin: "0 10px" }}
                />

                <TextField
                  type="text"
                  placeholder="Search Interview Request"
                  onChange={SearchInterviewRequest}
                  sx={{ flex: 1, margin: "0 10px" }}
                />

                <TextField
                  type="text"
                  placeholder="Search Job Status"
                  onChange={SearchJobStatus}
                  sx={{ flex: 1, margin: "0 10px" }}
                />

                <TextField
                  type="text"
                  placeholder="Search Start date"
                  onChange={SearchStartDate}
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
                    table={{ columns: requestColumn, rows: requestData }}
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
                <Pagination count={lastPage} onChange={handlePageChange} size="small" />
            </Stack> */}

      {/* ATS View & Edit Form Pop Up */}

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
        <Dialog open={openBox} onClose={handleClickClosePopUp}>
          <MDBox className="ats-form-conatiner">
            <DialogContent>
              <DialogContentText>
                <MDBox className="close-btn">
                  <MDButton onClick={handleClickClosePopUp} variant="text" color="black">
                    <CloseIcon />
                  </MDButton>
                </MDBox>
                <MDBox className="Heading">
                  <MDTypography variant="h3">Applicant Tracking System</MDTypography>
                </MDBox>
                <MDBox component="form" role="form" className="form-content">
                  {/* <MDBox mb={2} className="detail-content">
                                        <MDTypography variant="h6" className="title">
                                            Interview Requests
                                        </MDTypography>
                                        <Autocomplete
                                            options={interviewReqDateOptions}
                                            getOptionLabel={
                                                (option) => (option.title)
                                            }
                                            value={interviewReqSend[0]}
                                            // value={
                                            //     interviewReqDate !== null ?
                                            //         { id: 1, title: 'Yes' } :
                                            //         { id: 0, title: 'No' }
                                            // }
                                            onChange={(e, value) => {
                                                setInterviewRequest(value);
                                            }}
                                            renderInput={
                                                params => (
                                                    <TextField {...params} variant="outlined" />
                                                )
                                            }
                                            className="text-input-field"
                                        />
                                    </MDBox> */}
                  <MDBox mb={2} className="detail-content">
                    <MDTypography variant="h6" className="title">
                      Interview Request Date
                    </MDTypography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={3} className="text-input-field">
                        <DesktopDatePicker
                          value={interviewReqDate}
                          minDate={cvReqDate == null ? dayjs("2000-01-01") : cvReqDate}
                          onChange={(newValue) => {
                            const inFormat = dayjs(newValue).format("YYYY-MM-DD");
                            setInterviewReqDate(inFormat);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                          className="text-input-field"
                        />
                      </Stack>
                    </LocalizationProvider>
                  </MDBox>

                  <MDBox mb={2} className="detail-content">
                    <MDTypography variant="h6" className="title">
                      Job Status
                    </MDTypography>
                    <Autocomplete
                      options={jobStatusListOptions}
                      getOptionLabel={(option) => option.title}
                      value={jobStatusSend[0]}
                      onChange={(e, value) => {
                        setJobStatus(value);
                      }}
                      renderInput={(params) => <TextField {...params} variant="outlined" />}
                      className="text-input-field"
                    />
                  </MDBox>
                  <MDBox mb={2} className="detail-content">
                    <MDTypography variant="h6" className="title">
                      Offer Accepted Date
                    </MDTypography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={3} className="text-input-field">
                        <DesktopDatePicker
                          value={offerAcceptedDate}
                          minDate={
                            interviewReqDate == null ? dayjs("2000-01-01") : interviewReqDate
                          }
                          onChange={(newValue) => {
                            const inFormat = dayjs(newValue).format("YYYY-MM-DD");
                            setOfferAcceptedDate(inFormat);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                          className="text-input-field"
                        />
                      </Stack>
                    </LocalizationProvider>
                  </MDBox>
                  <MDBox mb={2} className="detail-content-symbol">
                    <MDTypography variant="h6" className="title">
                      Salary
                    </MDTypography>
                    <MDBox className="input-field-wrapper">
                      <MDInput
                        type="text"
                        name="offer_salary"
                        onChange={onChange}
                        value={singleCandidateData?.offer_salary || ""}
                        className="text-input-field"
                      />
                      <Autocomplete
                        options={currancyOptions}
                        getOptionLabel={(option) => option.currency_code || ""}
                        value={sendOfferSalarySymbol || {}}
                        onChange={(e, value) => {
                          setSendOfferSalarySymbol(value);
                        }}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                        cclassName="symbol-input-field"
                        classes={{ root: "override-input-field" }}
                      />
                    </MDBox>
                  </MDBox>
                  <MDBox mb={2} className="detail-content-symbol">
                    <MDTypography variant="h6" className="title">
                      Bonus / Commission
                    </MDTypography>
                    <MDBox className="input-field-wrapper">
                      <MDInput
                        type="text"
                        name="offer_bonus_commission"
                        onChange={onChange}
                        value={singleCandidateData?.offer_bonus_commission || ""}
                        className="text-input-field"
                      />
                      <Autocomplete
                        options={currancyOptions}
                        getOptionLabel={(option) => option.currency_code || ""}
                        value={sendOfferBonusCommisionSymbol || {}}
                        onChange={(e, value) => {
                          setSendOfferBonusCommisionSymbol(value);
                        }}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                        cclassName="symbol-input-field"
                        classes={{ root: "override-input-field" }}
                      />
                    </MDBox>
                  </MDBox>
                  <MDBox mb={2} className="detail-content">
                    <MDTypography variant="h6" className="title">
                      Start Date
                    </MDTypography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={3} className="text-input-field">
                        <DesktopDatePicker
                          value={joiningDate}
                          minDate={
                            offerAcceptedDate == null ? dayjs("2000-01-01") : offerAcceptedDate
                          }
                          onChange={(newValue) => {
                            const inFormat = dayjs(newValue).format("YYYY-MM-DD");
                            setJoiningDate(inFormat);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </MDBox>
                </MDBox>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <MDButton
                onClick={(e) => handleUpdateATS(singleCandidateData)}
                variant="contained"
                color="info"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                Update
              </MDButton>
            </DialogActions>
          </MDBox>
        </Dialog>
      )}
    </DashboardLayout>
  );
}
