export async function getPosts(limit = 10, start = 0, userId = undefined) {
  const respose = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_start=${start}${
      userId ? `&userId=${userId}` : ""
    }`
  );
  const data = await respose.json();
  return data;
}

export async function getPost(postId) {
  const respose = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const data = await respose.json();
  return data;
}
