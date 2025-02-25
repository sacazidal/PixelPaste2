export const fetchUrlLogout =
  process.env.NODE_ENV === "production"
    ? "/api/logout"
    : "http://localhost:3000/api/logout";

export const fetchUrlProtected =
  process.env.NODE_ENV === "production"
    ? "/api/protected"
    : "http://localhost:3000/api/protected";

export const fetchUrlLogin =
  process.env.NODE_ENV === "production"
    ? "/api/login"
    : "http://localhost:3000/api/login";

export const fetchUrlRegister =
  process.env.NODE_ENV === "production"
    ? "/api/register"
    : "http://localhost:3000/api/register";

export const fetchUrlUpdateData =
  process.env.NODE_ENV === "production"
    ? "/api/updateData"
    : "http://localhost:3000/api/updateData";
