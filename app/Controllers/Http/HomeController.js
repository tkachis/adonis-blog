"use strict";

const Post = use("Post");
const Antl = use("Antl");

class HomeController {
  async index({ request, view, antl }) {
    const current_page = parseInt(request.input("p", 1));
    const posts = await Post.query()
      .with("author", qb => {
        qb.select("id", "username");
      })
      .with("category")
      .orderBy("id", "desc")
      .paginate(current_page, 6);

    return view.render("home", {
      posts: posts.toJSON(),
      messages: {
        newer: Antl.formatMessage("messages.newer"),
        older: Antl.formatMessage("messages.older")
      }
    });
  }
}

module.exports = HomeController;
