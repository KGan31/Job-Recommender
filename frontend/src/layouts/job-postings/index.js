import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftBox from "components/SoftBox";
import JobDetailPopup from "layouts/JobDetailPopup"; // Adjust the import path if necessary

function JobPostings() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [missingSkills, setMissingSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileSkills, setProfileSkills] = useState([]); // Replace with actual skills from profile

  useEffect(() => {
    const getJobs = async () => {
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data.jobs);
      const temp = res.data.user_skills;
      temp.filter(skill => skill.toLowerCase());
      setProfileSkills(temp);
      console.log(res)
    };
    getJobs();
  }, []);

  const handleJobClick = (job) => {
    const missing = job.skills_req.filter((skill) => !profileSkills.includes(skill.toLowerCase()));
    console.log(profileSkills);
    console.log(missing);
    setSelectedJob(job);
    setMissingSkills(missing);
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3} style={{ minHeight: "100vh" }}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            {jobs.length > 0 &&
              jobs.map((job, index) => (
                <Grid item xs={12} sm={6} xl={4} key={index}>
                  <Card
                    onClick={() => handleJobClick(job)}
                    style={{ cursor: "pointer", height: "100%" }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt={job.title}
                        height="140"
                        image={job.image_link}
                        title={job.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {job.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {job.Description.slice(0, 200) + "..."}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />

      {selectedJob && (
        <JobDetailPopup
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          job={selectedJob}
          missingSkills={missingSkills}
        />
      )}
    </DashboardLayout>
  );
}

export default JobPostings;
