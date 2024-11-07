import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token: string): boolean {
  try {
    const decoded: { exp: number } = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      return true;
    }

    return false;
  } catch {
    return true;
  }
}
