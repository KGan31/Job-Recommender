// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { Recommend } from "@mui/icons-material";
import Button from "@mui/material/Button";
import "./recommend-courses.css";
import { useState, useEffect } from "react";
import { Grid, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";

function RecommendCourses() {
  const [skills, setSkills] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [search, setSearch] = useState("");
  const [currInd, setCurrInd] = useState(0);

  useEffect(() => {
    const temp = localStorage.getItem("skills");
    const missingSkills = JSON.parse(temp);
    console.log(missingSkills);

    if (missingSkills !== null) {
      const fetchCourses = async () => {
        const response = await axios.get("http://localhost:5000/api/recommend-course", {
          params: {
            skills: missingSkills, // Array of skills will be sent correctly as multiple 'skills' query params
          },
          paramsSerializer: (params) => {
            // Serialize the array correctly as 'skills=skill1&skills=skill2'
            return params.skills.map((skill) => `skills=${encodeURIComponent(skill)}`).join("&");
          },
        });
        console.log(response);
        setSkills(missingSkills); 
        setRecommendation(response.data.recommendation);
      };

      fetchCourses();
    }
  }, []);

  const handleClick = async () => {
    if (search.length == 0) {
      return;
    }

    const temp = [];
    temp.push(search);
    const response = await axios.get("http://localhost:5000/api/recommend-course", {
      params: {
        skills: temp, // Array of skills will be sent correctly as multiple 'skills' query params
      },
      paramsSerializer: (params) => {
        // Serialize the array correctly as 'skills=skill1&skills=skill2'
        return params.skills.map((skill) => `skills=${encodeURIComponent(skill)}`).join("&");
      },
    });
    console.log(response);
    setRecommendation(response.data.recommendation);
    setSkills(temp);
  };

  const getBgColor = (index) => {
    if (index == currInd) {
      return "green";
    }

    return "white";
  };

  const getFontColor = (index) => {
    if (index == currInd) {
      return "white";
    }

    return "black";
  };

  // useEffect(() => {
  //   console.log(recommendation);
  // }, [recommendation]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <h2 style={{ fontSize: "22px", fontWeight: "lighter" }}>
          Search skills here and get recommended courses...
        </h2>

        <div
          className=""
          style={{ display: "flex", gap: "12px", justifyContent: "start", alignItems: "center" }}
        >
          <input
            type="text"
            style={{ maxWidth: "500px" }}
            placeholder="Type your skill here...."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
            style={{ color: "#ffffff" }}
            onClick={handleClick}
          >
            Search
          </Button>
        </div>

        <SoftBox py={3}>
          <h3 style={{ fontSize: "28px", fontWeight: "normal" }}>Skills</h3>
          {skills.length > 0 ? (
            <>
              <div
                className=""
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                {skills.map((skill, index) => (
                  <button
                    onClick={() => setCurrInd(index)}
                    key={index}
                    style={{
                      backgroundColor: getBgColor(index),
                      display: "flex",
                      gap: "0.5rem",
                      alignItems: "center",
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      borderRadius: "9999px",
                      paddingTop: "8px",
                      paddingBottom: "8px",
                      fontSize: "22px",
                      fontWeight: "lighter",
                      color: getFontColor(index),
                    }}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p style={{ fontSize: "22px", fontWeight: "lighter" }}>No skills added</p>
          )}
        </SoftBox>

        <SoftBox>
          <h3 style={{ fontSize: "28px", fontWeight: "normal" }}>Recommended Courses</h3>
          {/* {recommendation.length > 0 && <p>{JSON.stringify(recommendation)}</p>} */}
          {skills.length > 0 ? (
            <>
              <SoftBox>
                <p style={{ fontSize: "22px", fontWeight: "lighter" }}>
                  Courses recommended for {skills[currInd]}
                </p>

                <p style={{ fontSize: "26px", fontWeight: "normal", marginTop: "10px" }}>
                  Video Material
                </p>
                <div
                  style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}
                >
                  {recommendation[currInd][0]?.video_links?.length > 0 ? (
                    recommendation[currInd][0].video_links.map((v, i) => (
                      <iframe
                        src={v}
                        key={i}
                        width={550}
                        height={300}
                        style={{ border: 0 }}
                      ></iframe>
                    ))
                  ) : (
                    <p style={{ fontSize: "22px", fontWeight: "lighter" }}>
                      No video links available
                    </p>
                  )}
                </div>

                <p style={{ fontSize: "26px", fontWeight: "normal", marginTop: "10px" }}>
                  Reading Material
                </p>

                {recommendation[currInd] && recommendation[currInd][0]?.course_links ? (
                  recommendation[currInd][0].course_links.map((c, i) => (
                    <a key={i} href={c} style={{ fontSize: "22px" }}>
                      {c} <br/>
                    </a>
                  ))
                ) : (
                  <p style={{ fontSize: "22px", fontWeight: "lighter" }}>
                    No reading material available
                  </p>
                )}

                {/* {recommendation[currInd][0]?.course_links?.length > 0 ? (
                  recommendation[currInd][0].course_links.map((v, i) => (
                    <iframe src={v} key={i} width={550} height={300} style={{ border: 0 }}></iframe>
                  ))
                ) : (
                  <p style={{ fontSize: "22px", fontWeight: "lighter" }}>
                    No video links available
                  </p>
                )} */}
              </SoftBox>
            </>
          ) : (
            <p style={{ fontSize: "22px", fontWeight: "lighter" }}>No courses recommended</p>
          )}
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default RecommendCourses;
