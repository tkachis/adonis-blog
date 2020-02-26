"use strict";

const Category = use("Category");
const Post = use("Post");
const { validate } = use("Validator");

class CategoryController {
  async manage({ view }) {
    return view.render("admin/categories");
  }

  async add({ request }) {
    const output = { status: 0 };

    const args = request.all();
    const validationRules = {
      name: "required|min:1|max:80|string",
      subtitle: "required|min:1|max:80|string"
    };

    const category_validation = await validate(args, validationRules);

    if (category_validation.fails()) {
      output.messages = category_validation.messages();
      return output;
    }

    const { name, subtitle } = args;

    const new_category = new Category();
    new_category.name = name;
    new_category.subtitle = subtitle;

    try {
      await new_category.save();
    } catch (err) {
      console.log(err);
      return output;
    }

    output.status = 1;
    return output;
  }

  async remove({ request }) {
    const output = { status: 0 };

    const args = request.all();
    const validationRules = {
      id: "required"
    };

    const category_validation = await validate(args, validationRules);

    if (category_validation.fails()) {
      output.messages = category_validation.messages();
      return output;
    }

    try {
      const category = await Category.find(args.id);
      await category.delete();
    } catch (err) {
      console.log(err);
      return output;
    }

    output.status = 1;
    return output;
  }

  async page({ request, params, view }) {
    const category = await Category.find(params.id);
    const current_page = parseInt(request.input("p", 1));
    const posts = await Post.query()
      .with("author")
      .with("category")
      .where("cid", params.id)
      .orderBy("id", "desc")
      .paginate(current_page, 6);

    return view.render("category", {
      posts: posts.toJSON(),
      category: category.toJSON()
    });
  }
}

module.exports = CategoryController;
