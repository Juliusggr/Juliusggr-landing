export async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    // The Clipboard API can be blocked; fall back to a selection copy.
  }

  try {
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.left = "-9999px";
    document.body.appendChild(field);
    field.select();
    const didCopy = document.execCommand("copy");
    field.remove();
    return didCopy;
  } catch {
    return false;
  }
}
