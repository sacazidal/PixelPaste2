import { deleteCookie } from "cookies-next";
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Выход выполнен" });
  deleteCookie("token", { res: response });

  return response;
}
