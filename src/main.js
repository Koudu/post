import "./style.css";
import { Posts } from "./components/posts";

(async () => {
  const root = document.getElementById("root");
  const posts = Posts(root);
  await posts.render();
})();
