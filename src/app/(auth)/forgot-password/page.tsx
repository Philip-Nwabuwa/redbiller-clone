"use client";

import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMsg } from "@/components/common/ErrorLable";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  ConfirmPasswordField,
  EmailField,
  PinField,
  confirmPasswordSchema,
  emailSchema,
  pinSchema,
} from "@/lib/zodValidators";

const ForgetPasswordForm = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn]);

  const next = () => setStep((prevStep) => prevStep + 1);
  const back = () => setStep((prevStep) => prevStep - 1);

  return (
    <>
      <div className="w-full lg:grid lg:grid-cols-2 h-screen">
        <div className="flex items-center justify-center py-12">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {step === 1 && <FormStep1 next={next} setEmail={setEmail} />}
              {step === 2 && (
                <FormStep2 next={next} back={back} email={email} />
              )}
              {step === 3 && <FormStep3 back={back} />}
            </motion.div>
          </AnimatePresence>
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
    </>
  );
};

const FormStep1 = ({
  next,
  setEmail,
}: {
  next: () => void;
  setEmail: (email: string) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailField>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit: SubmitHandler<EmailField> = async (data) => {
    try {
      setEmail(data.email);
      toast.success(`OTP sent to ${data.email} successfully`);
      next();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-10 mb-4 text-center">
        <h1 className="text-3xl font-bold">Forgot Password ?</h1>
        <p>Enter your email to reset your password.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8">
        <div className="grid gap-2">
          <Label className="sr-only">Email</Label>
          <Input type="text" placeholder="Email" {...register("email")} />
          {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
        </div>

        <Button disabled={isSubmitting} type="submit" className="w-full">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        Not a Member yet?{" "}
        <Link href="/signup" className="underline text-[#3b82f6]">
          Create account
        </Link>
      </div>
    </div>
  );
};

const FormStep2 = ({
  next,
  back,
  email,
}: {
  next: () => void;
  back: () => void;
  email: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PinField>({
    resolver: zodResolver(pinSchema),
  });

  const handleBack = () => {
    back();
  };

  const [otpValue, setOtpValue] = useState<string>("");

  const onSubmit: SubmitHandler<PinField> = async (data) => {
    try {
      toast.success("OTP verification successful");
      console.log(data);
      next();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOTPChange = (newValue: string) => {
    setOtpValue(newValue);
  };
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-10 mb-4 text-center">
        <h1 className="text-3xl font-bold">OTP</h1>
        <p>Enter the OTP sent to {email} to proceed.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8">
        <div className="grid gap-2">
          <Label className="sr-only">OTP</Label>
          <div className="w-full flex items-center justify-center">
            <InputOTP
              maxLength={6}
              {...register("pin")}
              onChange={handleOTPChange}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {errors.pin && <ErrorMsg>{errors.pin.message}</ErrorMsg>}
        </div>

        <div className="flex justify-between">
          <Button
            disabled={isSubmitting}
            variant={"secondary"}
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="size-[24px]" /> Back
          </Button>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="flex items-center gap-2"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
            <ChevronRight className="size-[24px]" />
          </Button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        Not a Member yet?{" "}
        <Link href="/signup" className="underline text-[#3b82f6]">
          Create account
        </Link>
      </div>
    </div>
  );
};

const FormStep3 = ({ back }: { back: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmPasswordField>({
    resolver: zodResolver(confirmPasswordSchema),
  });
  const router = useRouter();

  const handleBack = () => {
    back();
  };

  const onSubmit: SubmitHandler<ConfirmPasswordField> = async (data) => {
    try {
      toast.success("Password reset successful, login to continue.");
      console.log(data);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-10 mb-4 text-center">
        <h1 className="text-3xl font-bold">Setup New Password</h1>
        <p>
          Have you already reset the password ?{" "}
          <Link href="/login" className="underline text-[#3b82f6]">
            login
          </Link>{" "}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8">
        <div className="grid gap-2">
          <Label className="sr-only">New Password</Label>
          <Input
            placeholder="New Password"
            autoComplete="false"
            type="password"
            {...register("password")}
          />
          <Label>
            Use 8 or more characters with a mix of letters, numbers & symbols.
          </Label>
          {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
        </div>

        <div className="grid gap-2">
          <Label className="sr-only">Confirm Password</Label>
          <Input
            placeholder="Confirm Password"
            type="password"
            {...register("confirmPassword")}
          />{" "}
          {errors.confirmPassword && (
            <ErrorMsg>{errors.confirmPassword.message}</ErrorMsg>
          )}
        </div>

        <div className="flex justify-between">
          <Button
            disabled={isSubmitting}
            variant={"secondary"}
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="size-[24px]" /> Back
          </Button>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="flex items-center gap-2"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
            <ChevronRight className="size-[24px]" />
          </Button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        Not a Member yet?{" "}
        <Link href="/signup" className="underline text-[#3b82f6]">
          Create account
        </Link>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
