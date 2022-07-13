import type { MetaFunction, LinksFunction } from "@remix-run/cloudflare";
import type { PropsWithChildren } from "react";
import { Links, LiveReload, Meta, Outlet, Scripts } from "@remix-run/react";
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
    <Document>
      <Outlet />
    </Document>
  );
}

function Document({ children }: PropsWithChildren<unknown>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="grid h-full w-full place-content-center overflow-x-hidden overflow-y-hidden bg-gradient-radial from-slate-50 to-slate-100 px-4 dark:from-slate-800 dark:to-slate-900">
        {children}
        <Scripts />
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore  */}
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
