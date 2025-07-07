// Config/UploadToCloudinary.js
const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "BuzzWrite");

  const res = await fetch("https://api.cloudinary.com/v1_1/dcalyvpgw/image/upload", {
    method: "POST",
    body: data,
  });

  const fileData = await res.json();

  if (fileData.secure_url) {
    console.log("✅ Cloudinary URL:", fileData.secure_url);
    return fileData.secure_url;
  } else {
    console.error("❌ No secure_url returned");
    return null;
  }
};

export default uploadToCloudinary;
