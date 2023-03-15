import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Card, Grid, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axiosInstanceAuth from "apiServices/axiosInstanceAuth";
import Decrypt from "customHook/EncryptDecrypt/Decrypt";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import { alpha, styled } from "@mui/material/styles";

export default function JobSection() {
  const [employerData, setEmployerData] = useState([]);
  const [oldEmployerData, setOldEmployerData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") !== null;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  });

  useEffect(() => {
    getEmployerList();
  }, []);

  const employerColumn = [
    { Header: "Avtar", accessor: "logo_path", align: "center" },
    { Header: "Name", accessor: "name", align: "left" },
    { Header: "Website", accessor: "url", align: "left" },
    { Header: "Email", accessor: "email", align: "left" },
    { Header: "View Jobs", accessor: "view_jobs", align: "left" },
  ];

  const handleViewjobs = (e) => {
    navigate(`/jobs/${e?.uuid}`);
  };

  const getEmployerList = async () => {
    setIsLoading(true);

    await axiosInstanceAuth
      .post(`/v1/adm/employers/list?page=`)
      .then((res) => {
        setIsLoading(false);
        const myData = JSON.parse(Decrypt(res?.data?.data));
        const employersList = myData?.data;

        if (res?.data?.success) {
          const temp = [];
          for (let d of employersList) {
            temp.push({
              uuid: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {d?.uuid}
                  </MDTypography>
                </MDBox>
              ),
              logo_path: (
                <MDBox lineHeight={1}>
                  <Avatar alt="avtar" src={d?.logo_path} sx={{ width: 56, height: 56 }} />
                </MDBox>
              ),
              name: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {d?.name}
                  </MDTypography>
                </MDBox>
              ),
              url: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {d?.url}
                  </MDTypography>
                </MDBox>
              ),
              email: (
                <MDBox lineHeight={1}>
                  <MDTypography display="block" variant="button" fontWeight="medium">
                    {d?.email}
                  </MDTypography>
                </MDBox>
              ),

              view_jobs: (
                <MDBox lineHeight={1}>
                  <MDButton
                    onClick={(e) => {
                      handleViewjobs(d);
                    }}
                    variant="outlined"
                    color="info"
                    fullWidth
                  >
                    <VisibilityIcon />
                  </MDButton>
                </MDBox>
              ),
            });
          }
          setEmployerData(temp);
          setOldEmployerData(temp);
        } else {
          setEmployerData([]);
          toast.error("error");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("err--->", err);
      });
  };

  const handelSearch = (e) => {
    if (e.target.value) {
      const searchData = oldEmployerData.filter((i) => {
        let name = i?.name?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
        let url = i?.url?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
        let email = i?.email?.props?.children?.props?.children
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());

        return name || url || email;
      });
      setEmployerData(searchData);
    } else {
      setEmployerData(oldEmployerData);
    }
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
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <MDTypography variant="h6" color="white">
                  Jobs Section
                </MDTypography>
              </MDBox>

              <MDBox mx={2} py={3}>
                <TextField
                  type="text"
                  placeholder="Search"
                  onChange={handelSearch}
                  sx={{ width: "99%", flex: 1, margin: "0 10px" }}
                />
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
                    table={{ columns: employerColumn, rows: employerData }}
                    isSorted={false}
                    canSearch={false}
                    showTotalEntries={true}
                    pagination={true}
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
