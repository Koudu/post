export function Post(post, user = "") {
  const clickAction = (e) => {
    console.log("click", post.id);
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
      const postComments = document.getElementById(
        `comments-section-${post.id}`
      );
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
