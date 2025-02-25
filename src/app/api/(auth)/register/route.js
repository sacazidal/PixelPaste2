import pool from "@/utils/db";
import { validateRegisterForm } from "@/utils/validate";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { email, username, password } = await request.json();

  let ipAddress =
    request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip");
  if (!ipAddress) {
    ipAddress = request.socket.remoteAddress;
  }

  if (ipAddress && ipAddress.includes(",")) {
    ipAddress = ipAddress.split(",")[0].trim();
  }

  const validationError = validateRegisterForm(email, username, password);
  if (validationError) {
    return NextResponse.json(
      {
        error: validationError,
      },
      { status: 400 }
    );
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const existingUser = await client.query(
      `SELECT * FROM users WHERE email = $1 or username = $2`,
      [email, username]
    );

    if (existingUser.rows.length > 0) {
      await client.query("ROLLBACK");
      return NextResponse.json(
        { error: "Пользователь с таким email или username уже существует" },
        { status: 400 }
      );
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    await client.query(
      `INSERT INTO users (email, username, password_hash, ip_address) VALUES ($1, $2, $3, $4)`,
      [email, username, passwordHashed, ipAddress]
    );

    await client.query("COMMIT");

    return NextResponse.json(
      { message: "Регистрация успешна!" },
      { status: 200 }
    );
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
    return NextResponse.json(
      { error: "Произошла ошибка при регистрации" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
