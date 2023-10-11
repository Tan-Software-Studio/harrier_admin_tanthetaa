// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstanceAuth from "apiServices/axiosInstanceAuth";
import Decrypt from "customHook/EncryptDecrypt/Decrypt";
import Skeleton from "react-loading-skeleton";

function Dashboard() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") !== null;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    await axiosInstanceAuth
      .get(`/v1/adm/dashboard`)
      .then((res) => {
        const countData = JSON.parse(Decrypt(res?.data?.data));
        const msg = Decrypt(res?.data?.message).replace(/"/g, " ");
        setIsLoading(false);
        if (res?.data?.success) {
          setData(countData);
        } else {
          toast.error(msg);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {isLoading ? (
          <Skeleton
            highlightColor="#d4d4d4"
            baseColor="#e0e0e0"
            borderRadius="20px"
            count={6}
            width="97%"
            height="115px"
            style={{ margin: "0px 1.5%" }}
          />
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5} className="pointer" onClick={(e) => navigate("/candidates")}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="persons"
                  title="Total Candidates"
                  count={data.candidates_count || 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5} className="pointer" onClick={(e) => navigate("/employers")}>
                <ComplexStatisticsCard
                  color="info"
                  icon="persons"
                  title="Total Employers"
                  count={data.employers_count || 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5} className="pointer" onClick={(e) => navigate("/guest")}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="persons"
                  title="Total Guests"
                  count={data.guests_count || 0}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5} className="pointer" onClick={(e) => navigate("/cv-list")}>
                <ComplexStatisticsCard
                  color="info"
                  icon="groups"
                  title="Today Requests"
                  count={
                    data.today_candidate_profile_count +
                      data.today_employer_register_count +
                      data.today_guests_request_count || 0
                  }
                />
              </MDBox>
            </Grid>
          </Grid>
        )}
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
