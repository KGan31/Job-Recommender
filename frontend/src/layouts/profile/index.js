import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import SkillsCard from "examples/Cards/InfoCards/SkillsCard";
import WorkExperienceCard from "examples/Cards/InfoCards/WorkExCard";
import Header from "layouts/profile/components/Header";
import SoftBox from "components/SoftBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import SoftTypography from "components/SoftTypography";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";
import ProfileScoreCard from "./components/ProfileScoreCard";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const headers = {
  "Access-Control-Allow-Origin": true,
  "Content-Type": "application/json",
  Accept: "application/json",
};

function Overview() {
  const [profileData, setProfileData] = useState(null);
  const [verifiedSkills, setVerifiedSkills] = useState([]); // State for verified skills
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profile/${email}`, headers);
        setProfileData(response.data);
        // Update verified skills based on what is in local storage
        const storedVerifiedSkills = JSON.parse(localStorage.getItem("verifiedSkills")) || [];
        setVerifiedSkills(storedVerifiedSkills);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, [email]);

  if (!profileData || !profileData.skills) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <Header />

      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={6}>
            <Card
              style={{
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
                height: "100%",
              }}
            >
              <SoftTypography fontWeight="medium" variant="h6">
                Links
              </SoftTypography>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <GitHubIcon sx={{ width: "18px", height: "18px" }} />
                  <SoftTypography fontWeight="regular" variant="button" color="text">
                    Github:
                  </SoftTypography>
                  {profileData && profileData.github ? (
                    <SoftTypography fontWeight="regular" variant="button" color="text">
                      {profileData.github}
                    </SoftTypography>
                  ) : (
                    <SoftTypography fontWeight="regular" variant="button" color="text">
                      No link added
                    </SoftTypography>
                  )}
                </div>
                {profileData && profileData.github ? (
                  <SoftTypography color="secondary" variant="body">
                    <EditIcon sx={{ width: "18px", height: "18px", cursor: "pointer" }} />
                  </SoftTypography>
                ) : (
                  <SoftTypography color="secondary" variant="body">
                    <AddCircleOutlineIcon
                      sx={{ width: "18px", height: "18px", cursor: "pointer" }}
                    />
                  </SoftTypography>
                )}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <LinkedInIcon sx={{ width: "18px", height: "18px" }} />
                  <SoftTypography fontWeight="regular" variant="button" color="text">
                    LinkedIn:
                  </SoftTypography>
                  {profileData && profileData.linkedIn ? (
                    <SoftTypography fontWeight="regular" variant="button" color="text">
                      {profileData.linkedIn}
                    </SoftTypography>
                  ) : (
                    <SoftTypography fontWeight="regular" variant="button" color="text">
                      No link added
                    </SoftTypography>
                  )}
                </div>
                {profileData && profileData.linkedIn ? (
                  <SoftTypography color="secondary" variant="body">
                    <EditIcon sx={{ width: "18px", height: "18px", cursor: "pointer" }} />
                  </SoftTypography>
                ) : (
                  <SoftTypography color="secondary" variant="body">
                    <AddCircleOutlineIcon
                      sx={{ width: "18px", height: "18px", cursor: "pointer" }}
                    />
                  </SoftTypography>
                )}
              </div>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} xl={6}>
            <ProfileScoreCard profileData={profileData} />
          </Grid>
        </Grid>
      </SoftBox>

      <SoftBox mt={3} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={6}>
            <SkillsCard
              title="Skills"
              description="A comprehensive overview of my technical expertise including languages, libraries, and frameworks I frequently use."
              skills={profileData.skills}
              verifiedSkills={verifiedSkills} // Pass verified skills
              action={{ route: "/edit-skills", tooltip: "Edit Skills" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            <WorkExperienceCard
              title="Work Experience"
              description="An overview of my professional journey including roles, responsibilities, and contributions."
              experiences={profileData.experiences}
              action={{ route: "/edit-experience", tooltip: "Edit Work Experience" }}
            />
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox mb={3}>
        <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              <SoftTypography variant="h6" fontWeight="medium">
                Projects
              </SoftTypography>
            </SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              {profileData.projects?.length > 0 ? (
                profileData.projects.map((project, index) => (
                  <Grid item xs={12} md={6} xl={3} key={index}>
                    <DefaultProjectCard
                      image="https://res.cloudinary.com/dyxnmjtrg/image/upload/v1687757420/aes1_dbwjjp.png"
                      title={project.title}
                      description={project.description}
                      action={{
                        type: "internal",
                        route: "/pages/profile/profile-overview",
                        color: "info",
                        label: "View Project",
                      }}
                    />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12} md={6} xl={3}>
                  <PlaceholderCard
                    title={{ variant: "h5", text: "No projects available" }}
                    outlined
                  />
                </Grid>
              )}
              <Grid item xs={12} md={6} xl={3}>
                <PlaceholderCard title={{ variant: "h5", text: "New project" }} outlined />
              </Grid>
            </Grid>
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
