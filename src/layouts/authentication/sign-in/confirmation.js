import { Box, Button, Modal, Typography } from '@mui/material'
import axiosInstanceAuth from 'apiServices/axiosInstanceAuth';
import MDBox from 'components/MDBox'
import MDButton from 'components/MDButton';
import MDTypography from 'components/MDTypography';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LogOutConfirmation = () => {

    const navigate = useNavigate();
    const [isEditConfirmation, setIsEditConfirmation] = useState(true)

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
        p: 4
    };

    const confirm = async () => {
        await axiosInstanceAuth
            .post("/v1/logout");
        localStorage.removeItem("token");
        navigate("/");

    }

    const Close = () => {
        setIsEditConfirmation(false)
        navigate(-1)
    }

    return (
        <>
            <Modal open={isEditConfirmation}
                onClose={
                    () => setIsEditConfirmation(false)
                }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h2" sx={{ display: "flex", justifyContent: "center", padding: "15px" }}>
                        Are you sure ?
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" sx={{ display: "flex", justifyContent: "center" }}>
                        you want to Logout !
                    </Typography>
                    <MDBox component="form" role="form">
                        <MDBox mt={4}
                            mb={1}>
                            <MDButton onClick={confirm}
                                variant="gradient"
                                color="info"
                                fullWidth>
                                Yes
                            </MDButton>
                        </MDBox>
                        <MDBox textAlign="center">
                            <MDTypography style={
                                { cursor: "pointer" }
                            }
                                variant="button"
                                color="info"
                                fontWeight="medium"
                                textGradient
                                onClick={Close}>
                                Close
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Box>
            </Modal>
        </>
    )
}

export default LogOutConfirmation
