import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import axiosInstanceAuth from 'apiServices/axiosInstanceAuth';
import Encrypt from "customHook/EncryptDecrypt/Encrypt";
import Decrypt from "customHook/EncryptDecrypt/Decrypt";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DataTable from 'examples/Tables/DataTable';

export default function EmployersList() {

    const [employerTypeList, setEmployerTypeList] = useState([])
    const [lastPage, setlastPage] = useState();

    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("token") !== null;

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
        }
    });

    useEffect(() => {
        getEmployerTypeList(1);
    }, [])

    const handleChangePage = (event, value) => {
        getEmployerTypeList(value);
    }

    const employerTypeColumn = [
        { Header: "id", accessor: "id", align: "left" },
        { Header: "title", accessor: "title", align: "left" },
        { Header: "status", accessor: "status", align: "left" },
        { Header: "type_id", accessor: "type_id", align: "left" },
    ]

    const getEmployerTypeList = async (page) => {
        await axiosInstanceAuth
            .post(`/v1/adm/employer_type/typelist?page=${page}`)

            .then((res) => {
                const myData = JSON.parse(Decrypt(res?.data?.data));
                const employersTypeList = myData?.data;
                setEmployerTypeList(employersTypeList);

                // if (res?.data?.success) {
                //     const temp = []
                //     for (let d of employersTypeList) {
                //         temp.push({
                //             id: (
                //                 <MDBox lineHeight={1}>
                //                     <MDTypography
                //                         display="block"
                //                         variant="button"
                //                         fontWeight="medium"
                //                     >
                //                         {d?.id}
                //                     </MDTypography>
                //                 </MDBox>
                //             ),
                //             title: (
                //                 <MDBox lineHeight={1}>
                //                     <MDTypography
                //                         display="block"
                //                         variant="button"
                //                         fontWeight="medium"
                //                     >
                //                         {d?.title}
                //                     </MDTypography>
                //                 </MDBox>
                //             ),
                //             status: (
                //                 <MDBox lineHeight={1}>
                //                     <MDTypography
                //                         display="block"
                //                         variant="button"
                //                         fontWeight="medium"
                //                     >
                //                         {d?.status}
                //                     </MDTypography>
                //                 </MDBox>
                //             ),
                //             type_id: (
                //                 <MDBox lineHeight={1}>
                //                     <MDTypography
                //                         display="block"
                //                         variant="button"
                //                         fontWeight="medium"
                //                     >
                //                         {d?.type_id}
                //                     </MDTypography>
                //                 </MDBox>
                //             ),

                //         })
                //     }
                //     setEmployerTypeList(temp);
                // } else {
                //     setEmployerTypeList([])
                //     toast.error("error")
                // }
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
                                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <MDTypography variant="h6" color="white">
                                    Employers Type List
                                </MDTypography>

                                {/* <MDBox bgColor="white" borderRadius="lg">
                                    <MDButton sx={{ px: 2, py: 1 }} onClick={createEmployerType} size="mediam" variant="outlined" color="success">
                                        <AddCircleIcon sx={{ marginRight: 0.5 }} />
                                        Create Employer Type
                                    </MDButton>
                                </MDBox> */}
                            </MDBox>
                            <MDBox pt={3}>
                                <DataTable
                                    table={{ columns: employerTypeColumn, rows: employerTypeList }}
                                    isSorted={false}
                                    canSearch={false}
                                />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>

            <Stack spacing={2} alignItems="center">
                <Pagination count={lastPage} onChange={handleChangePage} size="small" />
            </Stack>

        </DashboardLayout >
    );
};