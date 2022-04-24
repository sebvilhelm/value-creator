import { createEventHandler } from "@remix-run/cloudflare-workers";

import * as build from "@remix-run/dev/server-build";

declare global {
  const SESSIONS: KVNamespace;
  const VALUES: KVNamespace;
}

addEventListener("fetch", createEventHandler({ build }));
