import React from "react";
import styles from './PdfUpload.module.css'

const PdfUpload = ({setPdfFile, pdfFile}) => {

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };


  return (
    <div>
      <input className={styles.link} type="file" accept=".pdf" onChange={handleFileChange} />
    </div>
  );
};

export default PdfUpload;
