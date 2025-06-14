export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      class: {
        Row: {
          created_at: string
          id: number
          joint: number | null
          name: string
          school: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          joint?: number | null
          name: string
          school?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          joint?: number | null
          name?: string
          school?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "class_joint_fkey"
            columns: ["joint"]
            isOneToOne: false
            referencedRelation: "joint"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_school_fkey"
            columns: ["school"]
            isOneToOne: false
            referencedRelation: "school"
            referencedColumns: ["id"]
          },
        ]
      }
      grades: {
        Row: {
          created_at: string
          end: number
          id: number
          remarks: string | null
          start: number
        }
        Insert: {
          created_at?: string
          end: number
          id?: number
          remarks?: string | null
          start: number
        }
        Update: {
          created_at?: string
          end?: number
          id?: number
          remarks?: string | null
          start?: number
        }
        Relationships: []
      }
      grading: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      group: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      invitation: {
        Row: {
          created_at: string
          from: string
          id: number
          school: string
          to: string
        }
        Insert: {
          created_at?: string
          from: string
          id?: number
          school: string
          to: string
        }
        Update: {
          created_at?: string
          from?: string
          id?: number
          school?: string
          to?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitation_from_fkey"
            columns: ["from"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invitation_school_fkey"
            columns: ["school"]
            isOneToOne: false
            referencedRelation: "school"
            referencedColumns: ["id"]
          },
        ]
      }
      joint: {
        Row: {
          class: string | null
          created_at: string
          description: string | null
          end_date: string
          id: number
          name: string
          start_date: string
        }
        Insert: {
          class?: string | null
          created_at?: string
          description?: string | null
          end_date: string
          id?: number
          name: string
          start_date: string
        }
        Update: {
          class?: string | null
          created_at?: string
          description?: string | null
          end_date?: string
          id?: number
          name?: string
          start_date?: string
        }
        Relationships: []
      }
      marks: {
        Row: {
          created_at: string
          id: number
          marks: number
          student: string
          subject: number
        }
        Insert: {
          created_at?: string
          id?: number
          marks: number
          student: string
          subject: number
        }
        Update: {
          created_at?: string
          id?: number
          marks?: number
          student?: string
          subject?: number
        }
        Relationships: [
          {
            foreignKeyName: "marks_student_fkey"
            columns: ["student"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marks_subject_fkey"
            columns: ["subject"]
            isOneToOne: false
            referencedRelation: "subject"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          description: string
          from: string
          id: number
          title: string
          to: string | null
        }
        Insert: {
          created_at?: string
          description: string
          from: string
          id?: number
          title: string
          to?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          from?: string
          id?: number
          title?: string
          to?: string | null
        }
        Relationships: []
      }
      school: {
        Row: {
          address: string
          city: string
          country: string
          created_at: string
          email: string
          id: string
          name: string
          phone_number: string
          postal_code: string
          region: string
        }
        Insert: {
          address: string
          city: string
          country: string
          created_at?: string
          email: string
          id?: string
          name: string
          phone_number: string
          postal_code: string
          region: string
        }
        Update: {
          address?: string
          city?: string
          country?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone_number?: string
          postal_code?: string
          region?: string
        }
        Relationships: []
      }
      school_joint: {
        Row: {
          created_at: string
          id: number
          is_owner: boolean | null
          joint: number
          school: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_owner?: boolean | null
          joint: number
          school: string
        }
        Update: {
          created_at?: string
          id?: number
          is_owner?: boolean | null
          joint?: number
          school?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_joint_joint_fkey"
            columns: ["joint"]
            isOneToOne: false
            referencedRelation: "joint"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_joint_school_fkey"
            columns: ["school"]
            isOneToOne: false
            referencedRelation: "school"
            referencedColumns: ["id"]
          },
        ]
      }
      staff: {
        Row: {
          created_at: string
          first_name: string
          gender: Database["public"]["Enums"]["gender"]
          group: number | null
          id: string
          is_owner: boolean
          last_name: string
          middle_name: string
          school: string | null
          subject: number | null
        }
        Insert: {
          created_at?: string
          first_name: string
          gender?: Database["public"]["Enums"]["gender"]
          group?: number | null
          id?: string
          is_owner?: boolean
          last_name: string
          middle_name: string
          school?: string | null
          subject?: number | null
        }
        Update: {
          created_at?: string
          first_name?: string
          gender?: Database["public"]["Enums"]["gender"]
          group?: number | null
          id?: string
          is_owner?: boolean
          last_name?: string
          middle_name?: string
          school?: string | null
          subject?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_group_fkey"
            columns: ["group"]
            isOneToOne: false
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_school_fkey"
            columns: ["school"]
            isOneToOne: false
            referencedRelation: "school"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_subject_fkey"
            columns: ["subject"]
            isOneToOne: false
            referencedRelation: "subject"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_joint: {
        Row: {
          created_at: string
          group: number | null
          id: number
          joint: number | null
          staff: string | null
          subject: number | null
        }
        Insert: {
          created_at?: string
          group?: number | null
          id?: number
          joint?: number | null
          staff?: string | null
          subject?: number | null
        }
        Update: {
          created_at?: string
          group?: number | null
          id?: number
          joint?: number | null
          staff?: string | null
          subject?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_joint_group_fkey"
            columns: ["group"]
            isOneToOne: false
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_joint_joint_fkey"
            columns: ["joint"]
            isOneToOne: false
            referencedRelation: "joint"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_joint_staff_fkey"
            columns: ["staff"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_joint_subject_fkey"
            columns: ["subject"]
            isOneToOne: false
            referencedRelation: "subject"
            referencedColumns: ["id"]
          },
        ]
      }
      stream: {
        Row: {
          class: number
          created_at: string
          id: number
          name: string
          note: string | null
        }
        Insert: {
          class: number
          created_at?: string
          id?: number
          name: string
          note?: string | null
        }
        Update: {
          class?: number
          created_at?: string
          id?: number
          name?: string
          note?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stream_class_fkey"
            columns: ["class"]
            isOneToOne: false
            referencedRelation: "class"
            referencedColumns: ["id"]
          },
        ]
      }
      student_joint: {
        Row: {
          created_at: string
          id: number
          joint: number
          student: string
        }
        Insert: {
          created_at?: string
          id?: number
          joint: number
          student: string
        }
        Update: {
          created_at?: string
          id?: number
          joint?: number
          student?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_joint_joint_fkey"
            columns: ["joint"]
            isOneToOne: false
            referencedRelation: "joint"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_joint_student_fkey"
            columns: ["student"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_subjects: {
        Row: {
          created_at: string
          id: number
          student: string
          subject: number
        }
        Insert: {
          created_at?: string
          id?: number
          student: string
          subject: number
        }
        Update: {
          created_at?: string
          id?: number
          student?: string
          subject?: number
        }
        Relationships: [
          {
            foreignKeyName: "student_subjects_student_fkey"
            columns: ["student"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_subjects_subject_fkey"
            columns: ["subject"]
            isOneToOne: false
            referencedRelation: "subject"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          created_at: string
          first_name: string
          gender: string
          id: string
          last_name: string
          middle_name: string
        }
        Insert: {
          created_at?: string
          first_name: string
          gender: string
          id?: string
          last_name: string
          middle_name: string
        }
        Update: {
          created_at?: string
          first_name?: string
          gender?: string
          id?: string
          last_name?: string
          middle_name?: string
        }
        Relationships: []
      }
      subject: {
        Row: {
          code: string
          created_at: string
          id: number
          joint: number | null
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: number
          joint?: number | null
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: number
          joint?: number | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "subject_joint_fkey"
            columns: ["joint"]
            isOneToOne: false
            referencedRelation: "joint"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_joint_examination: {
        Args: {
          p_name: string
          p_description: string
          p_start_date: string
          p_end_date: string
          p_school_id: string
          p_staff_id: string
        }
        Returns: number
      }
      create_school_and_assign_staff: {
        Args: {
          p_name: string
          p_country: string
          p_city: string
          p_address: string
          p_postal_code: string
          p_region: string
          p_phone_number: string
          p_email: string
          p_staff_id: string
        }
        Returns: undefined
      }
      get_staff_joint_examinations: {
        Args: { p_staff_id: string }
        Returns: {
          joint_id: number
          joint_name: string
          joint_description: string
          joint_start_date: string
          joint_end_date: string
          assigned_at: string
          group_name: string
        }[]
      }
    }
    Enums: {
      gender: "MALE" | "FEMALE" | "OTHER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      gender: ["MALE", "FEMALE", "OTHER"],
    },
  },
} as const
