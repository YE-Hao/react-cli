"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", {
  value: true
});
var path = require("path");
var fs = require("fs");
var parserOptions = {
  project: './tsconfig.json',
};
if (!fs.existsSync(path.join(process.env.PWD || '.', './tsconfig.json'))) {
  parserOptions = {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    /**
     * parserOptions.createDefaultProgram
     * Default .false
     * This option allows you to request that when the setting is specified,
     * files will be allowed when not included in the projects defined by the provided files.
     * Using this option will incur significant performance costs.
     * This option is primarily included for backwards-compatibility.
     * See the project section above for more information.projecttsconfig.json
     */
    createDefaultProgram: true,
  };
}

module.exports = {
  rules: {
    "semi": [
      "warn",
      "always",
      {
        "omitLastInOneLineBlock": true
      }
    ],
  }
};
