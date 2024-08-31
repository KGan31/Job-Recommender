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
  const [profileData, setProfileData] = useState(null);
  const email = "user@example.com"; // replace with actual email from user context or authentication

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profile`); // no need to pass email in api since it is handled in backend 
        // the only thing is before profile page the user has to login 

        console.log(response);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, [email]);

  if (!profileData) {
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
              skills={{
                languages: profileData.skills.languages,
                libraries: profileData.skills.libraries,
                frameworks: profileData.skills.frameworks,
              }}
              action={{ route: "/edit-skills", tooltip: "Edit Skills" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            <WorkExperienceCard
              title="Work Experience"
              description="An overview of my professional journey including roles, responsibilities, and contributions."
              experiences={profileData.experience}
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
            <SoftBox mb={1}></SoftBox>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={homeDecor1}
                  label="project #2"
                 
                     title="modern"
                     description="As Uber works through a huge amount of internal management turmoil."
                     action={{
                       type: "internal",
                       route: "/pages/profile/profile-overview",
                       color: "info",
                       label: "view project",
                     }}
                     authors={[
                       { image: team1, name: "Elena Morison" },
                       { image: team2, name: "Ryan Milly" },
                       { image: team3, name: "Nick Daniel" },
                       { image: team4, name: "Peterson" },
                     ]}
                   />
                 </Grid>
                 <Grid item xs={12} md={6} xl={3}>
                   <DefaultProjectCard
                     image={homeDecor2}
                     label="project #1"
                     title="scandinavian"
                     description="Music is something that every person has his or her own specific opinion about."
                     action={{
                       type: "internal",
                       route: "/pages/profile/profile-overview",
                       color: "info",
                       label: "view project",
                     }}
                     authors={[
                       { image: team3, name: "Nick Daniel" },
                       { image: team4, name: "Peterson" },
                       { image: team1, name: "Elena Morison" },
                       { image: team2, name: "Ryan Milly" },
                     ]}
                   />
                 </Grid>
                 <Grid item xs={12} md={6} xl={3}>
                   <DefaultProjectCard
                     image={homeDecor3}
                     label="project #3"
                     title="minimalist"
                     description="Different people have different taste, and various types of music."
                     action={{
                       type: "internal",
                       route: "/pages/profile/profile-overview",
                       color: "info",
                       label: "view project",
                     }}
                     authors={[
                       { image: team4, name: "Peterson" },
                       { image: team3, name: "Nick Daniel" },
                       { image: team2, name: "Ryan Milly" },
                       { image: team1, name: "Elena Morison" },
                     ]}
                   />
                 </Grid>
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
