import React, { useState } from "react";
import axios from "axios";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import "./form.css";

const UserProfileForm = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    mobile: "",
    location: "",
  });
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState([{ jobTitle: "", duration: "", description: "" }]);
  const [projects, setProjects] = useState([{ projectName: "", duration: "", description: "" }]);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (e) => {
    console.log(e.target.name, e.target.value);
    setSkills({ ...skills, [e.target.name]: e.target.value });
  };

  const handleExperienceChange = (index, e) => {
    const updatedExperience = experience.map((exp, i) =>
      i === index ? { ...exp, [e.target.name]: e.target.value } : exp
    );
    setExperience(updatedExperience);
  };

  const handleAddExperience = () => {
    setExperience([...experience, { jobTitle: "", duration: "", description: "" }]);
  };

  const handleProjectChange = (index, e) => {
    const updatedProjects = projects.map((project, i) =>
      i === index ? { ...project, [e.target.name]: e.target.value } : project
    );
    setProjects(updatedProjects);
  };

  const handleAddProject = () => {
    setProjects([...projects, { projectName: "", duration: "", description: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      skills: skills, // Assuming `skills` is a string
      work_ex: experience,
      projects: projects,
    };

    try {
      await axios.post("http://localhost:5000/api/save-profile", data);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data.");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3} style={{ "min-height": "100vh" }}>
        <SoftBox mb={3}>
          <div
            className="form-container"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dyxnmjtrg/image/upload/v1725120113/FORM-555-removebg-preview_eh9onv.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "100vh",
            }}
          >
            <form onSubmit={handleSubmit}>
              {/* <div className="card">
                <h2>Profile Information</h2>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleProfileChange}
                  // required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleProfileChange}
                  // required
                />
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile"
                  onChange={handleProfileChange}
                  // required
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  onChange={handleProfileChange}
                  // required
                />
              </div> */}

              <div className="card">
                <h2>Skills</h2>
                <input
                  type="text"
                  name="skills"
                  placeholder="Skills (comma separated)"
                  onChange={handleSkillsChange}
                />
              </div>

              <div className="card">
                <h2>Work Experience</h2>
                {experience.map((exp, index) => (
                  <div key={index} className="experience-entry">
                    <input
                      type="text"
                      name="jobTitle"
                      placeholder="Job Title"
                      value={exp.jobTitle}
                      onChange={(e) => handleExperienceChange(index, e)}
                      required
                    />
                    <input
                      type="text"
                      name="duration"
                      placeholder="Duration (e.g., Jan 2020 - Present)"
                      value={exp.duration}
                      onChange={(e) => handleExperienceChange(index, e)}
                      required
                    />
                    <textarea
                      name="description"
                      placeholder="Job Description"
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(index, e)}
                      required
                    ></textarea>
                  </div>
                ))}
                <button type="button" onClick={handleAddExperience}>
                  Add Another Experience
                </button>
              </div>

              <div className="card">
                <h2>Projects</h2>
                {projects.map((project, index) => (
                  <div key={index} className="project-entry">
                    <input
                      type="text"
                      name="projectName"
                      placeholder="Project Name"
                      value={project.projectName}
                      onChange={(e) => handleProjectChange(index, e)}
                      required
                    />
                    <input
                      type="text"
                      name="duration"
                      placeholder="Duration (e.g., Jan 2020 - Present)"
                      value={project.duration}
                      onChange={(e) => handleProjectChange(index, e)}
                      required
                    />
                    <textarea
                      name="description"
                      placeholder="Project Description"
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, e)}
                      required
                    ></textarea>
                  </div>
                ))}
                <button type="button" onClick={handleAddProject}>
                  Add Another Project
                </button>
              </div>

              <button className="submit-button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
};

export default UserProfileForm;
