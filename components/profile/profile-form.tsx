"use client";

import React, { useRef, useState } from "react";
import ImageUpload from "../image-upload";

const ProfileForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const imagePickerRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <ImageUpload {...{ image, setImage }} />
    </>
  );
};

export default ProfileForm;
