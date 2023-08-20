import Link from "next/link";
import React from "react";

const links = [
  { name: "Home", url: "/" },
  { name: "Profile", url: "/profile" },
];

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-6 mt-8">
      {links.map((link, idx) => (
        <Link
          href={link.url}
          key={idx}
          className="hover:text-slate-500 transition-all"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
