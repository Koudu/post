export async function getComments(limit = 5, start = 0) {
  const respose = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_start=${start}`
  );
  const data = await respose.json();
  return data;
}

const loader = document.getElementById("comments-loader");
loader.innerHTML = `<div class="wrap"><h1>Загрузка...</h1></div>`;
if ("click") {
  getComments();
}
