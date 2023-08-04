export const fileUpload = async (file) => {
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dajn5cfcv/image/upload`;

  const formData = new FormData();
  formData.append("upload_preset", "ml_default");
  formData.append("file", file);

  try {
    const res = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.secure_url;
  } catch (error) {
    throw error;
  }
};
