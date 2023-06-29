import "./comments.css";

export function renderComment(comment) {
  return `
    <div class="post-comment">
      <header>
        <div># ${comment.id}</div>
        <div>${comment.email}</div>
      </header>
      <main>
        <div>${comment.name}</div>
        <div>${comment.body}</div>
      </main>
    </div>
  `;
}
