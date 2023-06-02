"use strict";

function validateImportPath(node, context) {
  const sourcePath = node.source;

  const regex = /^\.\//;

  if (sourcePath.type === "Literal") {
    if (regex.test(sourcePath.value)) {
      context.report({
        node,
        loc: sourcePath.loc,
        messageId: "noRelativePath",

        fix(fixer) {
          if (sourcePath.value) {
            return [
              fixer.replaceTextRange(
                [
                  sourcePath.loc.start.column + 1,
                  sourcePath.loc.start.column + 3,
                ],
                ""
              ),
            ];
          }
        },
      });
    }
  }
}

module.exports = {
  validateImportPath,
};
