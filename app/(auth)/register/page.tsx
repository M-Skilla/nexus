"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { signup } from "../login/action";

export type RegisterType = {
  schoolName: string;
  streetAddress: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  principal: string;
  principalPhone: string;
  principalEmail: string;
  gender?: string;
  password: string;
  cPassword: string;
};
export default function RegisterPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<RegisterType>({
    schoolName: "",
    streetAddress: "",
    city: "",
    region: "",
    postalCode: "",
    country: "",
    phone: "",
    email: "",
    principal: "",
    principalPhone: "",
    principalEmail: "",
    password: "",
    cPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
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

    if (!formData.schoolName.trim()) {
      newErrors.schoolName = "School name is required";
    } else if (formData.schoolName.length < 3) {
      newErrors.schoolName = "School name must be at least 3 characters";
    }

    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = "Street address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.region.trim()) {
      newErrors.region = "Region is required";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!formData.principal.trim()) {
      newErrors.principal = "Principal Name is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (formData.password !== formData.cPassword) {
      newErrors.cPassword = "Passwords do not match";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s\-()]{8,20}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.principalPhone.trim()) {
      newErrors.principalPhone = "Phone number is required";
    } else if (!/^\+?[0-9\s\-()]{8,20}$/.test(formData.principalPhone)) {
      newErrors.principalPhone = "Please enter a valid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.principalEmail.trim()) {
      newErrors.principalEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.principalEmail)) {
      newErrors.principalEmail = "Please enter a valid Email address";
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
      await signup(formData);

      setIsSuccess(true);
      toast("Registration Successful", {
        description: "Your school has been registered successfully.",
      });

      setTimeout(() => {
        router.push("/");
      }, 5000);
    } catch (error) {
      toast.error("Registration Failed", {
        description:
          "There was an error registering your school. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Registration Successful
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your school has been registered successfully. You will be redirected
            to the login page shortly.
          </p>
          <Button asChild className="mt-4">
            <Link href="/">Go to Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Image src="/favicon.ico" alt="logo" width={32} height={32} />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary">
            Nexus Exam
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Register your school to access the exam portal
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-2xl">School Registration</CardTitle>
              <CardDescription>
                Enter your school details to create an account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2 mt-5">
                <Label htmlFor="schoolName">School Name</Label>
                <Input
                  id="schoolName"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  placeholder="Enter school name"
                  className={errors.schoolName ? "border-red-500" : ""}
                />
                {errors.schoolName && (
                  <p className="text-sm text-red-500">{errors.schoolName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="streetAddress">Street Address</Label>
                  <Input
                    id="streetAddress"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    placeholder="Enter street address"
                    className={errors.streetAddress ? "border-red-500" : ""}
                  />
                  {errors.streetAddress && (
                    <p className="text-sm text-red-500">
                      {errors.streetAddress}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className={errors.city ? "border-red-500" : ""}
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500">{errors.city}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Input
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    placeholder="Enter region"
                    className={errors.region ? "border-red-500" : ""}
                  />
                  {errors.region && (
                    <p className="text-sm text-red-500">{errors.region}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Enter postal code"
                    className={errors.postalCode ? "border-red-500" : ""}
                  />
                  {errors.postalCode && (
                    <p className="text-sm text-red-500">{errors.postalCode}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter country"
                    className={errors.country ? "border-red-500" : ""}
                  />
                  {errors.country && (
                    <p className="text-sm text-red-500">{errors.country}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="principal">Principal Name</Label>
                  <Input
                    id="principal"
                    name="principal"
                    value={formData.principal}
                    onChange={handleChange}
                    placeholder="Enter Principal Name"
                    className={errors.principal ? "border-red-500" : ""}
                  />
                  {errors.principal && (
                    <p className="text-sm text-red-500">{errors.principal}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="principalEmail">Principal Email</Label>
                  <Input
                    id="principalEmail"
                    name="principalEmail"
                    type="principalEmail"
                    value={formData.principalEmail}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className={errors.principalEmail ? "border-red-500" : ""}
                  />
                  {errors.principalEmail && (
                    <p className="text-sm text-red-500">
                      {errors.principalEmail}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Principal Phone Number</Label>
                  <Input
                    id="principalPhone"
                    name="principalPhone"
                    type="principalPhone"
                    value={formData.principalPhone}
                    onChange={handleChange}
                    placeholder="Enter Principal Phone Number"
                    className={errors.principalPhone ? "border-red-500" : ""}
                  />
                  {errors.principalPhone && (
                    <p className="text-sm text-red-500">
                      {errors.principalPhone}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cPassword">Confirm Password</Label>
                  <Input
                    id="cPassword"
                    name="cPassword"
                    type="cPassword"
                    value={formData.cPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className={errors.cPassword ? "border-red-500" : ""}
                  />
                  {errors.cPassword && (
                    <p className="text-sm text-red-500">{errors.cPassword}</p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 mt-5">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  "Register School"
                )}
              </Button>
              <p className="text-sm text-center">
                Already have an account?{" "}
                <Link
                  href="/"
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
