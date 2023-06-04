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

module.exports = {
  validateImportPath,
  reportUngroupImportStatements,
  getImportType,
  validateImportOrder,
};
