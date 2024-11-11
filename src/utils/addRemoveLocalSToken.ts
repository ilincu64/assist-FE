export function addRemoveLocalSToken(isChecked: boolean, value: string) {
  if (isChecked) {
    localStorage.setItem("token", value);
  } else {
    localStorage.removeItem("token");
  }
}
