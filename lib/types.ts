import { Tables } from "@/supabase/supabase-types";

export interface Examination {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  type: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  bio: string;
  avatar: string;
}

export interface School {
  school: Tables<"school">;
}
