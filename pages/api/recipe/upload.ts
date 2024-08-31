import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export default async function handler(request: Request) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  const url = new URL(request.url);
  const title = url.searchParams.get("title");

  if (!file || !title) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join(process.cwd(), "public", title);
  await writeFile(path, buffer);

  return NextResponse.json({ path: join });
}
