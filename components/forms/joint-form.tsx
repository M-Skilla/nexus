"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { createClient } from "@/supabase/client";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { revalidateAction } from "@/app/(school)/[id]/actions";

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Examination name must be at least 2 characters.",
    }),
    description: z.string().optional(),
    start_date: z.date({
      required_error: "A start date is required.",
      invalid_type_error: "That\'s not a valid date!",
    }),
    end_date: z.date({
      required_error: "An end date is required.",
      invalid_type_error: "That\'s not a valid date!",
    }),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.start_date);
      const endDate = new Date(data.end_date);
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return true;
      }
      return startDate < endDate;
    },
    {
      message: "End date cannot be earlier than start date",
      path: ["end_date"],
    },
  );

type FormValues = z.infer<typeof formSchema>;

const JointForm = () => {
  const params = useParams();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      start_date: undefined,
      end_date: undefined,
    },
  });

  const onSubmit = async (values: FormValues) => {
    const loadingId = toast.loading("Creating joint examination...", {
      position: "top-right",
    });
    const supabase = await createClient();
    const { id } = params as { id: string };
    const {
      data: { user },
    } = await supabase.auth.getUser();

    try {
      if (!user || !id) {
        throw new Error("User or school ID is not available.");
      }

      const { error } = await supabase.rpc("create_joint_examination", {
        p_description: values.description || "",
        p_end_date: values.end_date.toLocaleDateString(),
        p_name: values.name,
        p_school_id: id,
        p_staff_id: user?.id,
        p_start_date: values.start_date.toLocaleDateString(),
      });

      if (error) {
        throw new Error(`Failed to create joint examination: ${error.message}`);
      }

      toast.success(`Examination ${values.name} created successfully!`);
      form.reset();
    } catch (error: any) {
      toast.error(`Error creating joint examination: ${error.message}`);
      console.error("Error creating joint examination:", error);
    } finally {
      toast.dismiss(loadingId);
      revalidateAction("staff_joints");
    }
  };

  return (
    <Sheet>
      <SheetTrigger className="bg-primary/70 flex cursor-pointer items-center gap-2 rounded-[10px] px-1 py-2 text-sm">
        <Plus className="h-4 w-4" /> <span>Add Examination</span>{" "}
      </SheetTrigger>
      <SheetContent className="max-w-[600px] overflow-y-auto px-5">
        <SheetHeader>
          <SheetTitle>Create New Joint Examination</SheetTitle>
          <SheetDescription>
            Fill in the details below to create a new joint examination. Click
            save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Examination Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Mid-Term Physics Exam"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a brief description of the examination"
                      {...field}
                      className="h-36"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    disabled={(date) =>
                      date <
                      new Date(new Date().setDate(new Date().getDate() - 1))
                    }
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    disabled={(date) => {
                      const startDate = form.getValues("start_date");
                      // Disable if date is before start_date (if start_date is set)
                      if (startDate && date < startDate) {
                        return true;
                      }
                      // Disable if date is a past date (before yesterday)
                      return (
                        date <
                        new Date(new Date().setDate(new Date().getDate() - 1))
                      );
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Save Examination"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default JointForm;
