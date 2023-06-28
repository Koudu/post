import { getUser } from "./api/users";
import { Posts } from "./components/posts";
import { renderUser } from "./components/user";
import "./style.css";

(async () => {
  const root = document.getElementById("root");
  const loader = document.getElementById("loader");
  const userPosts = document.getElementById("user-posts");
  loader.innerHTML = `<div class="wrap"><h1>Загрузка...</h1></div>`;
  const userId = window.location.search.replace("?id=", "");
  const user = await getUser(userId);
  loader.innerHTML = ``;

  if (user && root && userPosts) {
    root.innerHTML = renderUser(user);
    const posts = Posts(userPosts, userId);
    await posts.render();
  }
})();
