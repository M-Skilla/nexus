"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { toast } from "sonner";
import { adminAuthClient } from "@/supabase/admin";
import { useParams } from "next/navigation";

const emailSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
});

const InviteMembers = () => {
  const { id } = useParams();
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleInvite = async (values: z.infer<typeof emailSchema>) => {
    const loadingId = toast.loading("Sending Invite...");
    if (!id) {
      toast.error("Refresh page. Something went wrong.");
    }
    const {
      data: { user },
      error,
    } = await adminAuthClient.inviteUserByEmail(values.email, {
      data: {
        schoolId: id as string,
      },
      redirectTo: `http://localhost:3000/auth/callback`,
    });
    if (error || !user) {
      toast.error(
        `Failed to invite user: ${error?.message || "Unknown error"}`,
      );
    }
    toast.success("User invited successfully!");
    toast.dismiss(loadingId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary/70">Invite Members</Button>
      </DialogTrigger>
      <DialogContent className="w-[600px] px-4">
        <DialogHeader>
          <DialogTitle className="mb-5 text-xl">Invite Users</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleInvite)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormDescription>
                    Add email of the member you want to invite.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={form.formState.isSubmitting} type="submit">
                Invite
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMembers;
