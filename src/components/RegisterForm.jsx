"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import LoaderComponent from "./loaderComponent";
import { Button } from "./ui/button";
import Link from "next/link";
import { EmailConfirmationDialog } from "./AlertDialog";
import { validateRegisterForm } from "@/utils/validate";

const RegisterForm = ({ className, ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { push } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateRegisterForm(
      email,
      username,
      password,
      passwordTwo
    );
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при регистрации");
      }
      const data = await response.json();
      console.log(data);

      // try {
      //   const sendMessage = await fetch(
      //     "http://localhost:3000/api/sendMessage",
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         email,
      //         username,
      //       }),
      //     }
      //   );

      //   if (!sendMessage.ok) {
      //     throw new Error("Ошибка при отправке письма");
      //   }
      //   console.log("Письмо отправлено");
      // } catch (error) {
      //   console.error("Ошибка при отправке письма", error);
      // }

      setIsDialogOpen(true);
    } catch (error) {
      setError("Произошла ошибка");
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    push("/login");
  };

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Регистрация</h1>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Почта</Label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="m@example.com"
              className="dark:border-neutral-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Логин</Label>
            <Input
              name="username"
              id="username"
              type="text"
              placeholder="darkness"
              className="dark:border-neutral-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              name="password"
              id="password"
              type="password"
              className="dark:border-neutral-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password2">Подтверждение пароля</Label>
            <Input
              name="password"
              id="password2"
              type="password"
              className="dark:border-neutral-700"
              value={passwordTwo}
              onChange={(e) => setPasswordTwo(e.target.value)}
            />
          </div>
          {error && (
            <div className="text-sm text-center text-red-600">{error}</div>
          )}
          <Button type="submit" className="w-full">
            {loading ? (
              <LoaderComponent title={"Регистрируем..."} />
            ) : (
              "Зарегистрироваться"
            )}
          </Button>
        </div>
        <div className="text-center text-sm">
          У вас уже есть аккаунт?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Войти
          </Link>
        </div>
      </form>
      <EmailConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDialogClose}
      />
    </>
  );
};
export default RegisterForm;
