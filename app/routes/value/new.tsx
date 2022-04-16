import type { ActionFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { commitSession, getSession } from "~/utils/session.server";

export let action: ActionFunction = async ({ request }) => {
  let cookie = request.headers.get("Cookie");
  let session = await getSession(cookie);

  session.set("value_created", new Date());

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
