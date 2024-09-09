import React from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function JobDetailPopup({ open, onClose, job, missingSkills }) {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.setItem('skills', JSON.stringify(missingSkills));
    navigate('/recommend-courses');
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="job-detail-popup"
      aria-describedby="job-detail-description"
    >
      <Box
        sx={{
          maxWidth: 600,
          p: 4,
          margin: "auto",
          mt: 15,
          bgcolor: "background.paper",
          borderRadius: 2,
          height: 400, // Set height to 400px
          overflowY: "auto",
          boxShadow: 24, // Add shadow for better visibility
          outline: "none", // Remove default outline
        }}
      >
        <Typography variant="h5" mb={2} fontWeight="bold" color="text.primary">
          {job.title}
        </Typography>
        <Typography variant="subtitle1" mb={2} color="text.secondary">
          Company: <strong>{job.company}</strong>
        </Typography>
        <Typography variant="body1" mb={2} color="text.secondary">
          Location: <strong>{job.location}</strong>
        </Typography>
        <Typography variant="body1" mb={2} color="text.secondary">
          Annual Salary: <strong>{job.annual_salary}</strong>
        </Typography>
        <Typography variant="body1" mb={2} color="text.secondary">
          Minimum CGPA: <strong>{job.cgpa_min}</strong>
        </Typography>
        <Typography variant="body1" mb={2} color="text.secondary">
          Skills Required: <strong>{job.skills_req.join(", ")}</strong>
        </Typography>
        <Typography variant="body1" mb={2} color="text.secondary">
          Years of Experience Required: <strong>{job.years_of_exp_min}</strong>
        </Typography>
        <Typography variant="body1" mb={2} color="text.secondary">
          Job Description:
        </Typography>
        <Typography variant="body2" mb={2} color="text.primary">
          {job.Description}
        </Typography>
        <div style={{display : "flex", justifyContent: "start", gap: "16px"}}>
          <Typography variant="h6" mt={2} mb={1} color="text.primary">
            Missing Skills
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
            style={{ color: "#ffffff" }}
            onClick={() => handleClick()}
          >
            Recommend Courses
          </Button>
        </div>
    
        {missingSkills.length > 0 ? (
          <ul style={{ paddingLeft: 20, marginBottom: 0 }}>
            {missingSkills.map((skill, index) => (
              <li key={index} style={{ marginBottom: 5 }}>
                {skill}
              </li>
            ))}
          </ul>
        ) : (
          <Typography variant="body2" color="success.main">
            You have all the required skills!
          </Typography>
        )}
        <Button variant="contained" color="primary" onClick={onClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}

JobDetailPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  job: PropTypes.shape({
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    annual_salary: PropTypes.string.isRequired,
    cgpa_min: PropTypes.number.isRequired,
    skills_req: PropTypes.arrayOf(PropTypes.string).isRequired,
    years_of_exp_min: PropTypes.number.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  missingSkills: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default JobDetailPopup;
