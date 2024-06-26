"use client";

import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMsg } from "@/components/common/ErrorLable";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const schema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type FormField = z.infer<typeof schema>;

const Login = () => {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();

  console.log(isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormField>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    try {
      if (data.email === "admin@email.com" && data.password === "@Admin123") {
        setIsLoggedIn(true);
        toast.success("Logged in successfully");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        toast.error("Invalid email or password");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full lg:grid lg:grid-cols-2 h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-10 mb-4 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <div className="text-balance text-muted-foreground flex flex-col justify-center items-center gap-2 ">
              Kindly confirm that you&apos;re on{" "}
              <p className="w-fit flex items-center gap-2 text-sm px-[26px] py-[6.5px] text-black bg-[#f5f5f5] rounded-[20px]">
                <Lock className="text-[#1bc4bd] size-[24px]" />{" "}
                https://app.redbiller.com
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8">
            <div className="grid gap-2">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input type="text" placeholder="Email" {...register("email")} />
              {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto text-[#3b82f6] inline-block text-sm underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <ErrorMsg>{errors.password.message}</ErrorMsg>
              )}
            </div>
            <Button disabled={isSubmitting} type="submit" className="w-full">
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
            <ThemeToggle />
          </form>
          <div className="mt-4 text-center text-sm">
            Not a Member yet?{" "}
            <Link href="/signup" className="underline text-[#3b82f6]">
              Create account
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Login;
