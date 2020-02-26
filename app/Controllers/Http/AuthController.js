"use strict";

const { validate } = use("Validator");

class AuthController {
  async login({ request, response, auth }) {
    let output = { status: 0 };

    const args = request.all();
    const validationRules = {
      username: "required|alpha_numeric|min:5",
      password: "required|min:5"
    };

    const user_validation = await validate(args, validationRules);

    if (user_validation.fails()) {
      output.messages = user_validation.messages();
      return output;
    }

    const { username, password } = args;

    try {
      await auth.attempt(username, password + "blog");
    } catch (err) {
      console.log(err);
      return output;
    }

    output.status = 1;
    return output;
  }

  async logout({ auth, response }) {
    await auth.logout();
    response.redirect("/");
  }
}

module.exports = AuthController;
