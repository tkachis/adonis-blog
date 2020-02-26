"use strict";

const { validate } = use("Validator");
const User = use("User");

class RegisterController {
  async register({ request, response, auth }) {
    let output = { status: 0 };

    const args = request.all();
    const validationRules = {
      email: "required|email",
      username: "required|alpha_numeric|min:5",
      password: "required|min:5",
      re_password: "required|min:5|same:password"
    };

    const user_validation = await validate(args, validationRules);

    if (user_validation.fails()) {
      output.messages = user_validation.messages();
      return output;
    }

    const { username, email, password } = args;

    const new_user = new User();

    new_user.username = username;
    new_user.email = email;
    new_user.password = password + "blog";

    try {
      await new_user.save();
    } catch (err) {
      console.log(err);
      return output;
    }

    await auth.loginViaId(new_user.id);

    output.status = 1;
    return output;
  }
}

module.exports = RegisterController;
