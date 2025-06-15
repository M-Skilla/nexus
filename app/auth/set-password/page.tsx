// app/set-password/page.tsx (App Router)
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { createClient } from "@/supabase/client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Constants } from "@/supabase/supabase-types";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { revalidateAction, revalidateAll } from "@/app/(school)/[id]/actions";

const detailSchema = z
  .object({
    first_name: z.string({ message: "First Name is required" }),
    middle_name: z.string({ message: "Middle Name is required" }),
    last_name: z.string({ message: "Last Name is required" }),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
    confirmPassword: z.string().min(6, {
      message: "Confirm Password must be at least 6 characters long.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export default function SetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  const form = useForm<z.infer<typeof detailSchema>>({
    resolver: zodResolver(detailSchema),
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      gender: "MALE",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!tokenHash || type !== "invite") {
      setError("Invalid or missing invitation token.");

      router.replace("/login");
    }
  }, [tokenHash, type, router]);

  const handleSubmit = async (values: z.infer<typeof detailSchema>) => {
    setMessage("");
    setError("");

    if (!tokenHash) {
      toast.error("Missing token hash.");
      router.replace("/login");
      return;
    }

    try {
      const {
        data: { user },
        error: verifyError,
      } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: "invite", // Ensure it's for an invite
      });

      if (verifyError) {
        toast.error(`Token verification failed: ${verifyError.message}`);
        router.replace("/login");

        return;
      }

      // Now that the token is verified and session is (potentially) updated, set the password
      const { data, error: updateError } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (updateError) {
        toast.error(`Failed to set password: ${updateError.message}`);
      } else {
        const { data: group } = await supabase
          .from("group")
          .upsert({ id: 2, name: "TEACHER" })
          .select()
          .single();

        const { error } = await supabase.from("staff").insert({
          id: user?.id,
          first_name: values.first_name,
          middle_name: values.middle_name,
          last_name: values.last_name,
          gender: values.gender,
          group: group?.id || 2,
          school: user?.user_metadata.schoolId,
        });

        if (error) {
          toast.error(`Error creating staff ${error}`);
          console.error("Error creating staff:", error);
          return;
        }
        toast.success("Password set successfully! Redirecting to dashboard...");
        revalidateAll();

        router.replace(`/${user?.user_metadata.schoolId}`);
      }
    } catch (err: any) {
      console.error("Error setting password:", err);
      toast.error(`An unexpected error occurred: ${err.message}`);
    }
  };

  if (!tokenHash) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p style={{ color: "red" }}>
          Error: Invalid or missing invitation token.
        </p>
      </div>
    );
  }

  return (
    <div className="from-background to-secondary/10 dark:from-background dark:to-secondary/20 relative flex h-full min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br p-4">
      <Card className="bg-card/95 dark:bg-card/80 w-full max-w-md border-0 shadow-lg backdrop-blur-sm md:w-1/2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">
            Add your details
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex-col space-y-3"
            >
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="eg. John" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="middle_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input placeholder="eg. Francis" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="eg. Doe" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender" // Corrected from "first_name" to "gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger className="w-full">
                          <SelectValue
                            className="w-full"
                            placeholder="Gender"
                          />
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
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                style={{
                  marginTop: "20px",
                  padding: "10px 15px",
                  cursor: "pointer",
                }}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
              {message && (
                <p style={{ color: "green", marginTop: "10px" }}>{message}</p>
              )}
              {error && (
                <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
