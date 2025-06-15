"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/supabase/client";
import { Tables } from "@/supabase/supabase-types";
import { toast } from "sonner";
import { PlusCircle, MoreHorizontal, Edit, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { z } from "zod";
import { revalidateAction } from "@/app/(school)/[id]/actions";

// Define the structure for a subject within a joint exam
// Assuming a table like 'subject' with joint_id
type JointSubject = Tables<"subject"> & { joint_id?: number }; // Confirmed based on user's prior edit

const subjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().max(10, "Maximum Length is 10"),
});

export default function SubjectsPage() {
  const router = useRouter();
  const params = useParams();
  const jointId = params.id ? Number(params.id) : null;
  const supabase = createClient();
  const [disabled, setDisabled] = React.useState(false);
  const [subjects, setSubjects] = React.useState<JointSubject[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingSubject, setEditingSubject] =
    React.useState<JointSubject | null>(null);
  const [subjectName, setSubjectName] = React.useState("");
  const [subjectCode, setSubjectCode] = React.useState("");

  const [examName, setExamName] = React.useState<string>("");

  React.useEffect(() => {
    async function fetchExamDetails() {
      if (!jointId) return;
      const { data, error } = await supabase
        .from("joint")
        .select("name")
        .eq("id", jointId)
        .single();
      if (data) {
        setExamName(data.name || "Selected Exam");
      }
    }
    fetchExamDetails();
  }, [jointId, supabase]);

  const fetchSubjects = React.useCallback(async () => {
    if (!jointId) return;
    setIsLoading(true);

    const { data, error } = await supabase
      .from("subject")
      .select("*")
      .eq("joint", jointId)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch subjects: " + error.message);
      setSubjects([]);
    } else {
      setSubjects(data || []);
    }
    setIsLoading(false);
  }, [jointId, supabase]);

  React.useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const handleOpenDialog = (subject: JointSubject | null = null) => {
    setEditingSubject(subject);
    setSubjectName(subject?.name || "");
    setSubjectCode(subject?.code || ""); // Assuming 'code' field exists
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    const toastID = toast.loading("Submitting...");
    setDisabled(true);
    if (!jointId || !subjectName.trim()) {
      toast.error("Subject name is required.");
      setDisabled(false);
      toast.dismiss(toastID);
      return;
    }

    const subjectData = {
      name: subjectName.trim(),
      code: subjectCode.trim(), // Handle optional code, ensure undefined for empty
      joint: jointId, // Associate with the current joint exam
    };

    let error;
    if (editingSubject) {
      // Update existing subject
      const { error: updateError } = await supabase
        .from("subject") // Changed from "subjects" to "subject"
        .update(subjectData)
        .eq("id", editingSubject.id);
      error = updateError;
      revalidateAction("student_assign");
    } else {
      // Add new subject
      const { error: insertError } = await supabase
        .from("subject") // Changed from "subjects" to "subject"
        .insert(subjectData);
      error = insertError;
      revalidateAction("student_assign");
    }

    if (error) {
      toast.error("Failed to save subject: " + error.message);
      setDisabled(false);
      toast.dismiss(toastID);
    } else {
      toast.success(
        editingSubject
          ? "Subject updated successfully!"
          : "Subject added successfully!",
      );
      setIsDialogOpen(false);
      setDisabled(false);
      toast.dismiss(toastID);
      fetchSubjects(); // Refresh the list
    }
  };

  const handleDeleteSubject = async (subjectId: number) => {
    // Add a confirmation dialog here for better UX
    const confirmed = window.confirm(
      "Are you sure you want to delete this subject?",
    );
    if (!confirmed) return;

    const { error } = await supabase
      .from("subject") // Changed from "subjects" to "subject"
      .delete()
      .eq("id", subjectId);
    revalidateAction("student_assign");
    if (error) {
      toast.error("Failed to delete subject: " + error.message);
    } else {
      toast.success("Subject deleted successfully!");
      fetchSubjects(); // Refresh the list
    }
  };

  if (!jointId) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>Invalid examination ID.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Subjects</h1>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => handleOpenDialog()}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Subject
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingSubject ? "Edit Subject" : "Add New Subject"}
              </DialogTitle>
              <DialogDescription>
                {editingSubject
                  ? "Update the details of the subject."
                  : "Fill in the details for the new subject."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g., Mathematics 1"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-right">
                  Code
                </Label>
                <Input
                  id="code"
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g., MATH101"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button disabled={disabled} onClick={handleSubmit}>
                {editingSubject ? "Save Changes" : "Add Subject"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="flex max-h-[65vh] flex-1 flex-col">
        <CardHeader>
          <CardTitle>Subject List</CardTitle>
          <CardDescription>
            A list of all subjects configured for this examination.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : subjects.length === 0 ? (
            <p className="text-muted-foreground text-center">
              No subjects found for this examination.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Code</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created At
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.map((subject) => (
                  <TableRow key={subject.id}>
                    <TableCell className="font-medium">
                      {subject.name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {subject.code || "N/A"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(subject.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleOpenDialog(subject)}
                          >
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteSubject(subject.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
