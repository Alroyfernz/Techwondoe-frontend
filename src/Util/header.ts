 export function getHeader(){const headers: HeadersInit = new Headers();
    let userToken: string | null = localStorage.getItem("Token");

  headers.set("Content-Type", "application/json");
  if (userToken) {
    headers.set("Authorization", `Bearer ${userToken}`);
  }

  return headers;}