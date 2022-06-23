export interface Value {
  name: string;
  date: string;
}

export async function getValueById(id: string): Promise<Value | null> {
  let value = await VALUES.get(id);

  if (value == null) {
    return null;
  }

  return JSON.parse(value);
}

export async function createValue(name: string): Promise<[string, Value]> {
  /* @ts-ignore  */
  let id = crypto.randomUUID();
  let date = new Date().toISOString();

  let value = { name, date };
  await VALUES.put(id, JSON.stringify(value));

  return [id, value];
}
