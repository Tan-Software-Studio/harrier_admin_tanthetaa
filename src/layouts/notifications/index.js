import {
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";

import axiosInstanceAuth from "apiServices/axiosInstanceAuth";
import Decrypt from "customHook/EncryptDecrypt/Decrypt";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { toast } from "react-toastify";
import MDButton from "components/MDButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import Encrypt from "customHook/EncryptDecrypt/Encrypt";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function Notifications() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [unReadNotification, setUnReadNotification] = useState([]);
  const [allNotification, setAllNotification] = useState([]);

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") != null;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  });

  useEffect(() => {
    getUnreadNotificationsList();
    getAllNotificationsList();
  }, []);

  const notificationColumn = [
    { Header: "From", accessor: "email", align: "left" },
    { Header: "Message", accessor: "message", align: "left" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const AllNotificationColumn = [
    { Header: "From", accessor: "email", align: "left" },
    { Header: "Message", accessor: "message", align: "left" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const handleDelete = (notification_id) => {
    deleteNotification(notification_id);
  };

  const handleMarkAsRead = (notification_id) => {
    markAsReadNotification(notification_id);
  };

  const getAllNotificationsList = async () => {
    if (isLoggedIn) {
      await axiosInstanceAuth
        .post("/v1/adm/all/notifications")
        .then((res) => {
          const data = JSON.parse(Decrypt(res?.data?.data));
          const AllNotifications = data?.notifications;

          if (res?.data?.success) {
            const temp = [];
            for (let i of AllNotifications) {
              temp.push({
                email: (
                  <MDBox lineHeight={1}>
                    <MDTypography display="block" variant="button" fontWeight="medium">
                      {i?.data?.email}
                    </MDTypography>
                  </MDBox>
                ),
                message: (
                  <MDBox lineHeight={1}>
                    <MDTypography display="block" variant="button" fontWeight="medium">
                      {i?.data?.message}
                    </MDTypography>
                  </MDBox>
                ),
                action: (
                  <MDBox lineHeight={1}>
                    <MDButton
                      onClick={(e) => handleDelete(i?.id)}
                      variant="text"
                      color="error"
                      size="large"
                    >
                      <DeleteForeverIcon />
                    </MDButton>
                    <MDButton
                      onClick={(e) => handleMarkAsRead(i?.id)}
                      variant="text"
                      color="info"
                      size="large"
                    >
                      <MarkEmailReadIcon />
                    </MDButton>
                  </MDBox>
                ),
              });
            }
            setAllNotification(temp);
          } else {
            setAllNotification([]);
            toast.error("error");
          }
        })
        .catch((err) => {
          console.log("err --->", err);
        });
    }
  };

  const getUnreadNotificationsList = async () => {
    if (isLoggedIn) {
      await axiosInstanceAuth
        .post("/v1/adm/unread/notifications")
        .then((res) => {
          const data = JSON.parse(Decrypt(res?.data?.data));
          const Notifications = data?.notifications;

          if (res?.data?.success) {
            const temp = [];
            for (let i of Notifications) {
              temp.push({
                email: (
                  <MDBox lineHeight={1}>
                    <MDTypography display="block" variant="button" fontWeight="medium">
                      {i?.data?.email}
                    </MDTypography>
                  </MDBox>
                ),
                message: (
                  <MDBox lineHeight={1}>
                    <MDTypography display="block" variant="button" fontWeight="medium">
                      {i?.data?.message}
                    </MDTypography>
                  </MDBox>
                ),
                action: (
                  <MDBox lineHeight={1}>
                    <MDButton
                      onClick={(e) => handleDelete(i?.id)}
                      variant="text"
                      color="error"
                      size="large"
                    >
                      <DeleteForeverIcon />
                    </MDButton>
                    <MDButton
                      onClick={(e) => handleMarkAsRead(i?.id)}
                      variant="text"
                      color="info"
                      size="large"
                    >
                      <MarkEmailReadIcon />
                    </MDButton>
                  </MDBox>
                ),
              });
            }
            setUnReadNotification(temp);
          } else {
            setUnReadNotification([]);
            toast.error("error");
          }
        })
        .catch((err) => {
          console.log("err --->", err);
        });
    }
  };

  const deleteNotification = async (notification_id) => {
    if (isLoggedIn) {
      await axiosInstanceAuth
        .post(`/v1/adm/delete/notification/${notification_id}`)
        .then((res) => {
          const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

          if (res?.data?.success) {
            getUnreadNotificationsList();
            getAllNotificationsList();
            toast.success(msg);
          } else {
            toast.error("error");
          }
        })
        .catch((err) => {
          console.log("err --->", err);
        });
    }
  };

  const markAsReadNotification = async (notification_id) => {
    if (isLoggedIn) {
      await axiosInstanceAuth
        .post(`/v1/adm/mark_as_read/notification/${notification_id}`)
        .then((res) => {
          const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

          if (res?.data?.success) {
            getUnreadNotificationsList();
            getAllNotificationsList();
            toast.success(msg);
          } else {
            toast.error("error");
          }
        })
        .catch((err) => {
          console.log("err --->", err);
        });
    }
  };

  const markAsAllReadNotification = async () => {
    if (isLoggedIn) {
      await axiosInstanceAuth
        .post(`/v1/adm/mark_as_read/notifications`)
        .then((res) => {
          const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

          if (res?.data?.success) {
            getUnreadNotificationsList();
            getAllNotificationsList();
            toast.success(msg);
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

      <TabContext value={value}>
        <MDBox
          mx={2}
          py={1}
          px={1}
          sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <TabList onChange={handleChange} sx={{ bgcolor: "#5A9BD5" }}>
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
                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <MDTypography variant="h6" color="white">
                      Notifications
                    </MDTypography>

                    <MDBox bgColor="white" borderRadius="lg">
                      <MDButton
                        sx={{ px: 2, py: 1 }}
                        onClick={markAsAllReadNotification}
                        size="mediam"
                        variant="outlined"
                        color="info"
                      >
                        <MarkEmailReadIcon sx={{ marginRight: 0.5 }} />
                        Mark as All Read
                      </MDButton>
                    </MDBox>
                  </MDBox>

                  <MDBox pt={3}>
                    <DataTable
                      table={{ columns: AllNotificationColumn, rows: allNotification }}
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
                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <MDTypography variant="h6" color="white">
                      Unread Notifications
                    </MDTypography>

                    <MDBox bgColor="white" borderRadius="lg">
                      <MDButton
                        sx={{ px: 2, py: 1 }}
                        onClick={markAsAllReadNotification}
                        size="mediam"
                        variant="outlined"
                        color="info"
                      >
                        <MarkEmailReadIcon sx={{ marginRight: 0.5 }} />
                        Mark as All Read
                      </MDButton>
                    </MDBox>
                  </MDBox>

                  <MDBox pt={3}>
                    <DataTable
                      table={{ columns: notificationColumn, rows: unReadNotification }}
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
    </DashboardLayout>
  );
}
