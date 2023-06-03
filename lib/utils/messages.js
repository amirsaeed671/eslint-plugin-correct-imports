module.exports = {
  rules: {
    noRelativePath:
      "import source path should be a string literal with absolute path",
    adjacentImportError: "import statement must be next to '{{ pair }}'",
    validOrderError:
      "please follow this import sequence in this module '{{ order }}'",

    tests: {
      adjacentImportError: "import statement must be next to 'tests/Yup.test'",
      validOrderError:
        "please follow this import sequence in this module 'packages, Router, stores, services, libs, utils, pages, containers, components, stories, tests, assets, styles'",
    },
  },
};
