import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import "./aspirations.css";

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Aspirations() {
  const [aspiration, setAspiration] = useState(""); // Store user input
  const [courses, setCourses] = useState([]); // Store fetched courses
  const [loading, setLoading] = useState(false); // Loading state

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh
    setLoading(true);

    // Make a POST request to the API
    try {
      const response = await fetch("http://127.0.0.1:5000/api/aspirations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ aspiration }), // Send user input
      });

      const data = await response.json();
      setCourses(data.courses || []); // Set courses or empty array if undefined
    } catch (error) {
      console.error("Error fetching course recommendations:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox p={3}>
              <SoftTypography variant="h6">Enter Your Aspiration</SoftTypography>
              <form onSubmit={handleFormSubmit} style={{ width: 850 }}>
                <SoftBox mb={2}>
                  <SoftInput
                    type="text"
                    placeholder="e.g., machine learning engineer"
                    value={aspiration}
                    onChange={(e) => setAspiration(e.target.value)} // Update input value
                  />
                </SoftBox>
                <SoftButton
                  type="submit"
                  sx={{ backgroundColor: "#17C1E8", color: "black" }}
                  fullWidth
                >
                  Get Recommendations
                </SoftButton>
              </form>
            </SoftBox>
          </Card>
        </SoftBox>

        {/* Display loading state */}
        {loading && <SoftTypography>Loading...</SoftTypography>}

        {/* Display course recommendations in a table */}
        {!loading && courses.length > 0 && (
          <SoftBox mt={3}>
            <SoftTypography variant="h6" mb={3}>
              Recommended Courses
            </SoftTypography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableRow className="heading1">
                  <StyledTableCell>Course Name</StyledTableCell>
                  <StyledTableCell align="left">University</StyledTableCell>
                  <StyledTableCell align="left">URL</StyledTableCell>
                </TableRow>

                <TableBody>
                  {courses.map((course, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {course["Course Name"] || "N/A"}
                      </StyledTableCell>
                      <StyledTableCell align="left">{course.University || "N/A"}</StyledTableCell>
                      <StyledTableCell align="left">
                        {course.URL ? (
                          <a href={course.URL} target="_blank" rel="noopener noreferrer">
                            {course.URL}
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </SoftBox>
        )}
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Aspirations;
