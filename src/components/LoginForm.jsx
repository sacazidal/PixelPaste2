"use client";

import Link from "next/link";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { validateLoginForm } from "@/utils/validate";
import LoaderComponent from "./loaderComponent";

const LoginForm = ({ className, ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateLoginForm(email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Ошибка авторизации");
      }
      const data = await response.json();
      console.log(data);
      push("/");
    } catch (error) {
      setError("Произошла ошибка");
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Вход</h1>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Почта</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            className="dark:border-neutral-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Пароль</Label>
            <Link
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Забыли пароль?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            className="dark:border-neutral-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <div className="text-sm text-center text-red-600">{error}</div>
        )}
        <Button type="submit" className="w-full">
          {loading ? <LoaderComponent title={"Входим..."} /> : "Войти"}
        </Button>
      </div>
      <div className="text-center text-sm">
        У вас еще нет аккаунта?{" "}
        <Link href="/register" className="underline underline-offset-4">
          Зарегистрироваться
        </Link>
      </div>
    </form>
  );
};
export default LoginForm;
