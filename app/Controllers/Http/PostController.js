"use strict";

const Post = use("Post");

class PostController {
  async page({ params, view }) {
    const post = await Post.find(params.id);

    await post.load("author");
    await post.load("category");

    return view.render("single-post", { post: post.toJSON() });
  }
}

module.exports = PostController;
