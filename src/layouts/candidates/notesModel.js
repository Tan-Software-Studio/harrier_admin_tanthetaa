import { Card, FormControl } from "@mui/material"
import axiosInstanceAuth from "apiServices/axiosInstanceAuth"
import MDBox from "components/MDBox"
import MDTypography from "components/MDTypography"
import DataTable from "examples/Tables/DataTable"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Decrypt from "customHook/EncryptDecrypt/Decrypt"
import Encrypt from "customHook/EncryptDecrypt/Encrypt"
import MDInput from "components/MDInput"
import MDButton from "components/MDButton"
import dayjs from 'dayjs';

const NotesModel = (uuid) => {

    // document.getElementById("myInput").addEventListener("keypress", function (event) {
    //     if (event.key === "Enter") {
    //         event.preventDefault();
    //         document.getElementById("myBtn").click();
    //     }
    // });

    const [candidateUUID, setCandidateUUID] = useState(uuid?.uuid)
    const [notesListData, setNotesListData] = useState([])
    const [note, setNote] = useState("");

    useEffect(() => {
        getNotesList(candidateUUID)
    }, [])


    const NotesListColumns = [
        { Header: "date", accessor: "created_at", align: "left" },
        { Header: "note", accessor: "note", align: "left" },
    ]

    const getNotesList = async (candidateUUID) => {
        await axiosInstanceAuth
            .get(`/v1/adm/notes/${candidateUUID}`)
            .then((res) => {
                const response = Decrypt(res?.data?.data);
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
                const ListsData = JSON.parse(response);

                if (res?.data?.success) {
                    const temp = []
                    ListsData?.map((d, i) => {
                        temp.push({
                            created_at: (
                                <MDBox lineHeight={1}>
                                    <MDTypography
                                        display="block"
                                        variant="button"
                                        fontWeight="medium"
                                    >
                                        {dayjs(d?.created_at).format("DD-MM-YYYY")}
                                    </MDTypography>
                                </MDBox>
                            ),
                            note: (
                                <MDBox lineHeight={1}>
                                    <MDTypography
                                        display="block"
                                        variant="button"
                                        fontWeight="medium"
                                    >
                                        {d?.note}
                                    </MDTypography>
                                </MDBox>
                            ),
                        })
                    })
                    setNotesListData(temp)
                } else {
                    setNotesListData([])
                    toast.error(msg)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handelCreateNotes = (candidateUUID) => {
        createNewNotes(candidateUUID)
    }

    const createNewNotes = async (candidateUUID) => {
        const encryptedData = Encrypt(
            JSON.stringify({
                uuid: candidateUUID,
                note: note,
            })
        );
        await axiosInstanceAuth
            .post(`/v1/adm/note/create`, {
                response: encryptedData,
            })
            .then((res) => {
                const response = Decrypt(res?.data?.data);
                const msg = Decrypt(res?.data?.message).replace(/"/g, " ");

                setNote("");

                if (res?.data?.success) {
                    toast.success("Added successfully");
                    getNotesList(candidateUUID);
                } else {
                    toast.error(msg);
                }

            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Card sx={{ borderRadius: '50%' }}>
            <MDTypography className="heading">Note</MDTypography>
            <MDBox m={2} className="detail-content">
                <MDInput
                    id="myInput"
                    type="text"
                    name="note"
                    label="Add Note Here"
                    onChange={(e) => {
                        setNote(e.target.value);
                    }}
                    onKeyPress={(event) => {
                        var key = event.keyCode || event.which;
                        if (key === 13) {
                            handelCreateNotes(candidateUUID)
                        }
                    }}
                    value={note || ""}
                    fullWidth
                    className="text-input-field"
                />
                <MDButton m={5} id="myBtn" onClick={(e) => handelCreateNotes(candidateUUID)} variant="gradient" color="info" className="add-btn">
                    Add
                </MDButton>
            </MDBox>
            <MDBox>
                <DataTable
                    table={{ columns: NotesListColumns, rows: notesListData }}
                    isSorted={false}
                    canSearch={false}
                />
            </MDBox>
        </Card>
    )
}

export default NotesModel;
