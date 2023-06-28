export async function getComments(postId = undefined) {
  let url = "https://jsonplaceholder.typicode.com/comments";
  if (postId) {
    url = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;
  }
  const respose = await fetch(url);
  const data = await respose.json();
  return data;
}

export async function getComment(id) {
  const respose = await fetch(
    `https://jsonplaceholder.typicode.com/comments/${id}`
  );
  const data = await respose.json();
  return data;
}
