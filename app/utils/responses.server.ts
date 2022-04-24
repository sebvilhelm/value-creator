export function notFound(body = "Not found") {
  return new Response(body, { status: 404 });
}
