import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Button from "@mui/material/Button";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

function SkillsCard({ title, description, skills, verifiedSkills, action }) {
  const { socialMediaColors } = colors;
  const { size } = typography;
  const navigate = useNavigate();

  // Function to handle skill verification redirection
  const handleVerifySkill = (skill) => {
    navigate(`/verify-skill/${skill}`);
  };

  // Render skill items with verify button
  const renderSkills = () => {
    return skills.map((skill, index) => (
      <SoftBox key={index} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <SoftTypography variant="button" fontWeight="regular" color="text">
          - {skill}
        </SoftTypography>
        {verifiedSkills.includes(skill) ? (
          <SoftBox
            sx={{
              backgroundColor: "success.main", // Use MUI theme color for green
              color: "white", // Text color
              padding: "4px 42px", // Padding for the box
              borderRadius: "6px", // Optional: rounded corners
            }}
          >
            <SoftTypography variant="body2">Verified</SoftTypography>
          </SoftBox>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleVerifySkill(skill)}
          >
            Verify Skill
          </Button>
        )}
      </SoftBox>
    ));
  };

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
        <SoftTypography component={Link} to={action.route} variant="body2" color="secondary">
          <Tooltip title={action.tooltip} placement="top">
            <Icon>edit</Icon>
          </Tooltip>
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox mb={2} lineHeight={1}>
          <SoftTypography variant="button" color="text" fontWeight="regular">
            {description}
          </SoftTypography>
        </SoftBox>
        <SoftBox opacity={0.3}>
          <Divider />
        </SoftBox>
        {/* Skills List with Verify Button */}
        <SoftBox mb={2}>{renderSkills()}</SoftBox>
      </SoftBox>
    </Card>
  );
}

// Typechecking props for the SkillsCard
SkillsCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  verifiedSkills: PropTypes.arrayOf(PropTypes.string).isRequired, // Add verified skills prop
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
};

export default SkillsCard;
