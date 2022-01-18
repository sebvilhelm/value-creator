import { createEventHandler } from "@remix-run/cloudflare-workers";

import * as build from "../build";

declare global {
  const VALUE_CREATION: KVNamespace;
}

addEventListener("fetch", createEventHandler({ build }));
