"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  const { isLoggedIn, logout } = useAuthStore();
  console.log(isLoggedIn);

  if (!isLoggedIn) {
    router.push("/login");
  }
  return (
    <div>
      {" "}
      <Button variant={"ghost"} onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
