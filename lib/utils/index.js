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

function reportUngroupImportStatements(importNodesGroup, context) {
  for (let node_name in importNodesGroup) {
    const moduleImportNodes = importNodesGroup[node_name];

    if (moduleImportNodes.length > 1) {
      moduleImportNodes.map((impNode, idx) => {
        if (idx !== 0) {
          if (
            impNode.loc.start.line -
            moduleImportNodes[idx - 1].loc.start.line !==
            1
          ) {
            context.report({
              node: impNode,
              loc: impNode.loc,
              messageId: "adjacentImportError",
              data: {
                pair: moduleImportNodes[idx - 1].source.value,
              },
              fix: (fixer) => {
                const sourceCode = context.getSourceCode();
                const previousNodeEnd = sourceCode.getIndexFromLoc({
                  line: moduleImportNodes[idx - 1].loc.end.line,
                  column: moduleImportNodes[idx - 1].loc.end.column
                });

                const currentNodeStart = sourceCode.getIndexFromLoc({
                  line: impNode.loc.start.line,
                  column: impNode.loc.start.column
                });

                if (previousNodeEnd < currentNodeStart) {
                  return fixer.removeRange([previousNodeEnd + 1, currentNodeStart]);
                }
              }
            });
          }
        }
      });
    }
  }
}

function getImportType(importDeclarationNode) {
  const paths = [
    "Router",
    "stores/",
    "services/",
    "libs/",
    "utils/",
    "pages/",
    "containers/",
    "components/",
    "stories/",
    "tests/",
    "assets/",
    "styles/",
  ];

  const sourceValue = importDeclarationNode.source.value;

  for (let idx in paths) {
    if (sourceValue.startsWith(paths[idx])) {
      return paths[idx].slice(-1) === "/"
        ? paths[idx].slice(0, -1)
        : paths[idx];
    }
  }

  return "packages";
}

const validOrder = [
  "packages",
  "Router",
  "stores",
  "services",
  "libs",
  "utils",
  "pages",
  "containers",
  "components",
  "stories",
  "tests",
  "assets",
  "styles",
];

function validateImportOrder(importNodesGroup, context) {
  const correctOrder = context.options?.[0]?.length ? context.options[0] : validOrder;

  let sequenceNumber = 0;

  for (let basePath in importNodesGroup) {
    const orderIndex = correctOrder.findIndex((x) => x === basePath);

    if (sequenceNumber <= orderIndex) {
      sequenceNumber = orderIndex;
    } else {
      importNodesGroup[basePath].nodes.forEach((errNode) => {
        context.report({
          node: errNode,
          loc: errNode.loc,
          messageId: "correctOrder",
          data: {
            order: correctOrder.join(", "),
          },
        });
      });
    }
  }
}

function getModuleCommentValue(mName) {
  let formattedModuleName = mName;
  let firstChar = formattedModuleName.trim().charAt(0).toUpperCase();

  formattedModuleName = firstChar + formattedModuleName.slice(1);

  return formattedModuleName;
}

function validateAndAddCommentOnImport(importNodesGroup, context) {
  const allComments = [];
  let sequenceNumber = 0;
  const correctOrder = context.options?.[0]?.length ? context.options[0] : validOrder;
  const sourceCode = context.getSourceCode();
  const comments = sourceCode.ast.comments;

  comments.forEach((comNode) => {
    if (comNode.type === "Line") {
      allComments.push(comNode);
      const value = comNode.value.trim().toLowerCase();
      if (correctOrder.indexOf(value) > -1) {
        importNodesGroup[value] = { ...(importNodesGroup[value] || {}), comment: comNode };
      }
    }
  });


  for (let basePath in importNodesGroup) {
    let currNodes = importNodesGroup[basePath].nodes;
    let comment = importNodesGroup[basePath].comment;

    const orderIndex = correctOrder.findIndex((x) => x === basePath);

    if (sequenceNumber <= orderIndex) {
      sequenceNumber = orderIndex;
    } else {
      currNodes.forEach((errNode) => {
        context.report({
          node: errNode,
          loc: errNode.loc,
          messageId: "correctOrder",
          data: {
            order: correctOrder.join(", ")
          }
        });
      });
    }

    if (!comment) {
      const firstNode = currNodes[0];
      const mPath = getModuleCommentValue(basePath);

      context.report({
        node: firstNode,
        loc: firstNode.loc,
        message: `please write the comment '${mPath}' above this line`,
        fix(fixer) {
          return fixer.insertTextBefore(firstNode, `// ${mPath}\n`);
        }
      });
    }
  }
}

module.exports = {
  validateImportPath,
  reportUngroupImportStatements,
  getImportType,
  validateImportOrder,
  getModuleCommentValue,
  validateAndAddCommentOnImport
};
