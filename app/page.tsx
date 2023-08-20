"use client";

import AddLinkForm from "@/components/forms/add-link-form";
import MobSidebar from "@/components/mob-sidebar";
import { useAuth } from "@/context/supabase-auth-context";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const getLinks = async () => {
      const { data } = await axios.get("/api/links", {
        params: { user_id: user.id },
      });
      console.log(data);
    };

    getLinks();
  }, [user]);
  return (
    <main>
      <div className="px-8 mt-4">
        <MobSidebar />
      </div>
      <div className="md:max-w-sm mx-auto flex justify-center">
        <div className="w-full pt-4">
          <div className="w-full flex justify-center">
            <AddLinkForm user={user} />
          </div>
        </div>
      </div>
    </main>
  );
}
