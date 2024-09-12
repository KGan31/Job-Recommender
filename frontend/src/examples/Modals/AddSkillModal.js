import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";

// Add styling for the modal box
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: "none",
  boxShadow: 24,
  p: 4,
};

export default function AddSkillModal({ isSkill, setIsSkill, setEditedDetails, editedDetails }) {
  const [skill, setSkill] = useState("");

  const handleClose = () => setIsSkill(false);

  const handleClick = () => {
    if (skill.trim()) {
      const temp = { ...editedDetails };
      temp.skills.push(skill);
      setEditedDetails(temp);
      setSkill(""); // Clear input after adding
      setIsSkill(false);
    }
  };

  return (
    <Modal
      open={isSkill}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* Box wraps the modal content */}
      <Box sx={style}>
        <SoftTypography variant="h6" fontWeight="regular">
          Add Skill
        </SoftTypography>
        {/* <input
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          style={{ marginTop: '0.5rem', marginBottom: '1rem', width: '100%' }}
        /> */}
        <SoftInput value={skill} onChange={(e) => setSkill(e.target.value)} style={{ marginTop: '0.5rem', marginBottom: '1rem', width: '100%' }}></SoftInput>

        <div style={{ display: "flex", gap: '1rem' }}>
          <SoftButton color="info" size="small" onClick={handleClick}>
            Add
          </SoftButton>
          <SoftButton color="error" size="small" onClick={handleClose}>
            Cancel
          </SoftButton>
        </div>
      </Box>
    </Modal>
  );
}

AddSkillModal.propTypes = {
  isSkill: PropTypes.bool.isRequired,
  setIsSkill: PropTypes.func.isRequired,
  setEditedDetails: PropTypes.func.isRequired,
  editedDetails: PropTypes.object.isRequired,
};
