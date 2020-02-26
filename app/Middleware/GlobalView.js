"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Category = use("Category");
const Setting = use("Setting");

class GlobalView {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle(ctx, next) {
    ctx.settings = await Setting.find(1);

    const categories = await Category.all();

    ctx.view.share({
      categories: categories.toJSON(),
      settings: ctx.settings
    });

    await next();
  }
}

module.exports = GlobalView;
