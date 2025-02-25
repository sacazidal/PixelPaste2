import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen text-center p-4`}
    >
      <h1 className="text-9xl font-bold mb-4">404</h1>
      <h2 className="text-4xl font-semibold mb-6">Страница не найдена</h2>
      <p className="text-lg mb-8 max-w-md">
        Ой! Похоже, вы заблудились в космосе. Давайте вернём вас на главную
        страницу.
      </p>
      <Link href="/">
        <Button className={``}>Вернуться на главную</Button>
      </Link>
    </div>
  );
}
