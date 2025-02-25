"use client";

import Header from "@/components/Header";
import Loader from "@/components/Loader";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const { userData, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Header />
      <h1>Добро пожаловать, {userData.username}!</h1>
    </div>
  );
}
