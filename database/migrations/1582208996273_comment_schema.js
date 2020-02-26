"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CommentSchema extends Schema {
  up() {
    this.create("comments", table => {
      table.increments();
      table.integer("pid").notNullable();
      table.string("name", 80).notNullable();
      table.text("post_comment");
      table.timestamps();
    });
  }

  down() {
    this.drop("comments");
  }
}

module.exports = CommentSchema;
