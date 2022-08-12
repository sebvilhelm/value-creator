import type { LoaderFunction } from "@remix-run/cloudflare";
import { format } from "date-fns";
import { json } from "@remix-run/cloudflare";
import { useCatch, useLoaderData } from "@remix-run/react";
import { BigText, Highlight } from "~/components/value_created";
import { notFound } from "~/utils/responses.server";
import type { Value } from "~/models/values.server";
import { getValueById } from "~/models/values.server";

interface LoaderData {
  value: Value;
}
export let loader: LoaderFunction = async ({ params }) => {
  let { id } = params;

  if (typeof id !== "string") {
    throw new Error("Invalid id");
  }

  let value = await getValueById(id);

  if (value == null) {
    throw notFound();
  }

  return json<LoaderData>({ value });
};

export default function Share() {
  let { value } = useLoaderData<LoaderData>();
  return (
    <BigText>
      <Highlight>{value.name}</Highlight> created value{" "}
      <Highlight>{format(new Date(value.date), "dd-MM-yyyy HH:MM")}</Highlight>!
    </BigText>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  function getMessage() {
    if (caught.status === 404) {
      return "This value does not exist";
    } else {
      return "Something went wrong";
    }
  }

  return <BigText>{getMessage()}</BigText>;
}
