import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, Radio, FormControlLabel, Typography } from "@mui/material";
import SoftButton from "components/SoftButton";
import axios from "axios"; // For making API requests

const SkillVerification = () => {
  const { skill } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch skill-specific questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/get-skill-questions/${skill}`);
        setQuestions(response.data.questions); // Assuming `questions` is in the response data
        setLoading(false);
      } catch (err) {
        setError("Error fetching questions. Please try again.");
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [skill]);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    setAnswers({ ...answers, [questionIndex]: optionIndex });
  };

  const handleSubmit = () => {
    const correctAnswers = questions.filter((q, index) => answers[index] === q.correct).length;
    setScore(correctAnswers);

    if (correctAnswers >= 4) {
      alert("Skill verified!");

      // Update verified skills in local storage
      const updatedVerifiedSkills = JSON.parse(localStorage.getItem("verifiedSkills")) || [];
      if (!updatedVerifiedSkills.includes(skill)) {
        updatedVerifiedSkills.push(skill); // Add the newly verified skill
        localStorage.setItem("verifiedSkills", JSON.stringify(updatedVerifiedSkills)); // Update local storage
      }

      // Redirect to the profile page after 2 seconds
      setTimeout(() => {
        navigate("/profile", { state: { skill, verified: true } });
      }, 2000);
    } else {
      alert("You need at least 4 correct answers to verify.");
    }
  };

  if (loading) {
    return <p>Loading questions...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ marginLeft: "290px" }}>
      <h2>Verify Your Skill: {skill}</h2>
      {questions.map((q, index) => (
        <Card key={index} style={{ marginBottom: "20px" }}>
          <CardHeader title={`${index + 1}. ${q.question}`} />
          <CardContent>
            {q.options.map((option, i) => (
              <FormControlLabel
                key={i}
                control={
                  <Radio
                    checked={answers[index] === i}
                    onChange={() => handleAnswerChange(index, i)}
                    value={i}
                  />
                }
                label={option}
              />
            ))}
          </CardContent>
        </Card>
      ))}
      <SoftButton onClick={handleSubmit}>Submit</SoftButton>
      {score !== null && <p>Your Score: {score}/5</p>}
    </div>
  );
};

export default SkillVerification;
