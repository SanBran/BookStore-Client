import React, { useState } from "react";
import styles from './PdfUpload.module.css'

const PdfUpload = ({setFormData, formData}) => {

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dajn5cfcv/image/upload`;

  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const form = new FormData();
  form.append("file", pdfFile);

  

  const handleUpload = async () => {
    try {
      console.log("uploading");
      const res = await fetch(cloudinaryUrl, {
        method: "POST",
        body: form,
        resourceType: 'auto'
      });
  
      if (!res.ok) return null;
  
      const data = await res.json();
      console.log(data);
      setFormData({
        ...formData,
        pdfLink: data.secure_url
      })
    } catch (error) {
      console.log(error);
    }
  
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button className={styles.btn} onClick={handleUpload}>Subir PDF</button>
    </div>
  );
};

export default PdfUpload;
