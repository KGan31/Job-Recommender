import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";
import { Mail } from "@mui/icons-material";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import curved0 from "assets/images/curved-images/curved0.jpg";
import burceMars from "assets/images/bruce-mars.jpg";
import breakpoints from "assets/theme/base/breakpoints";

const headers = {
  "Access-Control-Allow-Origin": true,
  "Content-Type": "application/json",
  Accept: "application/json",
};

function Header() {
  const navigate = useNavigate();
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [profileInfo, setProfileInfo] = useState({ name: "", email: "" }); // Initialize state

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, []);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profile/${email}`);
        console.log("Fetched profile data:", response.data);
        setProfileInfo(response.data); // Set profile data
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleClick = async () => {
    try {
      navigate("/profile/resume-wizard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute light />
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <SoftAvatar
              src={burceMars}
              alt="profile-image"
              variant="rounded"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                {profileInfo.name || "Name not available"}{" "}
                {/* Handle case where name might not be available */}
              </SoftTypography>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.25rem",
                  fontSize: "15px",
                }}
              >
                {/* <Mail style={{ fontSize: "inherit", marginRight: "8px",  }} /> */}
                {profileInfo.email || "Email not available"}{" "}
                {/* Handle case where email might not be available */}
              </span>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                Student
              </SoftTypography>
            </SoftBox>
          </Grid>
          {/* <Grid
            item
            xs={12}
            md={6}
            lg={4}
            sx={{ ml: "auto", display: "flex", alignItems: "center", fontSize: 16 }}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <Mail style={{ fontSize: "inherit", marginRight: "8px" }} />
              {profileInfo.email || "Email not available"}{" "} */}
          {/* Handle case where email might not be available */}
          {/* </span>
          </Grid> */}

          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            sx={{
              ml: "auto",
              display: "flex",
              alignItems: "center",
              fontSize: 16,
              justifyContent: "end",
            }}
          >
            <SoftButton color="primary" size="medium" circular="true" onClick={() => handleClick()}>
              Export as Resume
            </SoftButton>
          </Grid>
        </Grid>
      </Card>
    </SoftBox>
  );
}

export default Header;
