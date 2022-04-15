import type { MetaFunction } from "@remix-run/cloudflare";
import { LinksFunction } from "@remix-run/cloudflare";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import tailwind from "~/styles/tailwind.css";

export const meta: MetaFunction = () => {
  return { title: "Value Creator" };
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: tailwind,
    },
  ];
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="grid h-full w-full place-content-center overflow-x-hidden overflow-y-hidden bg-gradient-radial from-slate-50 to-slate-100 px-4 dark:from-slate-800 dark:to-slate-900">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
