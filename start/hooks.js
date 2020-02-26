const { hooks } = require("@adonisjs/ignitor");
const moment = require("moment");

hooks.after.providersBooted(() => {
  const View = use("View");
  const Exception = use("Exception");

  View.global("format_date", t => moment(t).format("Do MMMM YYYY"));

  View.global("stringify", obj => JSON.stringify(obj));

  Exception.handle("HttpException", async (err, { response }) => {
    response.redirect("/");
    return;
  });
});
