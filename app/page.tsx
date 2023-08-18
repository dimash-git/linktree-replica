"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";

export default function Home() {
  const handleClick = async () => {
    const { data } = await axios.post("/api/links", {
      title: "asd",
      link: "https://google.com",
      user_id: "123",
    });
    console.log(data);
  };
  return (
    <main>
      <div className="md:max-w-sm mx-auto flex justify-center">
        <div className="w-full pt-4">
          <div className="flex justify-center">
            <Button onClick={handleClick}>Add new link</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
