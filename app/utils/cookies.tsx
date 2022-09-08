import { createCookie } from "@remix-run/node"; // or "@remix-run/cloudflare"

export const hasUserVisited = createCookie("has-user-visited");