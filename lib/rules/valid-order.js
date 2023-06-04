"use strict";

const { getImportType, validateImportOrder } = require("../utils");
const messages = require("../utils/messages");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Enforce consistent order of import statements",
      category: "Best Practices",
      recommended: true,
    },
    messages: {
      correctOrder: messages.rules.validOrderError,
    },
    fixable: false,
    schema: [
      {
        type: "object",
        properties: {
          order: {
            type: "array",
            items: {
              type: "string",
            },
            additionalItems: false,
          },
        },
      },
    ],
  },

  create(context) {
    const importNodesGroup = {};
    let importIndex = 0;

    return {
      ImportDeclaration(node) {
        const importType = getImportType(node);

        if (importNodesGroup[importType]) {
          importNodesGroup[importType].nodes.push(node);
        } else {
          importNodesGroup[importType] = {
            index: importIndex,
            nodes: [node],
          };
          importIndex++;
        }
      },
      "Program:exit": () => validateImportOrder(importNodesGroup, context),
    };
  },
};
