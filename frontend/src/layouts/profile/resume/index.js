/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card } from "@mui/material";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import DocViewer from "react-doc-viewer";
import SoftButton from "components/SoftButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddSkillModal from "./components/AddSkillModal";
import ExtraCurrModal from "./components/ExtraCurrModal";

//https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg

function Resume() {
  const [resumeDetails, setResumeDetails] = useState([]); // check the format of the resume details returned from backend
  const [isSkill, setIsSkill] = useState(false);
  const [isExtra, setIsExtra] = useState(false);
  const [isExtraEdit, setIsExtraEdit] = useState(false);
  const [openExtra, setOpenExtra] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [editedDetails, setEditedDetails] = useState({
    github: "https://github.com",
    linkedIn: "djfdjkfdfdf",
    email: "mgr@gmail.com",
    education: [
      {
        university: "VJTI",
        degree: "B.Tech",
        from: "",
        to: "",
        location: "",
        cgpa: 0,
      },
    ],
    skills: ["React", "Vue.js", "Laravel", "Node.js"],
    experiences: [
      {
        company_name: "Amazon",
        position: "SDE Intern",
        location: "Banglore, India",
        from: "20-05-2023",
        to: "20-07-2023",
        job_description: "",
      },
    ],
    projects: [
      {
        title: "",
        from: "",
        to: "",
        // techstack: ["React", "Flask"],
        description: "",
      },
    ],
    extracurriculars: ["National level football."],
  });

  const [isEdit, setIsEdit] = useState(false);
  const docs = useState([
    {
      uri: null,
    },
  ]);

  useEffect(() => {
    const fetchResume = async () => {
      // const response = axios.post() // resume wizard backend api post request
    };
    fetchResume();
  }, []);

  const handleAddEdu = () => {
    const temp = { ...editedDetails };
    const obj = {
      university: "VJTI",
      degree: "B.Tech",
      from: "",
      to: "",
    };
    temp.education.push(obj);
    setEditedDetails(temp);
  };

  const handleDelEdu = (index) => {
    const temp = { ...editedDetails };
    temp.education.splice(index, 1);
    setEditedDetails(temp);
  };

  const getMarginTop = (index) => {
    if (index > 0) {
      return "0.5rem";
    }
  };

  const handleDelSkill = (index) => {
    const temp = { ...editedDetails };
    temp.skills.splice(index, 1);
    setEditedDetails(temp);
  };

  const handleAddExp = () => {
    const temp = { ...editedDetails };
    const obj = {
      company_name: "Amazon",
      position: "SDE Intern",
      location: "Banglore, India",
      from: "20-05-2023",
      to: "20-07-2023",
      job_description: "",
    };
    temp.experiences.push(obj);
    setEditedDetails(temp);
  };

  const handleDelExp = (index) => {
    const temp = { ...editedDetails };
    temp.experiences.splice(index, 1);
    setEditedDetails(temp);
  };

  const handleAddProj = () => {
    const temp = { ...editedDetails };
    const obj = {
      title: "",
      from: "",
      to: "",
      // techstack: ["React", "Flask"],
      description: "",
    };
    temp.projects.push(obj);
    setEditedDetails(temp);
  };

  const handleDelProj = (index) => {
    const temp = { ...editedDetails };
    temp.projects.splice(index, 1);
    setEditedDetails(temp);
  };

  const handleDelExtra = (index) => {
    const temp = {...editedDetails};
    temp.extracurriculars.splice(index, 1);
    setEditedDetails(temp);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {resumeDetails !== null ? (
        <>
          {/* <SoftBox py={3} style={{ display: "flex", justifyContent: "center" }}>
                <DocViewer documents={docs} style={{ height: 500, width: "75%" }} />
            </SoftBox> */}
          <SoftBox style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
            {!isEdit ? (
              <SoftButton onClick={() => setIsEdit(true)} size="medium" color="info">
                Edit
              </SoftButton>
            ) : (
              <SoftButton onClick={() => setIsEdit(false)} size="medium" color="error">
                Cancel
              </SoftButton>
            )}
            <SoftButton size="medium" color="secondary">
              Download
            </SoftButton>
          </SoftBox>

          {isEdit && (
            <SoftBox py={3}>
              <SoftTypography style={{ textAlign: "center" }} variant="h4" fontWeight="regular">
                Edit Resume
              </SoftTypography>
              <SoftBox py={3}>
                <SoftTypography variant="h6" fontWeight="regular">
                  Github URL
                </SoftTypography>
                <input
                  name="github"
                  type="url"
                  style={{ marginTop: "-2px", maxWidth: "50%" }}
                  value={editedDetails.github}
                />

                <SoftTypography variant="h6" fontWeight="regular" style={{ marginTop: "1.25rem" }}>
                  LinkedIn URL
                </SoftTypography>
                <input
                  name="github"
                  type="url"
                  style={{ marginTop: "-2px", maxWidth: "50%" }}
                  value={editedDetails.linkedIn}
                />

                <SoftTypography variant="h6" fontWeight="regular" style={{ marginTop: "1.25rem" }}>
                  Email
                </SoftTypography>
                <input
                  name="github"
                  type="email"
                  style={{ marginTop: "-2px", maxWidth: "50%" }}
                  value={editedDetails.email}
                />

                <SoftTypography variant="h6" fontWeight="regular" style={{ marginTop: "1.25rem" }}>
                  Education
                </SoftTypography>
                <Card
                  style={{
                    paddingTop: "0.75rem",
                    paddingBottom: "1.5rem",
                    paddingLeft: "2.25rem",
                    paddingRight: "2.25rem",
                  }}
                >
                  <Grid container spacing={2}>
                    {editedDetails.education.map((e, index) => (
                      <>
                        <Grid
                          item
                          xs={8}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            marginTop: "0.75rem",
                          }}
                        >
                          <SoftTypography variant="h6" fontWeight="regular">
                            Education {index + 1}
                          </SoftTypography>
                          {/* {index > 0 && <SoftButton color="error" size="medium" onClick={() => handleDelEdu(index)}>Delete</SoftButton>} */}
                          {index > 0 && (
                            <DeleteIcon
                              color="error"
                              fontSize="medium"
                              sx={{ cursor: "pointer" }}
                              onClick={() => handleDelEdu(index)}
                            />
                          )}
                        </Grid>

                        <Grid item xs={6}>
                          <SoftTypography
                            variant="h6"
                            fontWeight="regular"
                            style={{ marginTop: "1px" }}
                          >
                            University/College
                          </SoftTypography>
                          <input type="text" value={e.university} />
                        </Grid>
                        <Grid item xs={6}>
                          <SoftTypography variant="h6" fontWeight="regular">
                            Degree
                          </SoftTypography>
                          <input type="text" value={e.degree} />
                        </Grid>
                        <Grid item xs={6}>
                          <SoftTypography
                            variant="h6"
                            fontWeight="regular"
                            style={{ marginTop: "1px" }}
                          >
                            From
                          </SoftTypography>
                          <input type="date" value={e.from} />
                        </Grid>
                        <Grid item xs={6}>
                          <SoftTypography
                            variant="h6"
                            fontWeight="regular"
                            style={{ marginTop: "1px" }}
                          >
                            To
                          </SoftTypography>
                          <input type="date" value={e.to} />
                        </Grid>
                      </>
                    ))}
                  </Grid>

                  <SoftButton
                    color="info"
                    size="medium"
                    style={{ width: "fit-content", marginTop: "1.75rem" }}
                    onClick={() => handleAddEdu()}
                  >
                    Add Education
                  </SoftButton>
                </Card>

                <SoftTypography variant="h6" fontWeight="regular" style={{ marginTop: "1.25rem" }}>
                  Skills
                </SoftTypography>
                <Card
                  style={{
                    paddingTop: "1.5rem",
                    paddingBottom: "2.5rem",
                    paddingLeft: "2.25rem",
                    paddingRight: "2.25rem",
                    width: "60%",
                  }}
                >
                  {editedDetails.skills.map((skill, index) => (
                    <div
                      key={index}
                      style={{
                        width: "100%",
                        borderBottom: "1px solid black",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0.75rem",
                        marginTop: getMarginTop(index),
                      }}
                    >
                      <SoftTypography variant="h6" fontWeight="regular">
                        {skill}
                      </SoftTypography>
                      <DeleteIcon
                        color="error"
                        fontSize="medium"
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleDelSkill(index)}
                      />
                    </div>
                  ))}

                  <SoftButton
                    color="info"
                    size="medium"
                    style={{ width: "fit-content", marginTop: "1.75rem" }}
                    onClick={() => setIsSkill(true)}
                  >
                    Add Skill
                  </SoftButton>
                </Card>

                <SoftTypography variant="h6" fontWeight="regular" style={{ marginTop: "1.25rem" }}>
                  Experiences
                </SoftTypography>
                <Card
                  style={{
                    paddingTop: "0.75rem",
                    paddingBottom: "1.5rem",
                    paddingLeft: "2.25rem",
                    paddingRight: "2.25rem",
                  }}
                >
                  <Grid container spacing={2}>
                    {editedDetails.experiences.map((e, index) => (
                      <>
                        <Grid
                          item
                          xs={8}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            marginTop: "0.75rem",
                          }}
                        >
                          <SoftTypography variant="h6" fontWeight="regular">
                            Experience {index + 1}
                          </SoftTypography>
                          {/* {index > 0 && <SoftButton color="error" size="medium" onClick={() => handleDelEdu(index)}>Delete</SoftButton>} */}
                          {index > 0 && (
                            <DeleteIcon
                              color="error"
                              fontSize="medium"
                              sx={{ cursor: "pointer" }}
                              onClick={() => handleDelExp(index)}
                            />
                          )}
                        </Grid>

                        <Grid item xs={6}>
                          <SoftTypography
                            variant="h6"
                            fontWeight="regular"
                            style={{ marginTop: "1px" }}
                          >
                            Company
                          </SoftTypography>
                          <input type="text" value={e.company_name} />
                        </Grid>
                        <Grid item xs={6}>
                          <SoftTypography variant="h6" fontWeight="regular">
                            Position
                          </SoftTypography>
                          <input type="text" value={e.position} />
                        </Grid>
                        <Grid item xs={6}>
                          <SoftTypography variant="h6" fontWeight="regular">
                            Location
                          </SoftTypography>
                          <input type="text" value={e.position} />
                        </Grid>
                        <Grid item xs={6}>
                          <SoftTypography
                            variant="h6"
                            fontWeight="regular"
                            style={{ marginTop: "1px" }}
                          >
                            From
                          </SoftTypography>
                          <input type="date" value={e.from} />
                        </Grid>
                        <Grid item xs={6}>
                          <SoftTypography
                            variant="h6"
                            fontWeight="regular"
                            style={{ marginTop: "1px" }}
                          >
                            To
                          </SoftTypography>
                          <input type="date" value={e.to} />
                        </Grid>
                        <Grid item xs={9}>
                          <SoftTypography
                            variant="h6"
                            fontWeight="regular"
                            style={{ marginTop: "1px" }}
                          >
                            Job Description
                          </SoftTypography>
                          <textarea value={e.job_description} />
                        </Grid>
                      </>
                    ))}
                  </Grid>

                  <SoftButton
                    color="info"
                    size="medium"
                    style={{ width: "fit-content", marginTop: "1.75rem" }}
                    onClick={() => handleAddExp()}
                  >
                    Add Experience
                  </SoftButton>
                </Card>

                <SoftTypography variant="h6" fontWeight="regular" style={{ marginTop: "1.25rem" }}>
                  Projects and Awards
                </SoftTypography>
                <Card
                  style={{
                    paddingTop: "0.75rem",
                    paddingBottom: "1.5rem",
                    paddingLeft: "2.25rem",
                    paddingRight: "2.25rem",
                  }}
                >
                  <Grid container spacing={2}>
                    {editedDetails.projects.map((proj, index) => (
                      <>
                        <Grid
                          item
                          xs={8}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            marginTop: "0.75rem",
                          }}
                        >
                          <SoftTypography variant="h6" fontWeight="regular">
                            Project {index + 1}
                          </SoftTypography>
                          {/* {index > 0 && <SoftButton color="error" size="medium" onClick={() => handleDelEdu(index)}>Delete</SoftButton>} */}
                          {index > 0 && (
                            <DeleteIcon
                              color="error"
                              fontSize="medium"
                              sx={{ cursor: "pointer" }}
                              onClick={() => handleDelProj(index)}
                            />
                          )}
                        </Grid>

                        <Grid item xs={6}>
                          <SoftTypography
                            variant="h6"
                            fontWeight="regular"
                            style={{ marginTop: "1px" }}
                          >
                            Project Title
                          </SoftTypography>
                          <input type="text" value={proj.title} />
                        </Grid>
                        <Grid item xs={6}>
                          <SoftTypography
                            variant="h6"
                            fontWeight="regular"
                            style={{ marginTop: "1px" }}
                          >
                            From
                          </SoftTypography>
                          <input type="date" value={proj.from} />
                        </Grid>
                        <Grid item xs={6}>
                          <SoftTypography
                            variant="h6"
                            fontWeight="regular"
                            style={{ marginTop: "1px" }}
                          >
                            To
                          </SoftTypography>
                          <input type="date" value={proj.to} />
                        </Grid>
                        <Grid item xs={9}>
                          <SoftTypography
                            variant="h6"
                            fontWeight="regular"
                            style={{ marginTop: "1px" }}
                          >
                            Project Description
                          </SoftTypography>
                          <textarea value={proj.description} />
                        </Grid>
                      </>
                    ))}
                  </Grid>

                  <SoftButton
                    color="info"
                    size="medium"
                    style={{ width: "fit-content", marginTop: "1.75rem" }}
                    onClick={() => handleAddProj()}
                  >
                    Add Project
                  </SoftButton>
                </Card>

                <SoftTypography variant="h6" fontWeight="regular" style={{ marginTop: "1.25rem" }}>
                  Extracurriculars
                </SoftTypography>
                <Card
                  style={{
                    paddingTop: "0.75rem",
                    paddingBottom: "1.5rem",
                    paddingLeft: "2.25rem",
                    paddingRight: "2.25rem",
                    width: "60%",
                  }}
                >
                  {editedDetails.extracurriculars.map((e, index) => (
                    <>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          marginTop: "0.75rem",
                        }}
                      >
                        <SoftTypography variant="h6" fontWeight="regular">
                          Extracurricular {index + 1}
                        </SoftTypography>
                        <EditIcon
                          color="secondary"
                          fontSize="medium"
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            setIsExtraEdit(true);
                            setOpenExtra(true);
                            setEditIndex(index);
                          }}
                        />
                        {/* {index > 0 && <SoftButton color="error" size="medium" onClick={() => handleDelEdu(index)}>Delete</SoftButton>} */}
                        {index > 0 && (
                          <DeleteIcon
                            color="error"
                            fontSize="medium"
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleDelExtra(index)}
                          />
                        )}
                      </div>
                      <SoftTypography variant="h6" fontWeight="light">
                        {e}
                      </SoftTypography>
                    </>
                  ))}

                  <SoftButton
                    color="info"
                    size="medium"
                    style={{ width: "fit-content", marginTop: "1.75rem" }}
                    onClick={() => {
                      setIsExtra(true);
                      setOpenExtra(true);
                    }}
                  >
                    Add Extracurricular
                  </SoftButton>
                </Card>
              </SoftBox>
            </SoftBox>
          )}
        </>
      ) : (
        <SoftTypography variant="h4" fontWeight="regular" mt={3}>
          Generating your resume, please wait...
        </SoftTypography>
      )}

      {isSkill && (
        <AddSkillModal
          isSkill={isSkill}
          setIsSkill={setIsSkill}
          setEditedDetails={setEditedDetails}
          editedDetails={editedDetails}
        />
      )}

      {openExtra && (
        <ExtraCurrModal
          isExtraEdit={isExtraEdit}
          setIsExtraEdit={setIsExtraEdit}
          editIndex={editIndex}
          openExtra={openExtra}
          setOpenExtra={setOpenExtra}
          editedDetails={editedDetails}
          setEditedDetails={setEditedDetails}
        />
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default Resume;
