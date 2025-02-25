import { emailRagex, passwordRagex } from "./ragex";

export const validateLoginForm = (email, password) => {
  if (!email) {
    return "Введите почту";
  } else if (!emailRagex) {
    return "Неверный формат почты";
  }

  if (!password) {
    return "Введите пароль";
  } else if (!passwordRagex) {
    return "Пароль должен содержать минимум 8 символов, одну заглавную букву, одну строчную букву, одну цифру и один специальный символ";
  }

  return null;
};

export const validateRegisterForm = (
  email,
  username,
  password,
  passwordTwo
) => {
  if (!email) {
    return "Введите почту";
  } else if (!emailRagex) {
    return "Неверный формат почты";
  }

  if (!username) {
    return "Введите логин";
  } else if (username.length < 3) {
    return "Логин должен содержать минимум 3 символа";
  }

  if (!password) {
    return "Введите пароль";
  } else if (!passwordRagex) {
    return "Пароль должен содержать минимум 8 символов, одну заглавную букву, одну строчную букву, одну цифру и один специальный символ";
  }

  if (passwordTwo !== undefined) {
    if (!passwordTwo) {
      return "Повторите пароль";
    } else if (!passwordRagex.test(passwordTwo)) {
      return "Пароль должен содержать минимум 8 символов, одну заглавную букву, одну строчную букву, одну цифру и один специальный символ";
    }

    if (password !== passwordTwo) {
      return "Пароли не совпадают";
    }
  }

  return null;
};
