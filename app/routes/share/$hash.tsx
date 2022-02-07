import { formatDistanceToNow } from "date-fns";
import { json, LoaderFunction, useLoaderData } from "remix";
import { BigText, Highlight } from "~/components/value_created";

interface LoaderData {
  name: string;
  date: string;
}
export let loader: LoaderFunction = ({ request }) => {
  let url = new URL(request.url);

  return json<LoaderData>({
    name: url.searchParams.get("name") ?? "No-one",
    date: new Date(2022, 1, 1).toISOString(),
  });
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
