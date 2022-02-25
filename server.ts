import { createEventHandler } from "@remix-run/cloudflare-workers";

import * as build from "@remix-run/dev/server-build";

declare global {
  const VALUE_CREATION: KVNamespace;
}

addEventListener("fetch", createEventHandler({ build }));
