import { ActionFunction, redirect } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import { commitSession, getSession } from "~/utils/session.server";

export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let name = formData.get("name");

  if (typeof name !== "string") {
    throw new Error("Name must be a string");
  }

  if (name.length === 0) {
    throw new Error("Name must not be empty");
  }

  let cookie = request.headers.get("Cookie");
  let session = await getSession(cookie);

  session.set("name", name);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function SetName() {
  return (
    <Form method="post">
      <input type="text" name="name" aria-label="Name" />
      <button type="submit" className="sr-only">
        Set name
      </button>
    </Form>
  );
}
