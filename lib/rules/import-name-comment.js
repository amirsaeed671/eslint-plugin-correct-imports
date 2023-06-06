"use strict";

const {
    getImportType,
    validateAndAddCommentOnImport
} = require("../utils");
const messages = require("../utils/messages");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Enforce comment on top of import group",
            category: "Best Practices",
            recommended: true,
        },
        messages: {
            adjacentImportError: messages.rules.adjacentImportError,
        },
        fixable: 'code',
    },

    create(context) {
        const importNodesGroup = {};
        let importIndex = 0;


        return {
            onCodePathEnd: () => {
                validateAndAddCommentOnImport(importNodesGroup, context)
            },

            ImportDeclaration(node) {
                const importType = getImportType(node);

                if (importNodesGroup[importType]) {
                    if (importNodesGroup[importType].nodes) {
                        importNodesGroup[importType].nodes.push(node);
                    } else {
                        importNodesGroup[importType] = {
                            index: importIndex,
                            nodes: [node],
                            comment: (importNodesGroup[importType] || {}).comment
                        };
                        importIndex++;
                    }
                } else {
                    importNodesGroup[importType] = {
                        index: importIndex,
                        nodes: [node],
                        comment: (importNodesGroup[importType] || {}).comment
                    };
                    importIndex++;
                }
            }
        };
    }

}
