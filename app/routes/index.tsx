import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useFetcher,
  useLoaderData,
  useTransition,
} from "remix";
import { getSession, commitSession } from "~/utils/session.server";
import { formatDistanceToNow } from "date-fns";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";

export let action: ActionFunction = async ({ request }) => {
  let cookie = request.headers.get("Cookie");
  let session = await getSession(cookie);

  session.set("value_created", new Date());

  return redirect(".", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));

  return {
    valueCreated: session.get("value_created"),
  };
};

export default function Index() {
  let data = useLoaderData();

  let fetcher = useFetcher();
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (fetcher.submission && fetcher.state === "submitting") {
      triggerConfetti();
    }
  }, [fetcher.submission, fetcher.state]);

  let [, forceRender] = useState({});
  useEffect(() => {
    let interval = setInterval(() => {
      if (data.valueCreated) {
        forceRender({});
      }
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div>
      {data.valueCreated ? (
        <p className="text-2xl lg:text-4xl xl:text-5xl font-serif text-center dark:text-slate-100">
          Value created{" "}
          <span className="underline underline-offset-2 decoration-double decoration-violet-600 transition-colors hover:text-violet-900 dark:hover:text-violet-400">
            {formatDistanceToNow(new Date(data.valueCreated), {
              addSuffix: true,
            })}
          </span>
          !{" "}
          <span role="img" aria-label="rocket emoji">
            🚀
          </span>
        </p>
      ) : (
        <fetcher.Form method="post">
          <button
            className="bg-gradient-to-b from-violet-500 to-violet-700 text-violet-50 border-4 border-violet-700 text-4xl lg:text-6xl px-16 py-6 rounded shadow-md transition hover:shadow-lg active:shadow-sm active:scale-95 outline-none focus:scale-105 hover:scale-105"
            name="value"
            value="create"
          >
            Create value
          </button>
        </fetcher.Form>
      )}
    </div>
  );
}

function triggerConfetti() {
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

function fire(particleRatio: number, opts: confetti.Options = {}) {
  let count = 200;
  let defaults = {
    origin: { y: 0.7 },
  };
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}
