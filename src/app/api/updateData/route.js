import pool from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId, firstName, lastName, email, password, avatar } =
    await req.json();

  try {
    const result = await pool.query(
      `UPDATE users 
       SET 
         first_name = COALESCE($1, first_name), 
         last_name = COALESCE($2, last_name), 
         email = COALESCE($3, email), 
         password_hash = COALESCE($4, password_hash), 
         avatar_url = COALESCE($5, avatar_url)
       WHERE id = $6
       RETURNING *`,
      [firstName, lastName, email, password, avatar, userId]
    );
    return NextResponse.json(result.rows[0], {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Ошибка при вставке данных:", error);
    return NextResponse.json(
      { message: "Ошибка при сохранении" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
