import jwt from "jsonwebtoken";
import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";

export const authenticate = (handler) => async (req) => {
  const token = await getCookie("token", { req });

  if (!token) {
    req.user = null;

    return handler(req);
  }

  try {
    console.log("Токен из кук:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Декодированный токен:", decoded);
    req.user = decoded;
    return handler(req);
  } catch (error) {
    console.error("Ошибка при проверке токена:", error);
    req.user = null;
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
};
