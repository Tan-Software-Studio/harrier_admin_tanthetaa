import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  Modal,
  Pagination,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axiosInstanceAuth from "apiServices/axiosInstanceAuth";
import Encrypt from "customHook/EncryptDecrypt/Encrypt";
import Decrypt from "customHook/EncryptDecrypt/Decrypt";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { toast } from "react-toastify";
import MDInput from "components/MDInput";
import "./index.scss";
import { Stack } from "@mui/system";
import Skeleton from "react-loading-skeleton";
import dayjs from "dayjs";
import { DeleteOutlineRounded } from "@mui/icons-material";

export default function GuestList() {
  const response = "";
  const [guestData, setGuestData] = useState([]);
  const [oldGuestData, setOldGuestData] = useState([]);
  const [openStatus, setOpenStatus] = useState(false);
  const [openBox, setOpenBox] = useState(false);
  const [openEditBox, setOpenEditBox] = useState(false);
  const [lastPage, setlastPage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);
  const [deleteID, setDeleteID] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [allSearch, setAllSearch] = useState("");

  const [details, setDetails] = useState({
    email: "",
    status: "",
    is_request: "",
  });
  const [fields, setFields] = useState({
    name: "",
    email: "",
  });
  const [credentials, setCredentials] = useState({
    email: "",
    name: "",
    status: "",
    new_email: "",
  });
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") !== null;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  });

  useEffect(() => {
    getGuestList();
  }, []);

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

  // const handlePageChange = (e, value, allSearch) => {
  //   console.log("----->e", e);
  //   console.log("----->value", value);
  //   console.log("----->allSearch", allSearch);

  //   setCurrentPage(value);
  //   getGuestList(value);
  // };

  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFields({
      ...fields,
      [name]: value,
    });
  };
  const onChangeEdit = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const popCreateGuest = () => {
    setOpenBox(true);
  };

  const handleCloseBox = () => {
    setOpenBox(false);
    setFields({
      ...fields,
      name: "",
      email: "",
    });
  };

  const handleClickOpen = (e) => {
    setOpenStatus(true);
  };

  const handleClose = () => {
    setOpenStatus(false);
  };

  // const handleViewEdit = (e) => {
  //     setOpenEditBox(true);
  // };

  // const handleViewClose = () => {
  //     setOpenEditBox(false);
  // };

  const handleOpenConfirmation = (id) => {
    setDeleteID(id);
    setIsDeleteConfirmation(true);
  };

  // const handleDelete = (e) => {
  //     deleteGuest(id);
  // }

  const handleCloseConfirmation = () => {
    setIsDeleteConfirmation(false);
  };

  const guestColumn = [
    { Header: "name", accessor: "name", align: "left" },
    { Header: "email", accessor: "email", align: "left" },
    { Header: "created_at", accessor: "created_at", align: "left" },
    { Header: "updated_at", accessor: "updated_at", align: "left" },
    { Header: "status", accessor: "is_request", align: "center" },
    { Header: "delete", accessor: "delete", align: "center" },
    // { Header: "view / edit", accessor: "view", align: "left" },
  ];

  const getUpdateGuest = async (is_request) => {
    const encryptedData = Encrypt(
      JSON.stringify({
        email: details.email,
        status: details.status,
        is_request: is_request,
      })
    );
    await axiosInstanceAuth
      .post("/v1/adm/guest/request/status", {
        response: encryptedData,
      })
      .then((res) => {
        const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
        getGuestList();
        if (res?.data?.success) {
          // toast.success(msg);
          handleClose();
        } else {
          toast.error(msg);
        }
        handleClose();
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };

  const getGuestList = async () => {
    setIsLoading(true);
    const encryptedData = Encrypt(
      JSON.stringify({
        response: response,
      })
    );
    await axiosInstanceAuth
      .post(`/v1/adm/guest/details?page=&search=`, {
        response: encryptedData,
      })
      .then((res) => {
        setIsLoading(false);
        const guestResponse = Decrypt(res?.data?.data);

        const parseData = JSON.parse(guestResponse);
        const guest = parseData?.data;
        if (res?.data?.success) {
          const temp = [];
          for (let i of guest) {
            temp.push({
              name: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {i.name}
                  </MDTypography>
                </MDBox>
              ),
              email: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {i.email}
                  </MDTypography>
                </MDBox>
              ),
              created_at: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {/* {i.created_at} */}
                    {dayjs(i?.created_at).format("DD-MM-YYYY")}
                  </MDTypography>
                </MDBox>
              ),
              updated_at: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {/* {i.updated_at} */}
                    {dayjs(i?.updated_at).format("DD-MM-YYYY")}
                  </MDTypography>
                </MDBox>
              ),
              is_request: (
                <MDBox lineHeight={1}>
                  {i.is_request == 1 ? (
                    <MDButton
                      onClick={(e) => {
                        handleClickOpen(),
                          setDetails({
                            ...details,
                            email: i.email,
                            status: i.status,
                            is_request: i.is_request,
                          });
                      }}
                      variant="outlined"
                      color="warning"
                    >
                      Requested
                    </MDButton>
                  ) : i.is_request == 2 ? (
                    <MDButton
                      onClick={(e) => {
                        handleClickOpen(),
                          setDetails({
                            ...details,
                            email: i.email,
                            status: i.status,
                            is_request: i.is_request,
                          });
                      }}
                      variant="outlined"
                      color="error"
                    >
                      Expired
                    </MDButton>
                  ) : i.is_request == 3 ? (
                    <MDButton
                      onClick={(e) => {
                        handleClickOpen(),
                          setDetails({
                            ...details,
                            email: i.email,
                            status: i.status,
                            is_request: i.is_request,
                          });
                      }}
                      variant="outlined"
                      color="success"
                    >
                      Active
                    </MDButton>
                  ) : (
                    " "
                  )}
                </MDBox>
              ),
              delete: (
                <MDBox lineHeight={1}>
                  <MDButton
                    onClick={(e) => handleOpenConfirmation(i?.id)}
                    variant="text"
                    color="error"
                    size="large"
                  >
                    <DeleteForeverIcon />
                  </MDButton>
                </MDBox>
              ),
              // view: (
              //     <MDBox lineHeight={1}>
              //         <MDButton onClick={(e) => { handleViewEdit(), setCredentials({ ...credentials, name: i?.name, email: i?.email, status: i?.status, new_email: i?.email }) }} variant="outlined" color="info" fullWidth>
              //             <VisibilityIcon />
              //         </MDButton>
              //     </MDBox>
              // ),
            });
          }
          setGuestData(temp);
          setOldGuestData(temp);
          // setlastPage(parseData?.last_page);
        } else {
          setGuestData([]);
          toast.error("error");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("err--->", err);
      });
  };

  const createGuest = async () => {
    const encryptedData = Encrypt(
      JSON.stringify({
        name: fields.name,
        email: fields.email,
      })
    );
    await axiosInstanceAuth
      .post("/v1/adm/guest/create", {
        response: encryptedData,
      })
      .then((res) => {
        const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
        getGuestList();
        if (res?.data?.success) {
          toast.success(msg);
          handleCloseBox();
        } else {
          toast.error(msg);
        }
        // handleCloseBox();
      })
      .catch((err) => {
        console.log("err--->", err);
      });
  };

  const deleteGuest = async (id) => {
    await axiosInstanceAuth
      .delete(`/v1/adm/guest/delete/${id}`)
      .then((res) => {
        const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

        if (res?.data?.success) {
          toast.success("Deleted successfully");
          getGuestList();
        } else {
          toast.error(msg);
        }
        handleCloseConfirmation();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const editGuest = async () => {
  //     const encryptedData = Encrypt(
  //         JSON.stringify({
  //             email: credentials.email,
  //             name: credentials.name,
  //             status: credentials.status,
  //             new_email: credentials.new_email,
  //         })
  //     );
  //     await axiosInstanceAuth
  //         .post("/v1/adm/guest/profile/update", {
  //             response: encryptedData,
  //         })
  //         .then((res) => {
  //             const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
  //             getGuestList();
  //             if (res?.data?.success) {
  //                 toast.success(msg);
  //             } else {
  //                 toast.error(msg);
  //             }
  //             handleViewClose();
  //         })
  //         .catch((err) => {
  //             console.log("err--->", err);
  //         });
  // }

  const handelSearch = (e) => {
    if (e.target.value) {
      const searchData = oldGuestData.filter((i) => {
        let name = i?.name?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
        let email = i?.email?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
        let created_at = i?.created_at?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
        let updated_at = i?.updated_at?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());

        return name || email || created_at || updated_at;
      });
      setGuestData(searchData);
    } else {
      setGuestData(oldGuestData);
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
                  Guest Details
                </MDTypography>

                <MDBox bgColor="white" borderRadius="lg">
                  <MDButton
                    sx={{ px: 2, py: 1 }}
                    onClick={popCreateGuest}
                    size="mediam"
                    variant="outlined"
                    color="success"
                  >
                    <AddCircleIcon sx={{ marginRight: 0.5 }} />
                    Create Guest
                  </MDButton>
                </MDBox>
              </MDBox>

              <MDBox mx={2} py={3}>
                <TextField
                  type="text"
                  placeholder="Search"
                  onChange={handelSearch}
                  // onChange={(e) => {
                  //     setAllSearch(e.target.value);
                  //     getGuestList(currentPage, e.target.value);
                  // }}
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
                    table={{ columns: guestColumn, rows: guestData }}
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
            you want to delete this Guest !
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
                onClick={(e) => deleteGuest(deleteID)}
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

      {/* Acion Status Change Pop Up */}

      <Dialog open={openStatus} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to Change status of this Candidate?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <MDButton
            onClick={() => {
              getUpdateGuest(3);
            }}
            variant="outlined"
            color="success"
          >
            Active
          </MDButton>
          <MDButton
            onClick={() => {
              getUpdateGuest(2);
            }}
            variant="outlined"
            color="error"
          >
            Expired
          </MDButton>
        </DialogActions>
      </Dialog>

      {/* Guest Create Form Pop Up */}

      <Dialog open={openBox} onClose={handleCloseBox}>
        <MDBox className="guest-form-conatiner">
          <DialogContent>
            <DialogContentText>
              <MDBox className="close-btn">
                <MDButton onClick={handleCloseBox} variant="text" color="black">
                  <CloseIcon />
                </MDButton>
              </MDBox>
              <MDBox className="Heading">
                <MDTypography variant="h3">Create Guest</MDTypography>
              </MDBox>
              <MDBox component="form" role="form" className="form-content">
                <MDBox mb={2}>
                  <MDTypography variant="h6">Name :</MDTypography>
                  <MDInput
                    type="text"
                    name="name"
                    value={fields.name}
                    onChange={onChange}
                    inputRef=""
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="h6">Email :</MDTypography>
                  <MDInput
                    type="email"
                    name="email"
                    value={fields.email}
                    onChange={onChange}
                    fullWidth
                  />
                </MDBox>
              </MDBox>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <MDButton
              onClick={createGuest}
              variant="contained"
              color="info"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              Send Credentials
            </MDButton>
          </DialogActions>
        </MDBox>
      </Dialog>

      {/* Guest View ? Edit Form Pop Up */}

      {/* <Dialog
                open={openEditBox}
                onClose={handleViewClose}

            >
                <MDBox className="guest-form-conatiner">
                    <DialogContent >
                        <DialogContentText >
                            <MDBox className="close-btn">
                                <MDButton onClick={handleViewClose} variant="text" color="black" >
                                    <CloseIcon />
                                </MDButton>
                            </MDBox>
                            <MDBox className="Heading">
                                <MDTypography variant="h3"  >
                                    Edit Guest
                                </MDTypography>
                            </MDBox>
                            <MDBox component="form" role="form" className="form-content">
                                <MDBox mb={2} >
                                    <MDInput
                                        type="email"
                                        name="email"
                                        value={credentials.email}
                                        label="Email"
                                        fullWidth
                                    />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput
                                        type="text"
                                        name="name"
                                        value={credentials.name}
                                        onChange={onChangeEdit}
                                        label="Name"
                                        fullWidth
                                    />
                                </MDBox>
                                <MDBox mb={2} >
                                    <MDInput
                                        type="number"
                                        name="status"
                                        value={credentials.status}
                                        onChange={onChangeEdit}
                                        label="Status"
                                        fullWidth
                                    />
                                </MDBox>
                                <MDBox mb={2} >
                                    <MDInput
                                        type="email"
                                        name="new_email"
                                        value={credentials.new_email}
                                        onChange={onChangeEdit}
                                        label="New Email"
                                        fullWidth
                                    />
                                </MDBox>
                            </MDBox>
                        </DialogContentText>

                    </DialogContent>
                    <DialogActions >
                        <MDButton onClick={editGuest} variant="contained" color="info" sx={{ display: 'flex', justifyContent: 'center' }}>
                            Update
                        </MDButton>
                    </DialogActions>
                </MDBox>

            </Dialog> */}
    </DashboardLayout>
  );
}
