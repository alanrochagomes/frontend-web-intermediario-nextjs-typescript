import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const data = await request.formData();
  // TODO: Implement form submission
  console.log("server", data);
  return NextResponse.json({ teste: 1 });
}
