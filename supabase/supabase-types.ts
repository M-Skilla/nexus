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
          from: number | null
          id: number
          joint: number
          to: number | null
        }
        Insert: {
          created_at?: string
          from?: number | null
          id?: number
          joint: number
          to?: number | null
        }
        Update: {
          created_at?: string
          from?: number | null
          id?: number
          joint?: number
          to?: number | null
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
            foreignKeyName: "invitation_joint_fkey"
            columns: ["joint"]
            isOneToOne: false
            referencedRelation: "joint"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invitation_to_fkey"
            columns: ["to"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      joint: {
        Row: {
          created_at: string
          description: string | null
          end_date: string
          id: number
          name: string
          start_date: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date: string
          id?: number
          name: string
          start_date: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string
          id?: number
          name?: string
          start_date?: string
        }
        Relationships: []
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
          gender: string
          group: number | null
          id: number
          image_url: string | null
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          gender: string
          group?: number | null
          id?: number
          image_url?: string | null
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          gender?: string
          group?: number | null
          id?: number
          image_url?: string | null
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_group_fkey"
            columns: ["group"]
            isOneToOne: false
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_joints: {
        Row: {
          created_at: string
          group: Database["public"]["Enums"]["GROUPS"]
          id: number
          joint: number
          staff: number
        }
        Insert: {
          created_at?: string
          group?: Database["public"]["Enums"]["GROUPS"]
          id?: number
          joint: number
          staff: number
        }
        Update: {
          created_at?: string
          group?: Database["public"]["Enums"]["GROUPS"]
          id?: number
          joint?: number
          staff?: number
        }
        Relationships: [
          {
            foreignKeyName: "staff_joints_joint_fkey"
            columns: ["joint"]
            isOneToOne: false
            referencedRelation: "joint"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_joints_staff_fkey"
            columns: ["staff"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_school: {
        Row: {
          created_at: string
          group: Database["public"]["Enums"]["GROUPS"] | null
          id: number
          school: string
          staff: number
          subject: number | null
        }
        Insert: {
          created_at?: string
          group?: Database["public"]["Enums"]["GROUPS"] | null
          id?: number
          school: string
          staff: number
          subject?: number | null
        }
        Update: {
          created_at?: string
          group?: Database["public"]["Enums"]["GROUPS"] | null
          id?: number
          school?: string
          staff?: number
          subject?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_school_school_fkey"
            columns: ["school"]
            isOneToOne: false
            referencedRelation: "school"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_school_staff_fkey"
            columns: ["staff"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_school_subject_fkey"
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
      students: {
        Row: {
          created_at: string
          first_name: string
          gender: string
          id: string
          image_url: string
          last_name: string
          middle_name: string
          stream: number
        }
        Insert: {
          created_at?: string
          first_name: string
          gender: string
          id?: string
          image_url: string
          last_name: string
          middle_name: string
          stream: number
        }
        Update: {
          created_at?: string
          first_name?: string
          gender?: string
          id?: string
          image_url?: string
          last_name?: string
          middle_name?: string
          stream?: number
        }
        Relationships: [
          {
            foreignKeyName: "students_stream_fkey"
            columns: ["stream"]
            isOneToOne: false
            referencedRelation: "stream"
            referencedColumns: ["id"]
          },
        ]
      }
      subject: {
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
            foreignKeyName: "subject_joint_fkey"
            columns: ["joint"]
            isOneToOne: false
            referencedRelation: "joint"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subject_school_fkey"
            columns: ["school"]
            isOneToOne: false
            referencedRelation: "school"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_by_user_and_school: {
        Args: { school_id: string }
        Returns: {
          id: number
          created_at: string
          name: string
          description: string
          start_date: string
          end_date: string
        }[]
      }
      get_current_staff_user: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          created_at: string
          name: string
          gender: string
          group: number
          image_url: string
          user_id: string
        }[]
      }
      get_joint_fields_by_user: {
        Args: { school_id: string }
        Returns: {
          id: number
          created_at: string
          name: string
          description: string
          start_date: string
          end_date: string
        }[]
      }
      get_staff_schools: {
        Args: Record<PropertyKey, never>
        Returns: {
          school_id: string
          name: string
          country: string
          city: string
          address: string
          principal: string
          postal_code: string
          region: string
          phone_number: string
          email: string
          created_at: string
        }[]
      }
      insert_school_and_staff_school: {
        Args: {
          school_name: string
          country: string
          city: string
          address: string
          postal_code: string
          region: string
          phone_number: string
          email: string
        }
        Returns: {
          created_at: string
          group: Database["public"]["Enums"]["GROUPS"] | null
          id: number
          school: string
          staff: number
          subject: number | null
        }
      }
    }
    Enums: {
      GROUPS: "PRINCIPAL" | "ACADEMIC" | "TEACHER"
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
      GROUPS: ["PRINCIPAL", "ACADEMIC", "TEACHER"],
    },
  },
} as const
