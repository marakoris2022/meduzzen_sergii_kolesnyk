"use server";

import { cookies } from "next/headers";

const COOKIE_NAME = "localeLanguage";

export async function getUserLocale() {
  return cookies().get(COOKIE_NAME)?.value || "en";
}

export async function setUserLocale(locale: string) {
  cookies().set(COOKIE_NAME, locale);
}
