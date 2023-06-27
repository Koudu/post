import "./style.css";
import { renderPosts } from "./components/post";
import { getPosts } from "./api/posts";

// fetch(`https://jsonplaceholder.typicode.com/users`);

(async () => {
  const root = document.getElementById("root");
  const loader = document.getElementById("loader");
  loader.innerHTML = `<div class="wrap"><h1>Загрузка...</h1></div>`;
  let posts = await getPosts();
  if (root) {
    loader.innerHTML = `
    <div class="wrap">
       <button class="more" name="more-btn">More</button>
    </div>
  `;
    root.innerHTML = renderPosts(posts);
  }

  const body = document.querySelector("body");

  body?.addEventListener("click", async (e) => {
    const name = e.target.getAttribute("name");
    if (name === "more-btn") {
      loader.innerHTML = `<div class="wrap"><h1>Загрузка...</h1></div>`;
      const newPosts = await getPosts(10, posts.length);
      if (newPosts.length === 0) {
        loader.innerHTML = `<div class="wrap"><h1>Больше постов нет</h1></div>`;
        return;
      }
      posts = [...posts, ...newPosts];
      root.innerHTML = renderPosts(posts);
      loader.innerHTML = `
      <div class="wrap">
        <button class="more" name="more-btn">More</button>
      </div>
    `;
    }
  });
})();
