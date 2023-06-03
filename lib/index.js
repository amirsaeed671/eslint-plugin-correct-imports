"use strict";

const noRelativePath = require("./rules/no-relative-path");
const onlyAllowGroupImport = require("./rules/group-import");
const validOrderOfImports = require("./rules/valid-order");

module.exports = {
  rules: {
    "no-relative-path": noRelativePath,
    "group-import": onlyAllowGroupImport,
    "valid-order": validOrderOfImports,
  },
  configs: {
    recommended: {
      plugins: ["correct-imports"],
      rules: {
        "correct-imports/no-relative-path": "error",
        "correct-imports/group-import": "error",
        "correct-imports/valid-order": "error",
      },
    },
  },
};
