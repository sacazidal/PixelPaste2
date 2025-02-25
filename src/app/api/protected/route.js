import pool from "@/utils/db";
import { authenticate } from "../../middleware/authenticate";
import { NextResponse } from "next/server";

export const GET = authenticate(async (req) => {
  const { userId } = req.user;

  const client = await pool.connect();
  try {
    const result = await client.query("select * from users where id = $1", [
      userId,
    ]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Пользователь не найден" },
        { status: 404 }
      );
    }

    const user = result.rows[0];

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  } finally {
    client.release();
  }
});
