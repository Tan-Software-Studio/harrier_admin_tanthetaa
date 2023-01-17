import { Card, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import axiosInstanceAuth from 'apiServices/axiosInstanceAuth';
import Encrypt from "customHook/EncryptDecrypt/Encrypt";
import Decrypt from "customHook/EncryptDecrypt/Decrypt";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from 'react';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DataTable from 'examples/Tables/DataTable';

export default function Admin() {
    const [adminData, setAdminData] = useState([])

    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("token") != null;

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
        }
    });

    const adminColumn = [
        { Header: "id", accessor: "id", align: "left" },
        { Header: "role", accessor: "role", align: "left" },
        { Header: "name", accessor: "name", align: "left" },
        { Header: "email", accessor: "email", align: "left" },
    ]

    const getData = async () => {
        if (isLoggedIn) {
            await axiosInstanceAuth
                .post("/v1/adm/details")
                .then((res) => {
                    const data = JSON.parse(Decrypt(res?.data?.data));
                    const adminData = data?.details

                    if (res?.data?.success) {
                        const temp = []
                        // for (let i of adminData) {
                        temp.push({
                            id: (
                                < MDBox lineHeight={1} >
                                    <MDTypography
                                        display="block"
                                        variant="button"
                                        fontWeight="medium"
                                    >
                                        {adminData?.id}
                                    </MDTypography>
                                </ MDBox>
                            ),
                            role: (
                                <MDBox lineHeight={1}>
                                    <MDTypography
                                        display="block"
                                        variant="button"
                                        fontWeight="medium"
                                    >
                                        {adminData?.role}
                                    </MDTypography>
                                </MDBox>
                            ),
                            name: (
                                <MDBox lineHeight={1}>
                                    <MDTypography
                                        display="block"
                                        variant="button"
                                        fontWeight="medium"
                                    >
                                        {adminData?.name}
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
                                        {adminData?.email}
                                    </MDTypography>
                                </MDBox>
                            ),
                        })
                        // }
                        setAdminData(temp);
                    } else {
                        setAdminData([])
                        toast.error("error")
                    }
                })
                .catch((err) => {
                    console.log("err --->", err);
                });
        }
    };

    useEffect(() => {
        getData();
    }, [])

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
                                    Admin Details
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={3}>
                                <DataTable
                                    table={{ columns: adminColumn, rows: adminData }}
                                    isSorted={false}
                                    canSearch={false}
                                />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
};