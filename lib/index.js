"use strict";

const onlyStringLiteralArgument = require("./rules/no-relative-path");

module.exports = {
  rules: {
    "no-relative-path": onlyStringLiteralArgument,
  },
  configs: {
    recommended: {
      plugins: ["correct-imports"],
      rules: {
        "correct-imports/no-relative-path": "error",
      },
    },
  },
};
