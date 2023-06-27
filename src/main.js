import "./style.css";
import { renderPosts, renderPost } from "./components/post";
import { getPosts, getPost } from "./api/posts";

const root = document.getElementById("root");
root.innerHTML = `<h1>Загрузка...</h1>`
const posts = await getPosts();
if (root) {
  root.innerHTML = renderPosts(posts);
}

