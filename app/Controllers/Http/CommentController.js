"use strict";

const Comment = use("Comment");
const { validate } = use("Validator");

class CommentController {
  async get_comments({ request }) {
    let output = { status: 0 };

    const args = request.all();
    const validationRules = {
      pid: "required",
      cid: "required"
    };

    const comment_validation = await validate(args, validationRules);

    if (comment_validation.fails()) {
      output.messages = comment_validation.messages();
      return output;
    }

    const { pid, cid } = args;

    try {
      const comments = await Comment.query()
        .where({ pid })
        .andWhere("id", ">", cid)
        .fetch();

      output.comments = comments;
    } catch (err) {
      console.log(err);
      return output;
    }

    output.status = 1;
    return output;
  }

  async create({ request, auth }) {
    let output = { status: 0 };

    const args = request.all();
    const validationRules = {
      post_id: "required",
      comment: "required|string|min:1|max:500"
    };

    const comment_validation = await validate(args, validationRules);

    if (comment_validation.fails()) {
      output.messages = comment_validation.messages();
      return output;
    }

    const { comment, post_id } = args;

    const new_comment = new Comment();
    const user = await auth.getUser();

    new_comment.pid = post_id;
    new_comment.name = user.username;
    new_comment.post_comment = comment;

    try {
      await new_comment.save();
    } catch (err) {
      console.log(err);
      return output;
    }

    output.status = 1;
    return output;
  }
}

module.exports = CommentController;
