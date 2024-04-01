"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const { isLoggedIn, logout } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, [isLoggedIn]);
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-screen h-screen">
      <Loader className="size-[30px] animate-spin" />
      <p className="text-lg text-center animate-pulse">Loading</p>
    </div>
  );
}
