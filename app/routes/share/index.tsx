import { LoaderFunction, redirect } from "@remix-run/cloudflare";

export let loader: LoaderFunction = () => {
  return redirect("/");
};
