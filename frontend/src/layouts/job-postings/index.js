import { useState, useEffect } from "react";
import axios from "axios";
// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultBlogCard from "examples/Cards/BlogCards/DefaultBlogCard";
import "./job-postings.css"
import { getJSONTypes } from "ajv/dist/compile/validate/dataType";

function JobPostings() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const getJobs = async () => {
            const res = await axios.get('http://localhost:5000/api/jobs')
            // console.log(res);
            setJobs(res.data);
        };

        getJobs();
    }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3} style={{"min-height":"100vh"}}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            {jobs.length > 0 && (
                jobs.map((job, index) => (
                    <Grid item xs={12} sm={6} xl={4} className="job-card" key={index}>
                        <DefaultBlogCard 
                            image="https://upload.wikimedia.org/wikipedia/commons/1/18/Zeta_Services_logo.png"
                            title={job.title}
                            description={job.Description.slice(0,200) + '...'} 
                            action="internal"
                        />
                    </Grid>  
                ))
            )}
            
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default JobPostings;
