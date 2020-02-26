"use strict";

const Post = use("Post");

class SearchController {
  async search({ request, view }) {
    const search_term = request.input("q", "");
    const current_page = request.input("p", 1);

    const posts = (
      await Post.query()
        .with("author")
        .with("category")
        .where("title", "LIKE", `%${search_term}%`)
        .paginate(current_page, 6)
    ).toJSON();

    return view.render("search", {
      search_term,
      posts
    });
  }
}

module.exports = SearchController;
