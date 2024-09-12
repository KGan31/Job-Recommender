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
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
import AddSkillModal from "../../../examples/Modals/AddSkillModal";
import ExtraCurrModal from "../../../examples/Modals/ExtraCurrModal";
import SoftInput from "components/SoftInput";

//https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg

const headers = {
  "Access-Control-Allow-Origin": true,
  "Content-Type": "application/json",
  Accept: "application/json",
};

function Resume() {
  const navigate = useNavigate();
  const [resumeDetails, setResumeDetails] = useState([]); // check the format of the resume details returned from backend
  const [isSkill, setIsSkill] = useState(false);
  const email = localStorage.getItem("userEmail");
  const [isExtra, setIsExtra] = useState(false);
  const [isExtraEdit, setIsExtraEdit] = useState(false);
  const [openExtra, setOpenExtra] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [editedDetails, setEditedDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get(`http://localhost:5000/api/profile/${email}`, headers);
      console.log(response);
      setEditedDetails(response.data);
      localStorage.setItem('profileDetails', JSON.stringify(response.data));
    };
    fetchProfile();
  }, []);

  const handleInputChange = (field, value) => {
    setEditedDetails({ ...editedDetails, [field]: value });
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...editedDetails.education];
    updatedEducation[index][field] = value;
    setEditedDetails({ ...editedDetails, education: updatedEducation });
  };

  const handleExpChange = (index, field, value) => {
    const updatedExp = [...editedDetails.experiences];
    updatedExp[index][field] = value;
    setEditedDetails({ ...editedDetails, experiences: updatedExp });
  };

  const handleProjChange = (index, field, value) => {
    const updateProj = [...editedDetails.projects];
    updateProj[index][field] = value;
    setEditedDetails({ ...editedDetails, experiences: updateProj });
  };

  const handleAddEdu = () => {
    const temp = { ...editedDetails };
    const obj = {
      university: "",
      degree: "",
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
      company_name: "",
      position: "",
      location: "",
      from: "",
      to: "",
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
    const temp = { ...editedDetails };
    temp.extracurriculars.splice(index, 1);
    setEditedDetails(temp);
  };

  const handleEditRes = async () => {
    // const response = axios.post() post request to backend api
    const profileDetails = JSON.parse(localStorage.getItem('profileDetails'));
    const flag = JSON.stringify(profileDetails) === JSON.stringify(editedDetails);
    console.log(flag);
    const data = {
      log: editedDetails,
      flag: flag
    }
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/resume", data, {
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
          Accept: "application/pdf",
        },
        responseType: "blob",
      });
      // console.log(response.data)

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      let pdfUrl = URL.createObjectURL(pdfBlob);

      console.log(pdfUrl);
      setLoading(false);
      // pdfUrl = pdfUrl.substring(5);
      navigate("/profile/resume-wizard/preview", { state: { pdfUrl } });
    } catch (err) {
      console.error("Error in resume upload: ", err);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      {loading ? (
        <SoftTypography variant="h5" fontWeight="regular" style={{marginTop: "12px"}}>
          Generating your resume, please wait....
        </SoftTypography>
      ) : (
        <SoftBox py={3}>
          <SoftTypography style={{ textAlign: "center" }} variant="h4" fontWeight="regular">
            Resume Details
          </SoftTypography>
          {editedDetails !== null ? (
            <>
              <SoftBox py={3}>
                <SoftTypography variant="h6" fontWeight="regular">
                  Github URL
                </SoftTypography>

                <SoftInput
                  size="medium"
                  value={editedDetails.github}
                  style={{ maxWidth: "45%" }}
                  onChange={(e) => handleInputChange("github", e.target.value)}
                ></SoftInput>

                <SoftTypography variant="h6" fontWeight="regular" style={{ marginTop: "1.25rem" }}>
                  LinkedIn URL
                </SoftTypography>
                <SoftInput
                  size="medium"
                  value={editedDetails.linkedIn}
                  style={{ maxWidth: "45%" }}
                  onChange={(e) => handleInputChange("linkedIn", e.target.value)}
                ></SoftInput>

                <SoftTypography variant="h6" fontWeight="regular" style={{ marginTop: "1.25rem" }}>
                  Email
                </SoftTypography>
                <SoftInput
                  size="medium"
                  type="email"
                  value={editedDetails.email}
                  style={{ maxWidth: "45%" }}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                ></SoftInput>

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
                          <SoftInput
                            size="medium"
                            value={e.university}
                            onChange={(ev) =>
                              handleEducationChange(index, "university", ev.target.value)
                            }
                          ></SoftInput>
                        </Grid>
                        <Grid item xs={6}>
                          <SoftTypography variant="h6" fontWeight="regular">
                            Degree
                          </SoftTypography>
                          <SoftInput
                            size="medium"
                            value={e.degree}
                            onChange={(ev) =>
                              handleEducationChange(index, "degree", ev.target.value)
                            }
                          ></SoftInput>
                        </Grid>
                        <Grid item xs={6}>
                          <SoftTypography variant="h6" fontWeight="regular">
                            Location
                          </SoftTypography>
                          <SoftInput
                            size="medium"
                            value={e.location}
                            onChange={(ev) =>
                              handleEducationChange(index, "location", ev.target.value)
                            }
                          ></SoftInput>
                        </Grid>
                        <Grid item xs={6}>
                          <SoftTypography variant="h6" fontWeight="regular">
                            CGPA
                          </SoftTypography>
                          <SoftInput
                            size="medium"
                            type="number"
                            step=".01"
                            min="0"
                            value={e.cgpa}
                            onChange={(ev) => handleEducationChange(index, "cgpa", ev.target.value)}
                          ></SoftInput>
                        </Grid>
                        <Grid item xs={6}>
                          <SoftTypography
                            variant="h6"
                            fontWeight="regular"
                            style={{ marginTop: "1px" }}
                          >
                            From
                          </SoftTypography>
                          <SoftInput
                            size="medium"
                            type="date"
                            value={e.from}
                            onChange={(ev) => handleEducationChange(index, "from", ev.target.value)}
                          ></SoftInput>
                        </Grid>
                        <Grid item xs={6}>
                          <SoftTypography
                            variant="h6"
                            fontWeight="regular"
                            style={{ marginTop: "1px" }}
                          >
                            To
                          </SoftTypography>
                          <SoftInput
                            size="medium"
                            type="date"
                            value={e.to}
                            onChange={(ev) => handleEducationChange(index, "to", ev.target.value)}
                          ></SoftInput>
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
                  {editedDetails.skills.length > 0 ? (
                    editedDetails.skills.map((skill, index) => (
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
                    ))
                  ) : (
                    <SoftTypography variant="h6" fontWeight="regular">
                      Add your skills here....
                    </SoftTypography>
                  )}

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
                          <SoftInput
                            size="medium"
                            value={e.company_name}
                            onChange={(ev) =>
                              handleExpChange(index, "company_name", ev.target.value)
                            }
                          ></SoftInput>
                        </Grid>
                        <Grid item xs={6}>
                          <SoftTypography variant="h6" fontWeight="regular">
                            Position
                          </SoftTypography>
                          <SoftInput
                            size="medium"
                            value={e.position}
                            onChange={(ev) => handleExpChange(index, "position", ev.target.value)}
                          ></SoftInput>
                        </Grid>
                        <Grid item xs={6}>
                          <SoftTypography variant="h6" fontWeight="regular">
                            Location
                          </SoftTypography>
                          <SoftInput
                            size="medium"
                            value={e.location}
                            onChange={(ev) => handleExpChange(index, "location", ev.target.value)}
                          ></SoftInput>
                        </Grid>
                        <Grid item xs={6}>
                          <SoftTypography
                            variant="h6"
                            fontWeight="regular"
                            style={{ marginTop: "1px" }}
                          >
                            From
                          </SoftTypography>
                          <SoftInput
                            size="medium"
                            type="date"
                            value={e.from}
                            onChange={(ev) => handleExpChange(index, "from", ev.target.value)}
                          ></SoftInput>
                        </Grid>
                        <Grid item xs={6}>
                          <SoftTypography
                            variant="h6"
                            fontWeight="regular"
                            style={{ marginTop: "1px" }}
                          >
                            To
                          </SoftTypography>
                          <SoftInput
                            size="medium"
                            type="date"
                            value={e.to}
                            onChange={(ev) => handleExpChange(index, "to", ev.target.value)}
                          ></SoftInput>
                        </Grid>
                        <Grid item xs={9}>
                          <SoftTypography
                            variant="h6"
                            fontWeight="regular"
                            style={{ marginTop: "1px" }}
                          >
                            Job Description
                          </SoftTypography>
                          {/* <SoftInput
                   size="large"
                   value={e.job_description}
                   onChange={(ev) => handleExpChange(index, "job_description", ev.target.value)}
                 ></SoftInput> */}
                          <textarea
                            rows={6}
                            style={{
                              width: "100%",
                              fontSize: "14px",
                              paddingTop: "8px",
                              paddingBottom: "8px",
                              paddingLeft: "12px",
                              paddingRight: "12px",
                              fontWeight: "normal",
                            }}
                            value={e.job_description}
                            onChange={(ev) =>
                              handleExpChange(index, "job_description", ev.target.value)
                            }
                          ></textarea>
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
                          <SoftInput
                            size="medium"
                            value={proj.title}
                            onChange={(ev) => handleProjChange(index, "title", ev.target.value)}
                          ></SoftInput>
                        </Grid>
                        <Grid item xs={6}>
                          <SoftTypography
                            variant="h6"
                            fontWeight="regular"
                            style={{ marginTop: "1px" }}
                          >
                            From
                          </SoftTypography>
                          <SoftInput
                            size="medium"
                            type="date"
                            value={proj.from}
                            onChange={(ev) => handleProjChange(index, "from", ev.target.value)}
                          ></SoftInput>
                        </Grid>
                        <Grid item xs={6}>
                          <SoftTypography
                            variant="h6"
                            fontWeight="regular"
                            style={{ marginTop: "1px" }}
                          >
                            To
                          </SoftTypography>
                          <SoftInput
                            size="medium"
                            type="date"
                            value={proj.to}
                            onChange={(ev) => handleProjChange(index, "to", ev.target.value)}
                          ></SoftInput>
                        </Grid>
                        <Grid item xs={9}>
                          <SoftTypography
                            variant="h6"
                            fontWeight="regular"
                            style={{ marginTop: "1px" }}
                          >
                            Project Description
                          </SoftTypography>
                          <textarea
                            rows={6}
                            style={{
                              width: "100%",
                              fontSize: "14px",
                              paddingTop: "8px",
                              paddingBottom: "8px",
                              paddingLeft: "12px",
                              paddingRight: "12px",
                              fontWeight: "normal",
                            }}
                            value={proj.description}
                            onChange={(ev) =>
                              handleProjChange(index, "description", ev.target.value)
                            }
                          ></textarea>
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
                  {editedDetails.extracurriculars.length > 0 ? (
                    editedDetails.extracurriculars.map((e, index) => (
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
                    ))
                  ) : (
                    <SoftTypography variant="h6" fontWeight="regular">
                      Add your hobbies, achivements, club activities here...
                    </SoftTypography>
                  )}

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

              <SoftButton
                color="primary"
                size="medium"
                style={{ width: "fit-content" }}
                onClick={() => handleEditRes()}
              >
                Generate Resume
              </SoftButton>
            </>
          ) : (
            <SoftTypography variant="h5" fontWeight="regular">
              Fetching details please wait...
            </SoftTypography>
          )}
        </SoftBox>
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
