import { getUsers } from "../api/users";
import { getPosts } from "../api/posts";
import { renderPosts } from "./post";

export function Posts(rootEl, userId = undefined) {
  return {
    render: async () => {
      rootEl.innerHTML = `
      <div id="posts-root"></div>
      <div id="posts-loader"></div>
    `;

      const root = document.getElementById("posts-root");
      const loader = document.getElementById("posts-loader");
      loader.innerHTML = `<div class="wrap"><h1>Загрузка...</h1></div>`;
      let users = [];
      let posts = [];
      let postElements = [];
      if (!userId) {
        users = await getUsers();
        posts = await getPosts();
      } else {
        posts = await getPosts(10, 0, userId);
      }
      if (root) {
        loader.innerHTML = `
        <div class="wrap">
           <button class="more" name="more-btn">More</button>
        </div>
      `;
        postElements = renderPosts(posts, users);
        root.innerHTML = postElements
          .map((p) => p.render())
          .join(`<hr class="content-sepparator">`);
        postElements.forEach((p) => p.onRender());
      }

      rootEl.addEventListener("click", async (e) => {
        const name = e.target.getAttribute("name");
        if (name === "more-btn") {
          loader.innerHTML = `<div class="wrap"><h1>Загрузка...</h1></div>`;
          const newPosts = await getPosts(10, posts.length, userId);
          if (newPosts.length === 0) {
            loader.innerHTML = `<div class="wrap"><h1>Больше постов нет</h1></div>`;
            return;
          }

          postElements.forEach((p) => p.onDelete());
          posts = [...posts, ...newPosts];
          postElements = renderPosts(posts, users);

          root.innerHTML = postElements
            .map((p) => p.render())
            .join(`<hr class="content-sepparator">`);

          postElements.forEach((p) => p.onRender());

          loader.innerHTML = `
          <div class="wrap">
            <button class="more" name="more-btn">More</button>
          </div>
        `;
        }
        // const name = e.target.getAttribute("name");
        // if (name === "button-name" && btn-username) {
        //   if (btn-username?.classList.contains(inactive)) {
        //     document.querySelectorAll(".btn-username").forEach((el) => {
        //       el.classList.remove("btn-username");
        //       el.classList.add("btn-username");
        //       return;
        //     });
        //   }
        // }
        // if (name === "button-name-post" && btn-name-post) {
        //   if (btn-name-post?.classList.contains(inactive)) {
        //     document.querySelectorAll(".btn-name-post").forEach((el) => {
        //       el.classList.remove("btn-name-post");
        //       el.classList.add("btn-name-post");
        //       return;
        //     });
        //   }
        // }
        // if (name === "button-post" && btn-post) {
        //   if (btn-post?.classList.contains(inactive)) {
        //     document.querySelectorAll(".btn-post").forEach((el) => {
        //       el.classList.remove("btn-post");
        //       el.classList.add("btn-post");
        //       return;
        //     });
        //   }
        // }
      });
    },
  };
}
