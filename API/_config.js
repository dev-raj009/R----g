import crypto from "crypto";

export const USERS = [
  { userId: "2243490", token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjIyNDM0OTAiLCJlbWFpbCI6InJhaHVsdWlrZXlqaTc1MEBnbWFpbC5jb20iLCJuYW1lIjoiUmFodWwgVWlrZXkiLCJ0aW1lc3RhbXAiOjE3NzIxMjM2ODcsInRlbmFudFR5cGUiOiJ1c2VyIiwidGVuYW50TmFtZSI6InJndmlrcmFtamVldF9kYiIsInRlbmFudElkIjoiIiwiZGlzcG9zYWJsZSI6ZmFsc2V9.GD0XqFTIoyjbaPaUzURhsVZi9GI94C61FgbO9eDXFFA" },
  { userId: "", token: "" },
  { userId: "", token: "" },
  { userId: "", token: "" },
];

export const BASE_URL = "https://rgvikramjeetapi.classx.co.in";

const BASE_HEADERS = {
  accept: "*/*",
  "auth-key": "appxapi",
  "client-service": "Appx",
  source: "website",
  origin: "https://rankersgurukul.com",
  referer: "https://rankersgurukul.com/",
  "user-agent": "Mozilla/5.0"
};

export function getHeaders(userIndex = 0) {
  const user = USERS[userIndex];
  return {
    ...BASE_HEADERS,
    authorization: user.token,
    "user-id": user.userId,
  };
}

export function decrypt(enc) {
  try {
    if (!enc) return null;
    const [data, iv_b64] = enc.split(":");
    const ciphertext = Buffer.from(data, "base64");
    const iv = Buffer.from(iv_b64, "base64");
    const key = Buffer.from("638udh3829162018"); // appx ka video url decryption key 
    const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
    let decrypted = decipher.update(ciphertext);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString("utf-8");
  } catch {
    return null;
  }
}
