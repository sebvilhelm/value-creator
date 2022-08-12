import type { ActionFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
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
      <div className="relative">
        <input
          type="text"
          name="name"
          id="name"
          className="peer rounded-xl text-center text-8xl placeholder-transparent"
          placeholder="Enter your name"
        />
        <label
          htmlFor="name"
          className="absolute left-1/2 top-1 -translate-x-1/2 whitespace-nowrap text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-8xl"
        >
          Enter your name
        </label>
      </div>
      <button type="submit" className="sr-only">
        Set name
      </button>
    </Form>
  );
}
