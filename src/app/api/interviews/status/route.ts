// app/api/interview/status/route.ts

import { prisma } from "@/config";


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id")!;

  const interview = await prisma.interview.findUnique({
    where: { id },
    select: { status: true },
  });
  
  return Response.json({
    status: interview?.status,
  });
}