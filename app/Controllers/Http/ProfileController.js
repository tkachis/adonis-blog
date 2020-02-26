"use strict";

const { validate } = use("Validator");
const Post = use("Post");
const User = use("User");

class ProfileController {
  async edit_page({ view, auth }) {
    const user = await auth.getUser();

    return view.render("edit-profile", {
      user
    });
  }

  async update({ request, auth }) {
    let output = { status: 0 };

    const args = request.all();
    const validationRules = {
      bio: "required|max:500|string"
    };

    const user_validation = await validate(args, validationRules);

    if (user_validation.fails()) {
      output.messages = user_validation.messages();
      return output;
    }

    try {
      const user = await auth.getUser();
      user.bio = args.bio;
      await user.save();
    } catch (err) {
      console.log(err);
      return output;
    }

    output.status = 1;
    return output;
  }

  async profile({ request, view, params }) {
    const user = await User.findBy("username", params.username);

    const current_page = parseInt(request.input("p", 1));

    const posts = await Post.query()
      .with("author")
      .with("category")
      .where("uid", user.id)
      .orderBy("id", "desc")
      .paginate(current_page, 6);

    return view.render("author", {
      user,
      posts: posts.toJSON()
    });
  }
}

module.exports = ProfileController;
