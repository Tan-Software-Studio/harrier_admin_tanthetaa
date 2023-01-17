import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Autocomplete, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, TextField, Box, Modal, Typography } from "@mui/material"
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

const RegionsModel = () => {

    const [RegionsData, setRegionsData] = useState([])
    const [countryListOptions, setCountryListOptions] = useState([])
    const [openPopUp, setOpenPopUp] = useState(false);
    const [openEditPopUp, setOpenEditPopUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false)
    const [deleteID, setDeleteID] = useState()

    const [selectCountry, setSelectCountry] = useState({
        id: 1, country_name: "Australia"
    });

    const [currentCountry, setCurrentCountry] = useState({
        id: 1, country_name: "Australia"
    });

    const [fields, setFields] = useState({
        id: "",
        country_name: "",
        state_name: "",
    });

    useEffect(() => {
        getRegions()
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
        createRegions();
        setOpenPopUp(false);
    }

    const handleCloseEditPopUp = () => {
        setOpenEditPopUp(false);
    }

    const handleEdit = (id) => {
        showSingleRegions(id);
        setOpenEditPopUp(true);
    }

    const handleEditStatus = (fields) => {
        editRegions(fields);
        setOpenEditPopUp(false);
    }

    // const handleDelete = (id) => {
    //     deleteRegions(id);
    // }

    const RegionsColumns = [
        { Header: "Country Name", accessor: "country_name", align: "left" },
        { Header: "State Name", accessor: "state_name", align: "left" },
        { Header: "actions", accessor: "actions", align: "center" },
    ]

    const getCountryList = async (RegionsList) => {

        await axiosInstanceAuth
            .post(`/v1/countries/list`)
            .then((res) => {
                const response = Decrypt(res?.data?.data);
                const myData = JSON.parse(response);

                setCountryListOptions(myData?.list)
                setCurrentCountry(myData?.list.filter(x => x?.id == RegionsList?.country_id)?.[0]);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getRegions = async () => {
        setIsLoading(true);
        await axiosInstanceAuth
            .get("/v1/master/mst_regions")
            .then((res) => {
                setIsLoading(false);
                const response = Decrypt(res?.data?.data);
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
                const RegionsList = JSON.parse(response);

                getCountryList();

                if (res?.data?.success) {
                    const temp = []
                    RegionsList?.map((d, i) => {
                        temp.push({
                            country_name: (
                                <MDBox lineHeight={1}>
                                    <MDTypography
                                        display="block"
                                        variant="button"
                                        fontWeight="medium"
                                    >
                                        {d?.country_name}
                                    </MDTypography>
                                </MDBox>
                            ),
                            state_name: (
                                <MDBox lineHeight={1}>
                                    <MDTypography
                                        display="block"
                                        variant="button"
                                        fontWeight="medium"
                                    >
                                        {d?.state_name}
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
                    setRegionsData(temp)
                } else {
                    setRegionsData([])
                    setIsLoading(false);
                    toast.error(msg)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const createRegions = async () => {
        const encryptedData = Encrypt(
            JSON.stringify({
                // country_name: fields?.country_name,
                country_name: selectCountry?.country_name,
                state_name: fields?.state_name,
            })
        );
        await axiosInstanceAuth
            .post("/v1/master/mst_regions", {
                response: encryptedData,
            })
            .then((res) => {
                const response = Decrypt(res?.data?.data);
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                setFields("");

                if (res?.data?.success) {
                    toast.success("Added successfully");
                    getRegions();
                } else {
                    toast.error(msg);
                }


            })
            .catch((err) => {
                console.log(err)
            })
    }

    const showSingleRegions = async (id) => {

        await axiosInstanceAuth
            .get(`/v1/master/mst_regions/show/${id}`)
            .then((res) => {
                const response = Decrypt(res?.data?.data);
                const singleRegions = JSON.parse(response);

                setFields(singleRegions)
                getCountryList(singleRegions)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const editRegions = async (fields) => {
        const encryptedData = Encrypt(
            JSON.stringify({
                // country_name: fields?.country_name,
                country_name: currentCountry?.country_name,
                state_name: fields?.state_name,
            })
        );
        await axiosInstanceAuth
            .post(`/v1/master/mst_regions/update/${fields?.id}`, {
                response: encryptedData,
            })
            .then((res) => {
                const response = Decrypt(res?.data?.data);
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                setFields("");

                if (res?.data?.success) {
                    toast.success("Updated successfully");
                    getRegions();
                } else {
                    toast.error(msg);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const deleteRegions = async (id) => {
        await axiosInstanceAuth
            .delete(`/v1/master/mst_regions/delete/${id}`)
            .then((res) => {
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                if (res?.data?.success) {
                    toast.success("Deleted successfully");
                    getRegions();
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
                        Regions
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
                            table={{ columns: RegionsColumns, rows: RegionsData }}
                        />
                    )}
                </MDBox>
            </Card>

            {/* ADD  Regions Form Pop Up */}

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
                                    Add Regions
                                </MDTypography>
                            </MDBox>
                            <MDBox component="form" role="form" className="form-content">
                                <MDBox className="detail-content" >

                                    <Autocomplete
                                        options={countryListOptions}
                                        getOptionLabel={
                                            (option) => (option.country_name || "")
                                        }
                                        value={selectCountry || {}}
                                        onChange={(e, value) => {
                                            setSelectCountry(value);
                                        }}
                                        renderInput={
                                            params => (
                                                <TextField {...params} variant="outlined" label="Country Name" />
                                            )
                                        }
                                        fullWidth
                                    />

                                    {/* <MDInput
                                        type="text"
                                        name="country_name"
                                        value={fields?.country_name || ""}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setFields({
                                                ...fields,
                                                [e.target.name]: e.target.value,
                                            });
                                        }}
                                        fullWidth
                                        variant="outlined"
                                        label="Country Name"
                                    /> */}
                                </MDBox>
                                <MDBox mb={2} className="detail-content">
                                    <MDInput
                                        type="text"
                                        name="state_name"
                                        value={fields?.state_name || ""}
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
                                        label="State Name"
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

            {/* Edit  Regions Form Pop Up */}

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
                                    Edit Regions
                                </MDTypography>
                            </MDBox>
                            <MDBox component="form" role="form" className="form-content">
                                <MDBox className="detail-content">

                                    <Autocomplete
                                        options={countryListOptions}
                                        getOptionLabel={
                                            (option) => (option.country_name || "")
                                        }
                                        value={currentCountry || {}}
                                        onChange={(e, value) => {
                                            setCurrentCountry(value);
                                        }}
                                        renderInput={
                                            params => (
                                                <TextField {...params} variant="outlined" label="Country Name" />
                                            )
                                        }
                                        fullWidth
                                    />

                                    {/* <MDInput
                                        type="text"
                                        name="country_name"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setFields({
                                                ...fields,
                                                [e.target.name]: e.target.value,
                                            });
                                        }}
                                        value={fields.country_name || ""}
                                        fullWidth
                                        variant="outlined"
                                        label="Country Name"
                                    /> */}
                                </MDBox>
                                <MDBox mb={2} className="detail-content">
                                    <MDInput
                                        type="text"
                                        name="state_name"
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
                                        value={fields.state_name || ""}
                                        fullWidth
                                        variant="outlined"
                                        label="State Name"
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
                        you want to delete this Region !
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
                                onClick={(e) => deleteRegions(deleteID)}
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

export default RegionsModel;
