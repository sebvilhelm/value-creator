import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
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
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen w-full px-4 overflow-x-hidden overflow-y-hidden grid place-content-center bg-gradient-radial from-slate-50 to-slate-100">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
