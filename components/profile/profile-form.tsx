"use client";

import React, { useRef, useState } from "react";
import ImageUpload from "../image-upload";
import { Button } from "../ui/button";
import axios from "axios";

const ProfileForm = () => {
  const [image, setImage] = useState<File | null>(null);

  const onClick = async () => {
    if (!image) return;
    try {
      console.log(image);

      const { data } = await axios.post("/api/profile/picture", {
        image,
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
