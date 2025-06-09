"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Script from "next/script";
import { ArrowRight, CheckCircle2, Mail, Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Constants } from "@/supabase/supabase-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signup } from "../login/action";
import { toast } from "sonner";
import { createClient } from "@/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "" as (typeof Constants.public.Enums.gender)[number],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirm_password.trim()) {
      newErrors.confirm_password = "Confirm password is required";
    } else if (formData.confirm_password !== formData.password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const { success, error, data } = await signup(
        formData.email,
        formData.password,
        formData.first_name,
        formData.last_name,
        formData.middle_name,
        formData.gender,
      );

      if (!success || error || !data) {
        toast.error("Failed to sign up");
        return;
      }

      if (data.is_owner) {
        router.push(`/${data.school}`);
      } else {
        router.push(`/onboarding/create-school`);
      }
    } catch (error) {
      toast.error(`Registration failed ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("staff")
          .select("school")
          .eq("id", user.id)
          .single();

        if (!data?.school) {
          router.replace("/onboarding/create-school");
        }
        router.replace(`/school/${user.id}`);
      }
    };

    checkAuth();
  }, [supabase.auth]);

  // useEffect(() => {
  //   try {
  //     (window as any).handleSignInWithGoogle = async (response: any) => {
  //       try {
  //         const { createClient } = await import("@/supabase/client");
  //         const supabase = createClient();
  //         const { data, error } = await supabase.auth.signInWithIdToken({
  //           provider: "google",
  //           token: response.credential,
  //         });
  //         console.log("Google sign-in response:", data, error);
  //       } catch (error) {
  //         console.error("Error during Google sign-in:", error);
  //       }
  //     };
  //   } catch (error) {
  //     console.error("Error setting up Google sign-in:", error);
  //   }
  // }, []);

  return (
    <div className="from-background to-secondary/10 dark:from-background dark:to-secondary/20 relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br p-4 md:flex-row md:p-8">
      {/* Left side - Branding and information */}
      <div className="mb-8 w-full max-w-md md:mb-0 md:w-1/2 md:pr-8">
        <div className="mb-6 text-center md:text-left">
          <h1 className="text-primary mb-2 text-3xl font-bold md:text-4xl">
            Nexus
          </h1>
          <p className="text-muted-foreground">
            Joint Examination Management System
          </p>
        </div>

        <div className="hidden space-y-6 md:block">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="text-primary mt-0.5 h-6 w-6" />
            <div>
              <h3 className="font-medium">Streamlined Exam Management</h3>
              <p className="text-muted-foreground text-sm">
                Efficiently manage all aspects of your examination process
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="text-primary mt-0.5 h-6 w-6" />
            <div>
              <h3 className="font-medium">Secure and Reliable</h3>
              <p className="text-muted-foreground text-sm">
                Your data is protected with enterprise-grade security
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="text-primary mt-0.5 h-6 w-6" />
            <div>
              <h3 className="font-medium">Collaborative Platform</h3>
              <p className="text-muted-foreground text-sm">
                Work together with your team in real-time
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Registration form */}
      <Card className="bg-card/95 dark:bg-card/80 w-full max-w-md border-0 shadow-lg backdrop-blur-sm md:w-1/2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details to get started
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="first_name" className="text-sm font-medium">
                First Name
              </Label>
              <Input
                id="first_name"
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className={
                  errors.first_name
                    ? "border-destructive focus-visible:ring-destructive/50"
                    : ""
                }
              />
              {errors.first_name && (
                <p className="text-destructive text-sm">{errors.first_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="middle_name" className="text-sm font-medium">
                Middle Name
              </Label>
              <Input
                id="middle_name"
                name="middle_name"
                type="text"
                value={formData.middle_name}
                onChange={handleChange}
                placeholder="Middle Name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_name" className="text-sm font-medium">
                Last Name
              </Label>
              <Input
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className={
                  errors.last_name
                    ? "border-destructive focus-visible:ring-destructive/50"
                    : ""
                }
              />
              {errors.last_name && (
                <p className="text-destructive text-sm">{errors.last_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-sm font-medium">
                Gender
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    gender:
                      value as (typeof Constants.public.Enums.gender)[number],
                  }))
                }
              >
                <SelectTrigger
                  id="gender"
                  className={`w-full pl-2 ${errors.gender ? "border-destructive focus-visible:ring-destructive/50" : ""}`}
                >
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  {Constants.public.Enums.gender.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender.charAt(0).toUpperCase() +
                        gender.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-destructive text-sm">{errors.gender}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={`pl-10 ${errors.email ? "border-destructive focus-visible:ring-destructive/50" : ""}`}
                />
              </div>
              {errors.email && (
                <p className="text-destructive text-sm">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`pl-10 ${errors.password ? "border-destructive focus-visible:ring-destructive/50" : ""}`}
                />
              </div>
              {errors.password && (
                <p className="text-destructive text-sm">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm_password" className="text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5" />
                <Input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  value={formData.confirm_password || ""}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`pl-10 ${errors.confirm_password ? "border-destructive focus-visible:ring-destructive/50" : ""}`}
                />
              </div>
              {errors.confirm_password && (
                <p className="text-destructive text-sm">
                  {errors.confirm_password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full transition-all duration-300 hover:translate-y-[-2px]"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="mr-2">Creating account</span>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Create account <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          {/* <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card text-muted-foreground dark:bg-card px-2 text-xs">
                OR CONTINUE WITH
              </span>
            </div>
          </div>

          <div
            id="g_id_onload"
            data-client_id="656726817371-nkn1v3eec9dapct1qaaqpdq91v7aqofl.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-callback="handleSignInWithGoogle"
            data-auto_prompt="false"
            data-use_fedcm_for_prompt="true"
          ></div>

          <div
            className="g_id_signin"
            data-type="standard"
            data-shape="pill"
            data-theme="filled_black"
            data-text="continue_with"
            data-size="large"
            data-logo_alignment="left"
          ></div> */}
        </CardContent>

        <CardFooter className="dark:border-border/30 flex justify-center border-t pt-4">
          <p className="text-muted-foreground text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
      <Script src="https://accounts.google.com/gsi/client" async />
    </div>
  );
}
