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

// @mui material components
import { useState, useEffect } from "react";
import DocViewer from "react-doc-viewer";
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/cjs/Page/AnnotationLayer.css';
import 'react-pdf/dist/cjs/Page/TextLayer.css';
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftButton from "components/SoftButton";

// pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.js'
// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function ResumePreview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pdfUrl } = location.state || { pdfUrl: '' };
  // console.log(pdfBase64);
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess(numPages) {
    setNumPages(numPages);
  }

  // const pdfDataUri = `data:application/pdf;base64,${pdfBase64}`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'resume.pdf'; // Specify the default file name for the downloaded file
    document.body.appendChild(link); // Append the link to the body
    link.click(); // Trigger the download
    document.body.removeChild(link);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftTypography variant="h4" fontWeight="bold" style={{textAlign: "center"}}>Resume Preview</SoftTypography>
        <SoftBox py={3} style={{display: "flex", justifyContent: "center"}}>
          {/* <embed src={`data:application/pdf;base64,${pdfBase64}`} /> */}
          {/* {docs.length > 0 && <DocViewer documents={docs} style={{width: 600, height: 700}}/>} */}
          <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} >
            <Page pageNumber={pageNumber} />
          </Document>
        </SoftBox>
        <SoftBox style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "1.25rem"}}>
          <SoftButton size="medium" color="secondary" onClick={() => navigate('/profile/resume-wizard')}>Edit</SoftButton>
          <SoftButton size="medium" color="primary" onClick={() => handleDownload()}>Download</SoftButton>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ResumePreview;
