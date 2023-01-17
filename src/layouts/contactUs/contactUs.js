import { Box, Card, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from '@mui/material';

import axiosInstanceAuth from 'apiServices/axiosInstanceAuth';
import Decrypt from "customHook/EncryptDecrypt/Decrypt";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from 'react';
import "./contactUs.scss"
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DataTable from 'examples/Tables/DataTable';
import { toast } from 'react-toastify';
import MDButton from 'components/MDButton';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import Encrypt from 'customHook/EncryptDecrypt/Encrypt';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MDInput from 'components/MDInput';


export default function ContactUs() {

    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [unReadContactUs, setUnReadContactUs] = useState([])
    const [allContactUs, setAllContactUs] = useState([])

    const [openBox, setOpenBox] = useState(false);
    const [singleData, setSingleData] = useState({})


    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("token") != null;

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
        }
    });

    useEffect(() => {
        getAllContactUsList();
        getUnreadContactUsList();
    }, [])

    const ContactUsColumn = [
        { Header: "name", accessor: "name", align: "left" },
        { Header: "email", accessor: "email", align: "left" },
        { Header: "phone", accessor: "phone", align: "left" },
        { Header: "subject", accessor: "subject", align: "left" },
        { Header: "action", accessor: "action", align: "center" },
    ]

    const AllContactUsColumn = [
        { Header: "name", accessor: "name", align: "left" },
        { Header: "email", accessor: "email", align: "left" },
        { Header: "phone", accessor: "phone", align: "left" },
        { Header: "subject", accessor: "subject", align: "left" },
        { Header: "action", accessor: "action", align: "center" },
    ]

    const handleDelete = (notification_id) => {
        deleteContactUs(notification_id);
    }

    const handleview = (notification_id) => {
        viewContactUs(notification_id);
        setOpenBox(true);
    }

    const handleCloseBox = () => {
        if (value == 2) {
            getUnreadContactUsList()
        }
        setOpenBox(false);
    };

    const handleMarkAsRead = (notification_id) => {
        markAsReadContactUs(notification_id);
    }


    const getAllContactUsList = async () => {
        if (isLoggedIn) {
            await axiosInstanceAuth
                .get("v1/adm/contactus/list")
                .then((res) => {
                    const data = JSON.parse(Decrypt(res?.data?.data));

                    if (res?.data?.success) {
                        const temp = []
                        for (let i of data) {
                            temp.push({
                                name: (
                                    <MDBox lineHeight={1}>
                                        <MDTypography
                                            display="block"
                                            variant="button"
                                            fontWeight="medium"
                                        >
                                            {i?.name}
                                        </MDTypography>
                                    </MDBox>
                                ),
                                email: (
                                    <MDBox lineHeight={1}>
                                        <MDTypography
                                            display="block"
                                            variant="button"
                                            fontWeight="medium"
                                        >
                                            {i?.email}
                                        </MDTypography>
                                    </MDBox>
                                ),
                                phone: (
                                    <MDBox lineHeight={1}>
                                        <MDTypography
                                            display="block"
                                            variant="button"
                                            fontWeight="medium"
                                        >
                                            {i?.phone}
                                        </MDTypography>
                                    </MDBox>
                                ),
                                subject: (
                                    <MDBox lineHeight={1}>
                                        <MDTypography
                                            display="block"
                                            variant="button"
                                            fontWeight="medium"
                                        >
                                            {i?.subject}
                                        </MDTypography>
                                    </MDBox>
                                ),
                                action: (
                                    <MDBox lineHeight={1}>
                                        <MDButton onClick={(e) => handleview(i?.id)} variant="text" color="info" size="large">
                                            <VisibilityIcon />
                                        </MDButton>
                                        <MDButton onClick={(e) => handleDelete(i?.id)} variant="text" color="error" size="large">
                                            <DeleteForeverIcon />
                                        </MDButton>
                                        {/* <MDButton onClick={(e) => handleMarkAsRead(i?.id)} variant="text" color="info" size="large">
                                            <MarkEmailReadIcon />
                                        </MDButton> */}
                                    </MDBox>
                                ),
                            })
                        }
                        setAllContactUs(temp);
                    } else {
                        setAllContactUs([])
                        toast.error("error")
                    }
                })
                .catch((err) => {
                    console.log("err --->", err);
                });
        }
    };

    const getUnreadContactUsList = async () => {
        if (isLoggedIn) {
            await axiosInstanceAuth
                .get("v1/adm/contactus/list/unread")
                .then((res) => {
                    const data = JSON.parse(Decrypt(res?.data?.data));

                    if (res?.data?.success) {
                        const temp = []
                        for (let i of data) {
                            temp.push({
                                name: (
                                    <MDBox lineHeight={1}>
                                        <MDTypography
                                            display="block"
                                            variant="button"
                                            fontWeight="medium"
                                        >
                                            {i?.name}
                                        </MDTypography>
                                    </MDBox>
                                ),
                                email: (
                                    <MDBox lineHeight={1}>
                                        <MDTypography
                                            display="block"
                                            variant="button"
                                            fontWeight="medium"
                                        >
                                            {i?.email}
                                        </MDTypography>
                                    </MDBox>
                                ),
                                phone: (
                                    <MDBox lineHeight={1}>
                                        <MDTypography
                                            display="block"
                                            variant="button"
                                            fontWeight="medium"
                                        >
                                            {i?.phone}
                                        </MDTypography>
                                    </MDBox>
                                ),
                                subject: (
                                    <MDBox lineHeight={1}>
                                        <MDTypography
                                            display="block"
                                            variant="button"
                                            fontWeight="medium"
                                        >
                                            {i?.subject}
                                        </MDTypography>
                                    </MDBox>
                                ),
                                action: (
                                    <MDBox lineHeight={1}>
                                        <MDButton onClick={(e) => handleview(i?.id)} variant="text" color="info" size="large">
                                            <VisibilityIcon />
                                        </MDButton>
                                        <MDButton onClick={(e) => handleDelete(i?.id)} variant="text" color="error" size="large">
                                            <DeleteForeverIcon />
                                        </MDButton>
                                        {/* <MDButton onClick={(e) => handleMarkAsRead(i?.id)} variant="text" color="info" size="large">
                                            <MarkEmailReadIcon />
                                        </MDButton> */}
                                    </MDBox>
                                ),
                            })
                        }
                        setUnReadContactUs(temp);
                    } else {
                        setUnReadContactUs([])
                        toast.error("error")
                    }
                })
                .catch((err) => {
                    console.log("err --->", err);
                });
        }
    };

    const viewContactUs = async (notification_id) => {
        if (isLoggedIn) {
            await axiosInstanceAuth
                .get(`v1/adm/contactus/show/${notification_id}`)
                .then((res) => {
                    const data = JSON.parse(Decrypt(res?.data?.data));

                    if (res?.data?.success) {
                        setSingleData(data);
                    } else {
                        toast.error("error")
                    }
                })
                .catch((err) => {
                    console.log("err --->", err);
                });
        }
    };



    const deleteContactUs = async (notification_id) => {
        if (isLoggedIn) {
            await axiosInstanceAuth
                .delete(`v1/adm/contactus/delete/${notification_id}`)
                .then((res) => {
                    const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                    if (res?.data?.success) {
                        getUnreadContactUsList();
                        getAllContactUsList();
                        toast.success(msg)
                    } else {
                        toast.error("error")
                    }
                })
                .catch((err) => {
                    console.log("err --->", err);
                });
        }
    };

    // const markAsReadContactUs = async (notification_id) => {
    //     if (isLoggedIn) {
    //         await axiosInstanceAuth
    //             .post(`v1/adm/contactus/mark_as_read/${notification_id}`)
    //             .then((res) => {
    //                 const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

    //                 if (res?.data?.success) {
    //                     getUnreadContactUsList();
    //                     getAllContactUsList();
    //                     toast.success(msg)
    //                 } else {
    //                     toast.error("error")
    //                 }
    //             })
    //             .catch((err) => {
    //                 console.log("err --->", err);
    //             });
    //     }
    // };

    // const markAsAllReadContactUs = async () => {
    //     if (isLoggedIn) {
    //         await axiosInstanceAuth
    //             .post(`v1/adm/contactus/mark_as_read`)
    //             .then((res) => {
    //                 const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

    //                 if (res?.data?.success) {
    //                     getUnreadContactUsList();
    //                     getAllContactUsList();
    //                     toast.success(msg)
    //                 } else {
    //                     toast.error("error")
    //                 }
    //             })
    //             .catch((err) => {
    //                 console.log("err --->", err);
    //             });
    //     }
    // };

    return (
        <DashboardLayout>
            <DashboardNavbar />

            <TabContext value={value}>
                <MDBox
                    mx={2}
                    py={1}
                    px={1}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <TabList onChange={handleChange} sx={{ bgcolor: "#5A9BD5" }} >
                        <Tab label="All" value="1" sx={{ width: "100px", color: "yellow" }} />
                        <Tab label="Unread" value="2" sx={{ width: "100px" }} />
                    </TabList>
                </MDBox>
                <TabPanel value="1">
                    <MDBox pt={3} pb={3}>
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
                                        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                    >
                                        <MDTypography variant="h6" color="white">
                                            All
                                        </MDTypography>

                                        {/* <MDBox bgColor="white" borderRadius="lg">
                                            <MDButton
                                                sx={{ px: 2, py: 1 }}
                                                // onClick={markAsAllReadContactUs} 
                                                size="mediam"
                                                variant="outlined"
                                                color="info"
                                            >
                                                <MarkEmailReadIcon sx={{ marginRight: 0.5 }} />
                                                Mark as All Read
                                            </MDButton>
                                        </MDBox> */}
                                    </MDBox>

                                    <MDBox pt={3}>
                                        <DataTable
                                            table={{ columns: AllContactUsColumn, rows: allContactUs }}
                                            isSorted={false}
                                            canSearch={false}
                                        />
                                    </MDBox>
                                </Card>
                            </Grid>
                        </Grid>
                    </MDBox>
                </TabPanel>
                <TabPanel value="2">
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
                                        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                    >
                                        <MDTypography variant="h6" color="white">
                                            Unread
                                        </MDTypography>

                                        {/* <MDBox bgColor="white" borderRadius="lg">
                                            <MDButton
                                                sx={{ px: 2, py: 1 }}
                                                // onClick={markAsAllReadContactUs}
                                                size="mediam"
                                                variant="outlined"
                                                color="info"
                                            >
                                                <MarkEmailReadIcon sx={{ marginRight: 0.5 }} />
                                                Mark as All Read
                                            </MDButton>
                                        </MDBox> */}
                                    </MDBox>

                                    <MDBox pt={3}>
                                        <DataTable
                                            table={{ columns: ContactUsColumn, rows: unReadContactUs }}
                                            isSorted={false}
                                            canSearch={false}
                                        />
                                    </MDBox>
                                </Card>
                            </Grid>
                        </Grid>
                    </MDBox>
                </TabPanel>
            </TabContext>

            <Dialog
                open={openBox}
                onClose={handleCloseBox}

            >
                <MDBox className="conatct-form-conatiner">
                    <DialogContent>
                        <DialogContentText >
                            <MDBox className="close-btn">
                                <MDButton onClick={handleCloseBox} variant="text" color="black" >
                                    <CloseIcon />
                                </MDButton>
                            </MDBox>
                            <MDBox className="Heading">
                                <MDTypography variant="h3"  >
                                    Message
                                </MDTypography>
                            </MDBox>
                            <MDBox component="form" role="form" className="form-content">
                                <MDBox mb={2} className="content-wrapper">
                                    <MDTypography variant="h6" className="title">
                                        Name
                                    </MDTypography>
                                    <MDTypography variant="h6" className="description">
                                        {singleData.name}
                                    </MDTypography>
                                </MDBox>
                                <MDBox mb={2} className="content-wrapper">
                                    <MDTypography variant="h6" className="title">
                                        Email
                                    </MDTypography>
                                    <MDTypography variant="h6" className="description">
                                        {singleData.email}
                                    </MDTypography>
                                </MDBox>
                                <MDBox mb={2} className="content-wrapper">
                                    <MDTypography variant="h6" className="title">
                                        Phone
                                    </MDTypography>
                                    <MDTypography variant="h6" className="description">
                                        {singleData.phone}
                                    </MDTypography>
                                </MDBox>
                                <MDBox mb={2} className="content-wrapper">
                                    <MDTypography variant="h6" className="title">
                                        Subject
                                    </MDTypography>
                                    <MDTypography variant="h6" className="description">
                                        {singleData.subject}
                                    </MDTypography>
                                </MDBox>
                                <MDBox mb={2} className="content-wrapper">
                                    <MDTypography variant="h6" className="title">
                                        Message
                                    </MDTypography>
                                    <MDTypography variant="h6" className="description">
                                        {singleData.message}
                                    </MDTypography>
                                </MDBox>
                            </MDBox>
                        </DialogContentText>

                    </DialogContent>
                    <DialogActions >
                        <MDButton onClick={handleCloseBox} variant="contained" color="info" sx={{ display: 'flex', justifyContent: 'center' }}>
                            Close
                        </MDButton>
                    </DialogActions>
                </MDBox>

            </Dialog>

        </DashboardLayout>
    );
};