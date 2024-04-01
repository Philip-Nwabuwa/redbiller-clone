"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const { isLoggedIn, logout } = useAuthStore();
  console.log(isLoggedIn);

  if (!isLoggedIn) {
    router.push("/login");
  }
  return (
    <div>
      {" "}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default page;
