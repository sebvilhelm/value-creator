import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { getSession } from "~/utils/session.server";
import { formatDistanceToNow } from "date-fns";
import confetti from "canvas-confetti";
import { useEffect, useRef, useState } from "react";
import { BigText, Highlight } from "~/components/value_created";

export async function loader({ request }: LoaderArgs) {
  let session = await getSession(request.headers.get("Cookie"));

  let valueCreated = session.get("value_created");
  let valueId = session.get("value_id");

  return json({
    valueCreated: nullOrString(valueCreated),
    valueId: nullOrString(valueId),
  });
}

export default function Index() {
  let data = useLoaderData<typeof loader>();

  let fetcher = useFetcher();
  let wasTriggered = useRef(false);
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (data.valueCreated != null && !wasTriggered.current) {
      wasTriggered.current = true;
      triggerConfetti();
    }
  });

  let [formattedDate, setFormattedDate] = useState<string | null>(() => {
    if (data.valueCreated != null) {
      return formatDate(data.valueCreated);
    }
    return null;
  });
  useEffect(() => {
    let interval = setInterval(() => {
      if (data.valueCreated != null) {
        setFormattedDate(formatDate(data.valueCreated));
      }
    }, 1_000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div>
      {data.valueCreated ? (
        <BigText>
          Value created{" "}
          <Link to={`/values/${data.valueId}`}>
            <Highlight>{formattedDate}</Highlight>
          </Link>
          ! <Rocket />
        </BigText>
      ) : (
        <fetcher.Form method="post" action="/values/new">
          <button
            className="rounded border-4 border-violet-700 bg-gradient-to-b from-violet-500 to-violet-700 px-16 py-6 text-4xl text-violet-50 shadow-md outline-none transition hover:scale-105 hover:shadow-lg focus:scale-105 active:scale-95 active:shadow-sm lg:text-6xl"
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

export function Rocket() {
  return (
    <span role="img" aria-label="rocket emoji">
      🚀
    </span>
  );
}

function nullOrString(v: any): string | null {
  return typeof v === "string" ? v : null;
}

function formatDate(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), {
    addSuffix: true,
  });
}
