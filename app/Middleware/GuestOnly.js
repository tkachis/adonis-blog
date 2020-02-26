"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class GuestOnly {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, auth }, next) {
    try {
      await auth.check();
    } catch (err) {
      await next();
      return null;
    }
    response.redirect("/");
  }
}

module.exports = GuestOnly;
