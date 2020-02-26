"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");
const User = use("User");

class UsersSchema extends Schema {
  async up() {
    this.alter("users", table => {
      table.boolean("is_admin").defaultTo(false);
    });

    const user = await User.find(1);
    user.is_admin = true;
    user.save();
  }

  down() {
    this.table("users", table => {
      table.dropColumn("is_admin");
    });
  }
}

module.exports = UsersSchema;
