import { getComments } from "../api/comment";
import { renderComment } from "./comments/comments";

export function Post(post, user = "") {
  let postComments;
  let comments = [];
  const clickAction = async () => {
    if (!postComments) {
      return;
    }
    if (postComments.classList.contains("_active")) {
      postComments.classList.remove("_active");
      return;
    }
    postComments.classList.add("_active");
    postComments.innerHTML = `<div class="wrap"><h1>Загрузка...</h1></div>`;
    comments = await getComments(post.id);
    if (comments.length === 0) {
      postComments.innerHTML = `<div class="wrap"><h1>Нет комментариев</h1></div>`;
      return;
    }
    postComments.innerHTML = comments.map((c) => renderComment(c)).join("");
  };
  return {
    render: () => {
      return `
    <div class="post-container" name="post" id="post-${post.id}">
      <a href="./user.html?id=${post.userId}"><p class="post__username">${user}</p></a>
      <h2 class="post__title">${post.title}</h2>
      <h3 class="post__body">${post.body}</h3>
      <div>
        <section class="post-btns">
          <button class="comments-btn" name="comments-btn" id="comments-btn-${post.id}">Коментарии</button>
        </section>
        <section id="comments-section-${post.id}" class="post-comments"></section>
      </div>
    </div>
    `;
    },
    onRender: () => {
      const btn = document.getElementById(`comments-btn-${post.id}`);
      postComments = document.getElementById(`comments-section-${post.id}`);
      btn.addEventListener("click", clickAction);
    },
    onDelete: () => {
      const btn = document.getElementById(`comments-btn-${post.id}`);
      btn.removeEventListener("click", clickAction);
    },
  };
}

export function renderPosts(posts, users = []) {
  return posts.map((post) => {
    if (Array.isArray(users)) {
      const user = users.find((u) => u.id === post.userId);
      if (user) {
        return Post(post, user.username);
      }
    }
    return Post(post);
  });
}
