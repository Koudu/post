export async function getUsers() {
  const respose = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const data = await respose.json();
  return data;
}

export async function getUser(id) {
  const respose = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  const data = await respose.json();
  return data;
}
