"use strict";

const { validate } = use("Validator");

class SettingController {
  // settings -> App/Middleware/GuestOnly - получает
  // сеттингс из БД и делает его общедоступным
  async page({ view, settings }) {
    return view.render("admin/settings", {
      settings
    });
  }

  async update({ request, settings, view }) {
    let status = 0;

    const args = request.all();
    const validationRules = {
      site_name: "required|string",
      cta_url: "url"
    };

    const settings_validation = await validate(args, validationRules);

    if (settings_validation.fails()) {
      return view.render("admin/settings", {
        status,
        settings
      });
    }

    const {
      site_name,
      cta_url,
      cta_message,
      copyright_text,
      facebook_handle,
      twitter_handle,
      github_handle
    } = args;

    settings.site_name = site_name;
    settings.cta_url = cta_url;
    settings.cta_message = cta_message;
    settings.copyright_text = copyright_text;
    settings.facebook_handle = facebook_handle;
    settings.twitter_handle = twitter_handle;
    settings.github_handle = github_handle;

    try {
      settings.save();
    } catch (err) {
      console.log(err);
      return view.render("admin/settings", {
        status,
        settings
      });
    }

    status = 1;
    return view.render("admin/settings", {
      status,
      settings
    });
  }
}

module.exports = SettingController;
