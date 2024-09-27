import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import SoftTypography from "components/SoftTypography";
import Grid from "@mui/material/Grid";
import SoftButton from "components/SoftButton";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PropTypes from "prop-types";

export default function ProfileScoreCard({profileData}) {
    const percentage = profileData?.profile_score;
    const navigate = useNavigate();

    return (
        <Card
            style={{
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
            }}
        >
            <SoftTypography fontWeight="medium" variant="h6">
                Profile Score
            </SoftTypography>
            <Grid container style={{marginTop: "16px"}}>
                <Grid item xs={12} md={12} lg={4} sx={{margin: "auto"}}>
                    <div style={{width: "105px", height: "105px", margin: "auto"}}>
                        <CircularProgressbar value={percentage} text={`${percentage}`} />
                    </div>
                </Grid>
                <Grid item xs={12} md={12} lg={8} sx={{display: "flex", flexDirection: "column"}}>
                    <SoftTypography fontWeight="regular" variant="button" color="text">Profile score is based on your skills. Increase it by taking a skills test.</SoftTypography>
                    <SoftButton
                        color="info"
                        size="medium"
                        style={{ width: "fit-content", marginTop: "0.75rem" }}
                        onClick={() => navigate('/profile/profile-test', {state: {profileData: profileData}})}
                    >
                        Profile Test
                    </SoftButton>
                </Grid>
            </Grid>
        </Card>
    )
}

ProfileScoreCard.propTypes = {
    profileData: PropTypes.object.isRequired
  };