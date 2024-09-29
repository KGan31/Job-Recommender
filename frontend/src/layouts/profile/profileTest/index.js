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
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Card from "@mui/material/Card";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftButton from "components/SoftButton";

function ProfileTest() {
  const [profQues, setProfQues] = useState([]);
  const [userAns, setUserAns] = useState(Array(10).fill(null));
  const [isUpdating, setIsUpdating] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { profileData } = location.state || { profileData: {} };

  useEffect(() => {
    const data = {
      skills: profileData?.skills,
    };
    const queryString = encodeURIComponent(JSON.stringify(data));
    const fetchProfQues = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/get-profile-questions?data=${queryString}`
        );
        setProfQues(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfQues();
  }, []);

  const handleChange = (index, option) => {
    const temp = [...userAns];
    temp[index] = option;
    setUserAns(temp);
  };

  const handleSubmit = async () => {
    setIsUpdating(true);
    let score = 0;
    for (let i = 0; i < userAns.length; i++) {
      if (userAns[i] !== null && userAns[i] === profQues[i].correct[0]) {
        score++;
      }
    }
    score = score * 10;
    profileData.profile_score = score;
    console.log(profileData.profile_score);
    try {
      await axios.post("http://localhost:5000/api/update-profile-score", profileData);
      setIsUpdating(false);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {!isUpdating ? (
        <SoftBox py={3}>
          {profQues.length > 0 ? (
            <>
              {profQues.map((q, index) => (
                <Card
                  key={index}
                  style={{
                    marginTop: "1.25rem",
                    marginBottom: "1.25rem",
                    paddingLeft: "2.25rem",
                    paddingRight: "2.25rem",
                    paddingTop: "1.25rem",
                    paddingBottom: "1.25rem",
                  }}
                >
                  <SoftTypography variant="h6" fontWeight="regular">
                    <strong>Q{index + 1}.</strong> {q.question}
                  </SoftTypography>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "1rem",
                    }}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={"A"}
                      onChange={(e) => handleChange(index, e.target.value)}
                    />
                    <SoftTypography variant="button" fontWeight="regular">
                      {q.options.A}
                    </SoftTypography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "1rem",
                    }}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={"B"}
                      onChange={(e) => handleChange(index, e.target.value)}
                    />
                    <SoftTypography variant="button" fontWeight="regular">
                      {q.options.B}
                    </SoftTypography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "1rem",
                    }}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={"C"}
                      onChange={(e) => handleChange(index, e.target.value)}
                    />
                    <SoftTypography variant="button" fontWeight="regular">
                      {q.options.C}
                    </SoftTypography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "1rem",
                    }}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={"D"}
                      onChange={(e) => handleChange(index, e.target.value)}
                    />
                    <SoftTypography variant="button" fontWeight="regular">
                      {q.options.D}
                    </SoftTypography>
                  </div>
                </Card>
              ))}
              <SoftButton
                color="primary"
                size="medium"
                style={{ width: "fit-content", marginTop: "0.75rem" }}
                onClick={() => handleSubmit()}
              >
                Submit
              </SoftButton>
            </>
          ) : (
            <SoftTypography variant="h5" fontWeight="regular">
              Generating profile questions, please wait...
            </SoftTypography>
          )}
        </SoftBox>
      ) : (
        <SoftBox py={3}>
          <SoftTypography variant="h5" fontWeight="regular">
            Updating your profile score, please wait
          </SoftTypography>
        </SoftBox>
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default ProfileTest;
