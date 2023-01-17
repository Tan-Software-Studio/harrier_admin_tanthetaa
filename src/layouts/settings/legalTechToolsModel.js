import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, Modal, Typography } from "@mui/material"
import axiosInstanceAuth from "apiServices/axiosInstanceAuth"
import MDBox from "components/MDBox"
import MDTypography from "components/MDTypography"
import DataTable from "examples/Tables/DataTable"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Decrypt from "customHook/EncryptDecrypt/Decrypt"
import CloseIcon from '@mui/icons-material/Close';
import MDButton from "components/MDButton"
import MDInput from "components/MDInput"
import Encrypt from "customHook/EncryptDecrypt/Encrypt"
import Skeleton from "react-loading-skeleton";

const LegalTechToolsModel = () => {

    const [LegalTechToolsData, setLegalTechToolsData] = useState([])
    const [openPopUp, setOpenPopUp] = useState(false);
    const [openEditPopUp, setOpenEditPopUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false)
    const [deleteID, setDeleteID] = useState()

    const [fields, setFields] = useState({
        id: "",
        title: "",
    });

    useEffect(() => {
        getLegalTechTools()
    }, [])

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 425,
        bgcolor: "background.paper",
        border: "0px solid #000",
        boxShadow: 24,
        borderRadius: 4,
        p: 4
    };

    const handleOpenConfirmation = (id) => {
        setDeleteID(id);
        setIsDeleteConfirmation(true);
    }

    const handleCloseConfirmation = () => {
        setIsDeleteConfirmation(false);
    }

    const handelOpenPopUP = () => {
        setOpenPopUp(true);
    }

    const handleClosePopUp = () => {
        setOpenPopUp(false);
    }

    const handleUpdateStatus = () => {
        createLegalTechTools();
        setOpenPopUp(false);
    }

    const handleCloseEditPopUp = () => {
        setOpenEditPopUp(false);
    }

    const handleEdit = (id) => {
        showSingleLegalTechTools(id);
        setOpenEditPopUp(true);
    }

    const handleEditStatus = (fields) => {
        editLegalTechTools(fields);
        setOpenEditPopUp(false);
    }

    // const handleDelete = (id) => {
    //     deleteLegalTechTools(id);
    // }

    const LegalTechToolsColumns = [
        { Header: "title", accessor: "title", align: "left" },
        { Header: "actions", accessor: "actions", align: "center" },
    ]

    const getLegalTechTools = async () => {
        setIsLoading(true);
        await axiosInstanceAuth
            .get("/v1/master/mst_legal_tech_tools")
            .then((res) => {
                setIsLoading(false);
                const response = Decrypt(res?.data?.data);
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
                const LegalTechToolsList = JSON.parse(response);

                if (res?.data?.success) {
                    const temp = []
                    LegalTechToolsList?.map((d, i) => {
                        temp.push({
                            title: (
                                <MDBox lineHeight={1}>
                                    <MDTypography
                                        display="block"
                                        variant="button"
                                        fontWeight="medium"
                                    >
                                        {d?.title}
                                    </MDTypography>
                                </MDBox>
                            ),
                            actions: (
                                <MDBox lineHeight={1}>
                                    <MDButton onClick={(e) => handleEdit(d?.id)} variant="text" color="info" size="large">
                                        <EditIcon />
                                    </MDButton>
                                    <MDButton onClick={(e) => handleOpenConfirmation(d?.id)} variant="text" color="error" size="large">
                                        <DeleteForeverIcon />
                                    </MDButton>
                                </MDBox>
                            ),
                        })
                    })
                    setLegalTechToolsData(temp)
                } else {
                    setLegalTechToolsData([])
                    setIsLoading(false);
                    toast.error(msg)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const createLegalTechTools = async () => {
        const encryptedData = Encrypt(
            JSON.stringify({
                title: fields?.title,
            })
        );
        await axiosInstanceAuth
            .post("/v1/master/mst_legal_tech_tools", {
                response: encryptedData,
            })
            .then((res) => {
                const response = Decrypt(res?.data?.data);
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                setFields("");

                if (res?.data?.success) {
                    toast.success("Added successfully");
                    getLegalTechTools();
                } else {
                    toast.error(msg);
                }


            })
            .catch((err) => {
                console.log(err)
            })
    }

    const showSingleLegalTechTools = async (id) => {

        await axiosInstanceAuth
            .get(`/v1/master/mst_legal_tech_tools/show/${id}`)
            .then((res) => {
                const response = Decrypt(res?.data?.data);
                const singleLegalTechTools = JSON.parse(response);

                setFields(singleLegalTechTools)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const editLegalTechTools = async (fields) => {
        const encryptedData = Encrypt(
            JSON.stringify({
                title: fields?.title,
            })
        );
        await axiosInstanceAuth
            .post(`/v1/master/mst_legal_tech_tools/update/${fields?.id}`, {
                response: encryptedData,
            })
            .then((res) => {
                const response = Decrypt(res?.data?.data);
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                setFields("");

                if (res?.data?.success) {
                    toast.success("Updated successfully");
                    getLegalTechTools();
                } else {
                    toast.error(msg);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deleteLegalTechTools = async (id) => {
        await axiosInstanceAuth
            .delete(`/v1/master/mst_legal_tech_tools/delete/${id}`)
            .then((res) => {
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                if (res?.data?.success) {
                    toast.success("Deleted successfully");
                    getLegalTechTools();
                } else {
                    toast.error(msg);
                }
                handleCloseConfirmation();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <Card>
                <MDBox
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    mt={-3}
                    py={2}
                    px={2}
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                >
                    <MDTypography variant="h6" color="white">
                        Legal Tech Tools
                    </MDTypography>
                    <Button
                        variant="contained"
                        onClick={handelOpenPopUP}
                        color="success"
                        startIcon={<AddCircleIcon />}
                    >
                        Add
                    </Button>
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
                            table={{ columns: LegalTechToolsColumns, rows: LegalTechToolsData }}
                        />
                    )}
                </MDBox>
            </Card>

            {/* ADD Legal Tech Tools Form Pop Up */}

            <Dialog
                open={openPopUp}
                onClose={handleClosePopUp}

            >
                <MDBox className="job-status-form-conatiner">
                    <DialogContent >
                        <DialogContentText >
                            <MDBox className="close-btn">
                                <MDButton onClick={handleClosePopUp} variant="text" color="black" >
                                    <CloseIcon />
                                </MDButton>
                            </MDBox>
                            <MDBox className="Heading">
                                <MDTypography variant="h3"  >
                                    Add  Legal Tech Tools
                                </MDTypography>
                            </MDBox>
                            <MDBox component="form" role="form" className="form-content">
                                <MDBox mb={2} className="detail-content">
                                    <MDInput
                                        type="text"
                                        name="title"
                                        value={fields?.title || ""}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setFields({
                                                ...fields,
                                                [e.target.name]: e.target.value,
                                            });
                                        }}
                                        onKeyPress={(event) => {
                                            var key = event.keyCode || event.which;
                                            if (key === 13) {
                                                handleUpdateStatus()
                                            }
                                        }}
                                        fullWidth
                                        variant="outlined"
                                        label="Title"
                                    />
                                </MDBox>
                            </MDBox>
                        </DialogContentText>

                    </DialogContent>
                    <DialogActions >
                        <MDButton onClick={handleUpdateStatus} variant="contained" color="info" sx={{ display: 'flex', justifyContent: 'center' }}>
                            Add
                        </MDButton>
                    </DialogActions>
                </MDBox>
            </Dialog>

            {/* Edit Legal Tech Tools Form Pop Up */}

            <Dialog
                open={openEditPopUp}
                onClose={handleCloseEditPopUp}

            >
                <MDBox className="job-status-form-conatiner">
                    <DialogContent >
                        <DialogContentText >
                            <MDBox className="close-btn">
                                <MDButton onClick={handleCloseEditPopUp} variant="text" color="black" >
                                    <CloseIcon />
                                </MDButton>
                            </MDBox>
                            <MDBox className="Heading">
                                <MDTypography variant="h3"  >
                                    Edit  Legal Tech Tools
                                </MDTypography>
                            </MDBox>
                            <MDBox component="form" role="form" className="form-content">
                                <MDBox mb={2} className="detail-content">
                                    <MDInput
                                        type="text"
                                        name="title"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setFields({
                                                ...fields,
                                                [e.target.name]: e.target.value,
                                            });
                                        }}
                                        onKeyPress={(event) => {
                                            var key = event.keyCode || event.which;
                                            if (key === 13) {
                                                handleEditStatus(fields);
                                            }
                                        }}
                                        value={fields.title || ""}
                                        fullWidth
                                        variant="outlined"
                                        label="Title"
                                    />
                                </MDBox>
                            </MDBox>
                        </DialogContentText>

                    </DialogContent>
                    <DialogActions >
                        <MDButton
                            onClick={(e) => handleEditStatus(fields)}
                            variant="contained"
                            color="info"
                            sx={{ display: 'flex', justifyContent: 'center' }}
                        >
                            Update
                        </MDButton>
                    </DialogActions>
                </MDBox>
            </Dialog>

            {/* Delete Confirmation Pop Up */}

            <Modal open={isDeleteConfirmation}
                onClose={
                    () => setIsDeleteConfirmation(false)
                }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h3" sx={{ display: "flex", justifyContent: "center", padding: "15px" }}>
                        Are you sure ?
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" sx={{ display: "flex", justifyContent: "center" }}>
                        you want to delete this Legal Tech Tool !
                    </Typography>
                    <MDBox component="form" role="form" mt={4} sx={{ display: "flex", justifyContent: "center" }}>
                        <MDBox mx={1}>
                            <MDButton
                                onClick={handleCloseConfirmation}
                                variant="outlined"
                                color="info"
                                fullWidth
                            >
                                Close
                            </MDButton>
                        </MDBox>
                        <MDBox mx={1}>
                            <MDButton
                                onClick={(e) => deleteLegalTechTools(deleteID)}
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


        </>
    )
}

export default LegalTechToolsModel;
