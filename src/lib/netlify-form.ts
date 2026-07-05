/** POST a client-rendered form to Netlify Forms (SSR-safe). */
export async function submitNetlifyForm(form: HTMLFormElement): Promise<void> {
  const formName = form.getAttribute("name");
  if (!formName) throw new Error("Form is missing a name attribute");

  const params = new URLSearchParams(new FormData(form) as unknown as Record<string, string>);
  if (!params.get("form-name")) params.set("form-name", formName);

  // POST to the static HTML path where Netlify registered this form at deploy time.
  const action = `/${formName}.html`;

  const res = await fetch(action, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (res.status === 404) {
    throw new Error(
      "Form not found on Netlify. Enable form detection in the Netlify dashboard and redeploy the site.",
    );
  }

  if (!res.ok) {
    throw new Error(`Form submission failed (${res.status})`);
  }

  const body = await res.text();
  if (looksLikeSsrAppShell(body)) {
    throw new Error("Submission did not reach Netlify Forms (SSR handler intercepted the request).");
  }
}

function looksLikeSsrAppShell(html: string): boolean {
  if (html.length < 500) return false;
  return (
    html.includes('id="root"') ||
    (html.includes("Samskara Nutrition") && html.includes("<!doctype html") && html.length > 8000)
  );
}
