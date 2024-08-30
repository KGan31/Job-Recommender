// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

function SkillsCard({ title, description, skills, action }) {
  const { socialMediaColors } = colors;
  const { size } = typography;

  // Function to render skill items based on category
  const renderSkills = (category) => {
    return skills[category].map((skill, index) => (
      <SoftTypography key={index} variant="button" fontWeight="regular" color="text">
        - {skill}
      </SoftTypography>
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
        {/* Languages Section */}
        <SoftBox mb={2}>
          <SoftTypography variant="h6" fontWeight="bold" mb={1}>
            Languages
          </SoftTypography>
          {renderSkills("languages")}
        </SoftBox>
        <Divider />
        {/* Libraries Section */}
        <SoftBox mb={2}>
          <SoftTypography variant="h6" fontWeight="bold" mb={1}>
            Libraries
          </SoftTypography>
          {renderSkills("libraries")}
        </SoftBox>
        <Divider />
        {/* Frameworks Section */}
        <SoftBox mb={2}>
          <SoftTypography variant="h6" fontWeight="bold" mb={1}>
            Frameworks
          </SoftTypography>
          {renderSkills("frameworks")}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Typechecking props for the SkillsCard
SkillsCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  skills: PropTypes.shape({
    languages: PropTypes.arrayOf(PropTypes.string),
    libraries: PropTypes.arrayOf(PropTypes.string),
    frameworks: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
};

export default SkillsCard;
