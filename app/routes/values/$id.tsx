import type { LoaderFunction } from "@remix-run/cloudflare";
import { formatDistanceToNow } from "date-fns";
import { json } from "@remix-run/cloudflare";
import { useCatch, useLoaderData } from "@remix-run/react";
import { BigText, Highlight } from "~/components/value_created";
import { notFound } from "~/utils/responses.server";
import { getValueById, Value } from "~/models/values.server";

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
      <Highlight>
        {formatDistanceToNow(new Date(value.date), {
          addSuffix: true,
        })}
      </Highlight>
      !
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
