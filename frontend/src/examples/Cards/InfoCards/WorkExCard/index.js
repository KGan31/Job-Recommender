import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import typography from "assets/theme/base/typography";

function WorkExperienceCard({ title, description, experiences, action }) {
  const { size } = typography;

  // Function to render work experience items
  const renderExperiences = () => {
    if (experiences.length === 0) {
      return <SoftTypography variant="body2" color="text">No work experiences available.</SoftTypography>;
    }
    return experiences.map((experience, index) => (
      <SoftBox key={index} mb={2}>
        <SoftTypography variant="h6" fontWeight="bold">
          {experience.jobTitle}
        </SoftTypography>
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          {experience.duration}
        </SoftTypography>
        <SoftTypography variant="body2" color="text" fontWeight="regular" mt={1}>
          {experience.description}
        </SoftTypography>
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
        {/* Work Experience Section */}
        {renderExperiences()}
      </SoftBox>
    </Card>
  );
}

// Typechecking props for the WorkExperienceCard
WorkExperienceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  experiences: PropTypes.arrayOf(
    PropTypes.shape({
      jobTitle: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
};

export default WorkExperienceCard;
