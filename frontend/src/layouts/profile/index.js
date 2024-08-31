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

function Overview() {
  const [profileData, setProfileData] = useState({
    skills: [],
    work_ex: [],
    projects: []
  });
  //const email = "user@example.com"; // replace with actual email from user context or authentication
const email = localStorage.getItem('userEmail');
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profile/${email}`);
        console.log("Fetched profile data:", response.data);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profileData || !profileData.skills) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <Header />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={6}>
            <SkillsCard
              title="Skills"
              description="A comprehensive overview of my technical expertise including languages, libraries, and frameworks I frequently use."
              skills={profileData.skills}
              action={{ route: "/edit-skills", tooltip: "Edit Skills" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            <WorkExperienceCard
              title="Work Experience"
              description="An overview of my professional journey including roles, responsibilities, and contributions."
              experiences={profileData.work_ex}
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
    {profileData.projects.length > 0 ? (
      profileData.projects.map((project, index) => (
        <Grid item xs={12} md={6} xl={3} key={index}>
          <DefaultProjectCard
            image="https://res.cloudinary.com/dyxnmjtrg/image/upload/v1687757420/aes1_dbwjjp.png" // Provide a placeholder or default image if needed
            title={project.projectName}
            description={project.description}
            duration={project.duration} // Make sure you pass the duration if it's part of the project data
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
        <PlaceholderCard title={{ variant: "h5", text: "No projects available" }} outlined />
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
