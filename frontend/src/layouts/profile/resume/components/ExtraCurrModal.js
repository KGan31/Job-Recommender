import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Add styling for the modal box
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

export default function ExtraCurrModal({
  isExtraEdit,
  setIsExtraEdit,
  editIndex,
  openExtra,
  setOpenExtra,
  setEditedDetails,
  editedDetails,
}) {
  const [extracurricular, setExtracurricular] = useState("");

  const handleClose = () => {
    setOpenExtra(false);
    setIsExtraEdit(false);
  };

  useEffect(() => {
    if (isExtraEdit) {
      setExtracurricular(editedDetails.extracurriculars[editIndex]);
    }
  }, []);

  const handleClick = () => {
    if (extracurricular.trim()) {
      const temp = { ...editedDetails };
      if (isExtraEdit) {
        temp.extracurriculars[editIndex] = extracurricular;
      } else {
        temp.extracurriculars.push(extracurricular);
      }
      setEditedDetails(temp);
      setIsExtraEdit(false);
      setOpenExtra(false);
    }
  };

  return (
    <Modal
      open={openExtra}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* Box wraps the modal content */}
      <Box sx={style}>
        <SoftTypography variant="h6" fontWeight="regular">
          Extracurricular
        </SoftTypography>
        <input
          type="text"
          value={extracurricular}
          onChange={(e) => setExtracurricular(e.target.value)}
          style={{ marginTop: "0.5rem", marginBottom: "1rem", width: "100%" }}
        />

        <div style={{ display: "flex", gap: "1rem" }}>
          {!isExtraEdit && (
            <SoftButton color="info" size="small" onClick={handleClick}>
              Add
            </SoftButton>
          )}
          {isExtraEdit && (
            <SoftButton color="info" size="small" onClick={handleClick}>
              Edit
            </SoftButton>
          )}
          <SoftButton color="error" size="small" onClick={handleClose}>
            Cancel
          </SoftButton>
        </div>
      </Box>
    </Modal>
  );
}

ExtraCurrModal.propTypes = {
  isExtraEdit: PropTypes.bool.isRequired,
  setIsExtraEdit: PropTypes.func.isRequired,
  editIndex: PropTypes.number.isRequired,
  openExtra: PropTypes.bool.isRequired,
  setOpenExtra: PropTypes.func.isRequired,
  setEditedDetails: PropTypes.func.isRequired,
  editedDetails: PropTypes.object.isRequired,
};
