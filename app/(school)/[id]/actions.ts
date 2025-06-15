"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export const revalidateAction = async (id: string) => {
  revalidateTag(id);
};

export const revalidateAll = async () => {
  revalidatePath("/", "layout");
};
