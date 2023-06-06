"use strict";

const noRelativePath = require("./rules/no-relative-path");
const onlyAllowGroupImport = require("./rules/group-import");
const validOrderOfImports = require("./rules/valid-order");
const importNameComments = require("./rules/import-name-comment");

module.exports = {
  rules: {
    "no-relative-path": noRelativePath,
    "group-import": onlyAllowGroupImport,
    "valid-order": validOrderOfImports,
    "import-name-comment": importNameComments,
  },
  configs: {
    recommended: {
      plugins: ["correct-imports"],
      rules: {
        "correct-imports/no-relative-path": "error",
        "correct-imports/group-import": "error",
        "correct-imports/valid-order": "error",
        "correct-imports/import-name-comment": "error",
      },
    },
  },
};
