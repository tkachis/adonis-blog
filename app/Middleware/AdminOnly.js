"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AdminOnly {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, auth }, next) {
    const user = await auth.getUser();

    if (!user.is_admin) {
      response.redirect("/");
      return null;
    }

    await next();
  }
}

module.exports = AdminOnly;
