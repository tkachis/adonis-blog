"use strict";

/*
|--------------------------------------------------------------------------
| SettingSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Setting = use("Setting");

class SettingSeeder {
  async run() {
    const new_setting = new Setting();

    new_setting.site_name = "Blog";
    new_setting.cta_message = "Check this out!";
    new_setting.cta_url = "http://google.com/";
    new_setting.copyright_text = "Copyrights &copy; 2018 All Rights Reserved";

    try {
      await new_setting.save();
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = SettingSeeder;
