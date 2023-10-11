import { NextResponse } from "next/server";
import { UserModel } from "@/models/User";
import NextCors from "nextjs-cors";

export async function POST(request, res) {
  try {
    await NextCors(request, res, {
      // Options
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    const body = await request.json();
    const { name, email } = body;
    const userTest = await UserModel.createUser(email, name);
    return NextResponse.json({ userTest }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
