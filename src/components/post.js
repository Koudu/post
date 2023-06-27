export function renderPost(post) {
  return `
    <div name="post" id="post-${post.id}">
      <p># ${post.id}</p>
      <h2>${post.title}</h2>
      <h3>${post.body}</h3>
    </div>
    `;
}

export function renderPosts(posts) {
  return posts.map((post) => renderPost(post)).join("<hr />");
}
