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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/supabase/client";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { revalidateAction } from "@/app/(school)/[id]/actions";
// TODO: Verify revalidateAction path, might need to be created or adjusted

const studentFormSchema = z.object({
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  middle_name: z
    .string()
    .min(2, { message: "Middle name must be at least 2 characters." }),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    required_error: "Gender is required.",
  }),
});

type StudentFormValues = z.infer<typeof studentFormSchema>;

const StudentForm = () => {
  const params = useParams();
  const [isOpen, setIsOpen] = React.useState(false);

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      middle_name: "",
      gender: undefined,
    },
  });

  const onSubmit = async (values: StudentFormValues) => {
    const loadingId = toast.loading("Adding student...", {
      position: "top-right",
    });
    const supabase = await createClient();
    const { id: jointId } = params as { id: string };

    try {
      if (!jointId) {
        throw new Error("Joint ID is not available.");
      }

      // 1. Create the student
      const { data: studentData, error: studentError } = await supabase
        .from("students")
        .insert({
          first_name: values.first_name,
          last_name: values.last_name,
          middle_name: values.middle_name,
          gender: values.gender,
        })
        .select("id")
        .single();

      if (studentError || !studentData) {
        throw new Error(
          `Failed to create student: ${studentError?.message || "No student data returned"}`,
        );
      }

      const newStudentId = studentData.id;

      // 2. Link student to the joint examination
      const { error: studentJointError } = await supabase
        .from("student_joint")
        .insert([
          {
            student: newStudentId,
            joint: parseInt(jointId, 10), // Ensure jointId is a number
          },
        ]);

      if (studentJointError) {
        // Attempt to delete the created student if linking fails
        await supabase.from("students").delete().eq("id", newStudentId);
        throw new Error(
          `Failed to link student to joint: ${studentJointError.message}`,
        );
      }

      toast.success(
        `Student ${values.first_name} ${values.last_name} added successfully!`,
      );
      form.reset();
      setIsOpen(false); // Close the sheet on success
      // Ensure this revalidateAction is correctly implemented and imported
      // For example, in app/(main)/joint/[id]/students/actions.ts:
      // 'use server'
      // import { revalidateTag } from 'next/cache'
      // export async function revalidateStudents() {
      //   revalidateTag('students_for_joint')
      // }
      // And then call it here: await revalidateStudents();
      // For now, using a generic revalidate path
      await revalidateAction("students_for_joint");
    } catch (error: any) {
      toast.error(`Error adding student: ${error.message}`);
      console.error("Error adding student:", error);
    } finally {
      toast.dismiss(loadingId);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          <span>Add Student</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[600px] overflow-y-auto px-5">
        <SheetHeader>
          <SheetTitle>Add New Student</SheetTitle>
          <SheetDescription>
            Fill in the details below to add a new student to this joint
            examination. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <Input placeholder="e.g., Alex" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <Input placeholder="e.g., Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Save Student"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default StudentForm;
