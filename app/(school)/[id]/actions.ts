"use server";

import { revalidateTag } from "next/cache";

export const revalidateAction = async (id: string) => {
  revalidateTag(id);
};
