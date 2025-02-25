"use client";

import { fetchUrlProtected } from "@/utils/fetchUrl";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userData: null,
    isLoading: true,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(fetchUrlProtected, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Ошибка авторизации");
        }

        const data = await response.json();
        setAuthState({
          isAuthenticated: true,
          userData: data,
          isLoading: false,
        });
      } catch (error) {
        console.error(error);
        setAuthState({
          isAuthenticated: false,
          userData: null,
          isLoading: false,
        });
      }
    };

    checkAuth();
  }, []);

  return authState;
};

export default useAuth;
