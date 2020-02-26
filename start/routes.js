"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

/*                Templates:              */

Route.get("/", "HomeController.index");

Route.on("/submit")
  .render("submit")
  .middleware(["auth_required"]);

Route.on("/login")
  .render("auth")
  .middleware(["guest_only"]);

Route.get("/post/:id", "PostController.page").as("post");

Route.get("/admin/categories", "CategoryController.manage").middleware([
  "auth_required",
  "admin_only"
]);
Route.get("/admin/category/:id", "CategoryController.page").as("category");

Route.get("/edit-profile", "ProfileController.edit_page")
  .middleware(["auth_required"])
  .as("edit_profile");

Route.get("/admin/settings", "SettingsController.page").middleware([
  "auth_required",
  "admin_only"
]);

/*             Authentication             */
Route.post("/login", "AuthController.login");
Route.get("/logout", "AuthController.logout");

/*              Registration              */
Route.post("/register", "RegisterController.register");

/*                  Post                  */
Route.post("/submit", "PostSubmissionController.submit").middleware([
  "auth_required"
]);

/*                 Comment                */
Route.post("create-comment", "CommentController.create").middleware([
  "auth_required"
]);
Route.get("/get-comments", "CommentController.get_comments");

/*                 Category                */
Route.post("/admin/add-category", "CategoryController.add").middleware([
  "auth_required",
  "admin_only"
]);
Route.post("/admin/remove-category", "CategoryController.remove").middleware([
  "auth_required",
  "admin_only"
]);

/*                 Profile                 */
Route.post("/edit-profile", "ProfileController.update").middleware([
  "auth_required"
]);
Route.get("/author/:username", "ProfileController.profile").as("profile");

/*                 Settings                */
Route.post("/admin/settings", "SettingsController.update").middleware([
  "auth_required",
  "admin_only"
]);

/*                  Search                 */
Route.get("/search", "SearchController.search");
