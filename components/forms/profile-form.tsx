"use client";

import React, { useState } from "react";
import ImageUpload from "../image-upload";
import { Button } from "../ui/button";
import axios from "axios";

const ProfileForm = () => {
  const [image, setImage] = useState<File | null>(null);

  const onClick = async () => {
    if (!image) return;
    try {
      // console.log(image);
      const formData = new FormData();
      formData.append("image", image);
      formData.append("image_name", image.name);

      const { data } = await axios.post("/api/profile/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for file upload
        },
      });
      console.log(data);
    } catch (error) {
      console.log("PROFILE_IMAGE_UPLOAD_ERROR", error);
    }
  };

  return (
    <>
      <ImageUpload {...{ image, setImage }} />
      <Button className="w-full mt-4" onClick={onClick}>
        Update Profile Image
      </Button>
    </>
  );
};

export default ProfileForm;
