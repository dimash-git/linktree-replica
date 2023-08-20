import React from "react";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:max-w-sm mx-auto flex justify-center">
      <div className="w-full">{children}</div>
    </div>
  );
};

export default ProfileLayout;
