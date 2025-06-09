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

const emailSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
});

const InviteMembers = () => {
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleInvite = (values: z.infer<typeof emailSchema>) => {
    const loadingId = toast.loading("Sending Invite...");
    console.log("Inviting members:", values.email);
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
              <Button
                disabled={form.formState.isSubmitting || form.formState.isDirty}
                type="submit"
              >
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
