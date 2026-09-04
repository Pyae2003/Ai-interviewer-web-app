"use server";

import { getSession } from "./get-Session";


export const isOwner = async (userId: string) => {
  const session = await getSession();

  return userId === session?.user.id;
};