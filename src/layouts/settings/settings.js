import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Grid } from "@mui/material"
import MDBox from "components/MDBox"
import DashboardLayout from "examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "examples/Navbars/DashboardNavbar"
import "./index.scss"

import EmpTypeModel from "./empTypeModel"
import CandidateJobStatusModel from "./candidateJobStatusModel"
import LanguagesModel from "./langaugesModel"
import QualificationsModel from "./qualificationsModel"
import CandidatesStatusModel from "./candidateStatusModel"
import CustomerTypesModel from "./customerTypesModel"
import LegalTechToolsModel from "./legalTechToolsModel"
import TechToolsModel from "./techToolsModel"
import GendersModel from "./gendersModel"
import SexesModel from "./sexesModel"
import RegionsModel from "./regionsModel"
import WorkingArrangmentsModel from "./workingArrangmentsModel"
import CulturalBackgroundsModel from "./culturalBackgroundsModel"
import FaithsModel from "./faithsModel"
import ChannelsModel from "./channelsModel"
import SchoolTypesModel from "./schoolTypesModel"
import MainEarnerOccupationsModel from "./MainEarnerOccupationsModel"
import SexualOrientationsModel from "./SexualOrientationsModel"
import CurrenciesModel from "./CurrenciesModel"


const Settings = () => {

    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("token") !== null;

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
        }
    });

    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox pt={6} pb={3}>
                    <Grid container spacing={6}>
                        <Grid item md={6}>
                            {/* Candidate Job Status Model  */}
                            <CandidateJobStatusModel />
                        </Grid>
                        <Grid item md={6}>
                            {/* Candidates Status Model  */}
                            <CandidatesStatusModel />
                        </Grid>
                    </Grid>
                </MDBox>

                <MDBox pt={6} pb={3}>
                    <Grid container spacing={6}>
                        <Grid item md={6}>
                            {/* Employer Types Model  */}
                            <EmpTypeModel />
                        </Grid>
                        <Grid item md={6}>
                            {/* Customer Types Model  */}
                            <CustomerTypesModel />
                        </Grid>
                    </Grid>
                </MDBox>

                <MDBox pt={6} pb={3}>
                    <Grid container spacing={6}>
                        <Grid item md={6}>
                            {/* Languages Model  */}
                            <LanguagesModel />
                        </Grid>
                        <Grid item md={6}>
                            {/* Qualifications Model  */}
                            <QualificationsModel />
                        </Grid>
                    </Grid>
                </MDBox>

                <MDBox pt={6} pb={3}>
                    <Grid container spacing={6}>
                        <Grid item md={6}>
                            {/* Legal Tech Tools Model  */}
                            <LegalTechToolsModel />
                        </Grid>
                        <Grid item md={6}>
                            {/* Tech Tools Model  */}
                            <TechToolsModel />
                        </Grid>
                    </Grid>
                </MDBox>

                <MDBox pt={6} pb={3}>
                    <Grid container spacing={6}>
                        <Grid item md={6}>
                            {/* Genders Model  */}
                            <GendersModel />
                        </Grid>
                        <Grid item md={6}>
                            {/* Sexes Model  */}
                            <SexesModel />
                        </Grid>
                    </Grid>
                </MDBox>

                <MDBox pt={6} pb={3}>
                    <Grid container spacing={6}>
                        <Grid item md={6}>
                            {/* Regions Model  */}
                            <RegionsModel />
                        </Grid>
                        <Grid item md={6}>
                            {/* Working Arrangements Model  */}
                            <WorkingArrangmentsModel />
                        </Grid>
                    </Grid>
                </MDBox>

                <MDBox pt={6} pb={3}>
                    <Grid container spacing={6}>
                        <Grid item md={6}>
                            {/* Cultural Backgrounds Model  */}
                            <CulturalBackgroundsModel />
                        </Grid>
                        <Grid item md={6}>
                            {/* Faiths Model  */}
                            <FaithsModel />
                        </Grid>
                    </Grid>
                </MDBox>

                <MDBox pt={6} pb={3}>
                    <Grid container spacing={6}>
                        <Grid item md={6}>
                            {/*Channels Model  */}
                            <ChannelsModel />
                        </Grid>
                        <Grid item md={6}>
                            {/* School Types Model  */}
                            <SchoolTypesModel />
                        </Grid>
                    </Grid>
                </MDBox>

                <MDBox pt={6} pb={3}>
                    <Grid container spacing={6}>
                        <Grid item md={6}>
                            {/* Sexual Orientations Model  */}
                            <SexualOrientationsModel />
                        </Grid>
                        <Grid item md={6}>
                            {/* Currencies Model  */}
                            <CurrenciesModel />
                        </Grid>
                    </Grid>
                </MDBox>

                <MDBox pt={6} pb={3}>
                    <Grid container spacing={6}>
                        <Grid item md={12}>
                            {/*Main Earner Occupations Model  */}
                            <MainEarnerOccupationsModel />
                        </Grid>
                    </Grid>
                </MDBox>
            </DashboardLayout>
        </>
    )
}

export default Settings;
