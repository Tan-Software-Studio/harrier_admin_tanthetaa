import { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import axiosInstanceAuth from 'apiServices/axiosInstanceAuth';
import Decrypt from "customHook/EncryptDecrypt/Decrypt";
import "./index.scss"

import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DataTable from 'examples/Tables/DataTable';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';


export default function ActivityLogModel(uuid) {
    const [candidateUUID, setCandidateUUID] = useState(uuid?.uuid)
    const [activityData, setActivityData] = useState([]);

    useEffect(() => {
        getJobStatusOptions(candidateUUID);
    }, [])

    const getJobStatusOptions = async (candidateUUID) => {
        await axiosInstanceAuth
            .get(`/v1/master/candidate_job_statuses`)
            .then((res) => {
                const myData = JSON.parse(Decrypt(res?.data?.data));
                getSingleATS(candidateUUID, myData)
            })
            .catch((err) => {
                console.log("err--->", err);
            });
    };

    const activityColumn = [
        { Header: "employer name", accessor: "employers_name", align: "left" },
        { Header: "job title", accessor: "job_title", align: "left" },
        { Header: "cv status", accessor: "is_cv", align: "left" },
        { Header: "CV status date", accessor: "request_date", align: "left" },
        // { Header: "interview requests", accessor: "interview_request", align: "left" },
        { Header: "interview requests date", accessor: "interview_request_date", align: "left" },
        { Header: "Job status", accessor: "status", align: "left" },
        { Header: "Offer Accepted Date", accessor: "offer_accepted_date", align: "left" },
        { Header: "salary", accessor: "offer_salary", align: "left" },
        { Header: "bonus / commission", accessor: "offer_bonus_commission", align: "left" },
        { Header: "start date", accessor: "start_date", align: "left" },
    ]

    const getSingleATS = async (candidateUUID, myData) => {
        await axiosInstanceAuth
            .post(`/v1/adm/ats/single/candidate/${candidateUUID}`)
            .then((res) => {
                const request = JSON.parse(Decrypt(res?.data?.data));

                if (res?.data?.success) {
                    const temp = []
                    for (let i of request) {
                        temp.push({
                            employers_name: (
                                <MDBox lineHeight={1}>
                                    <MDTypography
                                        display="block"
                                        variant="button"
                                        fontWeight="medium"
                                    >
                                        {i?.employers_name}
                                    </MDTypography>
                                </MDBox>
                            ),
                            job_title: (
                                <MDBox lineHeight={1}>
                                    <MDTypography
                                        display="block"
                                        variant="button"
                                        fontWeight="medium"
                                    >
                                        {i?.job_title}
                                    </MDTypography>
                                </MDBox>
                            ),
                            is_cv: (
                                <MDBox lineHeight={1}>
                                    {(i?.is_cv == 2) ? (
                                        <MDTypography
                                            variant="button"
                                            fontWeight="medium"
                                            color="success"
                                            className="bg-Color-success"
                                        >
                                            Accepted
                                        </MDTypography>
                                    ) : (i?.is_cv == 1) ? (
                                        <MDTypography
                                            variant="button"
                                            fontWeight="medium"
                                            color="warning"
                                            className="bg-Color-warning"
                                        >
                                            Requested
                                        </MDTypography>
                                    ) : (i?.is_cv == 3) ? (
                                        <MDTypography
                                            variant="button"
                                            fontWeight="medium"
                                            color="error"
                                            className="bg-Color-error"
                                        >
                                            Rejected
                                        </MDTypography>
                                    ) : ""}
                                </MDBox >
                            ),
                            request_date: (
                                <MDBox lineHeight={1}>
                                    <MDTypography
                                        display="block"
                                        variant="button"
                                        fontWeight="medium"
                                    >
                                        {dayjs(i?.request_date).format("DD-MM-YYYY") !== "Invalid Date" ? dayjs(i?.request_date).format("DD-MM-YYYY") : "-"}
                                    </MDTypography>
                                </MDBox>
                            ),
                            interview_request: (
                                <MDBox lineHeight={1}>

                                    {(i?.interview_request == 1) ? (
                                        <MDTypography
                                            variant="button"
                                            fontWeight="medium"
                                            color="success"
                                            className="bg-Color-success"
                                        >
                                            Yes
                                        </MDTypography>
                                    ) : (i?.interview_request == 0) ? (
                                        <MDTypography
                                            variant="button"
                                            fontWeight="medium"
                                            color="error"
                                            className="bg-Color-error"
                                        >
                                            No
                                        </MDTypography>
                                    ) : ""}
                                </MDBox>
                            ),
                            interview_request_date: (
                                <MDBox lineHeight={1}>
                                    <MDTypography
                                        display="block"
                                        variant="button"
                                        fontWeight="medium"
                                    >
                                        {dayjs(i?.interview_request_date).format("DD-MM-YYYY") !== "Invalid Date" ? dayjs(i?.interview_request_date).format("DD-MM-YYYY") : "-"}
                                    </MDTypography>
                                </MDBox>
                            ),
                            status: (
                                <MDBox lineHeight={1}>
                                    <MDTypography
                                        variant="button"
                                        fontWeight="medium"
                                        color="warning"
                                        className="bg-Color-warning"
                                    >
                                        {/* {getTitleFromId(i?.c_job_status)} */}
                                        {myData?.filter((x) => x.id == i?.c_job_status).map(x => x?.title)}
                                    </MDTypography>
                                </MDBox>
                            ),
                            offer_accepted_date: (
                                <MDBox lineHeight={1}>
                                    <MDTypography
                                        display="block"
                                        variant="button"
                                        fontWeight="medium"
                                    >
                                        {dayjs(i?.offer_accepted_date).format("DD-MM-YYYY") !== "Invalid Date" ? dayjs(i?.offer_accepted_date).format("DD-MM-YYYY") : "-"}
                                    </MDTypography>
                                </MDBox>
                            ),
                            offer_salary: (
                                <MDBox lineHeight={1}>
                                    <MDTypography
                                        display="block"
                                        variant="button"
                                        fontWeight="medium"
                                    >
                                        {i?.offer_salary_symbol_list?.currency_code} {i?.offer_salary}
                                    </MDTypography>
                                </MDBox>
                            ),
                            offer_bonus_commission: (
                                <MDBox lineHeight={1}>
                                    <MDTypography
                                        display="block"
                                        variant="button"
                                        fontWeight="medium"
                                    >
                                        {i?.offer_bonus_commission_symbol_list?.currency_code} {i?.offer_bonus_commission}
                                    </MDTypography>
                                </MDBox>
                            ),
                            start_date: (
                                <MDBox lineHeight={1}>
                                    <MDTypography
                                        display="block"
                                        variant="button"
                                        fontWeight="medium"
                                    >
                                        {dayjs(i?.start_date).format("DD-MM-YYYY") !== "Invalid Date" ? dayjs(i?.start_date).format("DD-MM-YYYY") : "-"}
                                    </MDTypography>
                                </MDBox>
                            ),
                        })
                    }
                    setActivityData(temp);
                } else {
                    setActivityData([])
                    toast.error("error")
                }
            })
            .catch((err) => {
                console.log("err--->", err);
            });
    }

    return (
        <Card sx={{ borderRadius: '50%' }}>
            <MDTypography className="heading">Activity Log</MDTypography>
            <MDBox pt={3}>
                <DataTable
                    table={{ columns: activityColumn, rows: activityData }}
                    isSorted={false}
                    canSearch={false}
                />
            </MDBox>
        </Card>
    );
};