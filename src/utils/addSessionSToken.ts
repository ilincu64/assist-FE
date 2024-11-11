export function addSessionSToken(value: string) {
  sessionStorage.setItem("token", value);
}
