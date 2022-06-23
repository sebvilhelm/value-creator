import type { LoaderFunction } from "@remix-run/cloudflare";
import { formatDistanceToNow } from "date-fns";
import { json } from "@remix-run/cloudflare";
import { useCatch, useLoaderData } from "@remix-run/react";
import { BigText, Highlight } from "~/components/value_created";
import { notFound } from "~/utils/responses.server";

interface LoaderData {
  name: string;
  date: string;
}
export let loader: LoaderFunction = async ({ params }) => {
  let { id } = params;

  if (typeof id !== "string") {
    throw new Error("Invalid id");
  }

  let value = await VALUES.get(id);

  if (value == null) {
    throw notFound();
  }

  let data: LoaderData = JSON.parse(value);

  return json<LoaderData>(data);
};

export default function Share() {
  let data = useLoaderData<LoaderData>();
  return (
    <BigText>
      <Highlight>{data.name}</Highlight> created value{" "}
      <Highlight>
        {formatDistanceToNow(new Date(data.date), {
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
