"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Post extends Model {
  static get table() {
    return "posts";
  }

  author() {
    // post.uid = user.id
    return this.hasOne("User", "uid", "id");
  }

  category() {
    return this.hasOne("Category", "cid", "id");
  }
}

module.exports = Post;
