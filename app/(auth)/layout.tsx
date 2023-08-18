import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:max-w-sm mx-auto h-screen flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
