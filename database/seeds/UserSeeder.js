"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Database = use("Database");
const User = use("User"); //start/app/alias: {User: 'App/Models/User'}

class UserSeeder {
  async run() {
    /* Create New User */
    //
    // const new_user = new User();
    // (new_user.username = "admin"),
    //   (new_user.email = "admin@email.com"),
    //   (new_user.password = "admin" + "blog");
    // await new_user.save();
    //
    /* Get User where username = "" */
    //
    // const users = await Database.table("users")
    //   .where({ username: "tkachis" })
    //   .select("username");
    //
    /* Get User where username = "" - alt */
    const users = await User.query()
      .where("username", "tkachis")
      .select("username")
      .fetch();
    console.log(users.toJSON());
  }
}

module.exports = UserSeeder;
