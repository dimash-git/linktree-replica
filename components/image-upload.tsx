import Image from "next/image";
import React, { useEffect, useRef } from "react";

interface ImageUploadProps {
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
}

const ImageUpload = ({ image, setImage }: ImageUploadProps) => {
  const imageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(image);
  }, [image]);
  return (
    <>
      <button
        type="button"
        onClick={() => {
          imageRef.current?.click();
        }}
        className="w-full border border-gray-300 rounded-md outline-none p-5 
            focus-visible::ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 mr-2 inline-block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        Upload Image
      </button>

      {image && (
        <Image
          src={URL.createObjectURL(image)}
          width={300}
          height={300}
          alt="Uploaded Image"
          className="w-full h-32 object-cover hover:grayscale transition-all duration-150 cursor-not-allowed mt-4"
          onClick={() => {
            setImage(null);
            imageRef.current!.value = "";
          }}
        />
      )}
      <input
        type="file"
        hidden
        ref={imageRef}
        onChange={(e) => {
          if (!e.target.files![0].type.startsWith("image/")) return;
          setImage(e.target.files![0]);
        }}
      />
    </>
  );
};

export default ImageUpload;
