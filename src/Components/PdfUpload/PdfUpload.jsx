import React from "react";
import { useState } from "react";
import styles from './PdfUpload.module.css'

const PdfUpload = ({setFormData, formData}) => {
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dajn5cfcv/image/upload`;
  console.log("1");
  

  const handleFileChange = async (e) => {
    console.log("2");
    const form = new FormData();
  form.append("upload_preset", "ml_default");
  form.append("file", e.target.files[0]);
    console.log(form);
    try {
      const res = await fetch(cloudinaryUrl, {
        method: "POST",
        body: form,
        resourceType: 'auto',
      });
  
      if (!res.ok) return null;
  
      const data = await res.json();
      console.log(data);
      setFormData({
        ...formData,
        pdfLink: data.secure_url
      })
      return
    } catch (error) {
      throw error;
    }
  };


  return (
    <div>
      <input className={styles.link} type="file" accept=".pdf" onChange={handleFileChange} />
    </div>
  );
};

export default PdfUpload;
