"use strict";

const { validate } = use("Validator");
const { get_random_str } = use("Utility");
const Helpers = use("Helpers");
const Post = use("Post");
const sanitizeHtml = require("sanitize-html");

class PostSubmissionController {
  async submit({ request, auth }) {
    let output = { status: 0 };

    const args = request.all();
    const validationRules = {
      title: "required|min:3|max:255|string",
      category: "required",
      content: "required|string"
    };

    const post_validation = await validate(args, validationRules);

    if (post_validation.fails()) {
      output.messages = post_validation.messages();
      return output;
    }

    // Upload Image
    const img = request.file("img", {
      types: ["image"],
      size: "5mb"
    });
    const img_client_name = img.clientName.split(".");
    const file_name =
      get_random_str(8) +
      "_" +
      img_client_name[0] +
      "." +
      img_client_name.pop();

    await img.move(Helpers.publicPath("uploads"), {
      name: file_name
    });

    if (!img.moved()) {
      console.log(img.error());
      console.log("Moved Error");
      return output;
    }

    const { title, category, content } = args;

    try {
      const user = await auth.getUser();
      const new_post = new Post();

      new_post.title = title;
      new_post.post_content = sanitizeHtml(content);
      new_post.img_url = "/uploads/" + file_name;
      new_post.cid = category;
      new_post.uid = user.id;

      await new_post.save();

      output.post_id = new_post.id;
    } catch (err) {
      console.log(err);
      return output;
    }

    output.status = 1;

    return output;
  }
}

module.exports = PostSubmissionController;
