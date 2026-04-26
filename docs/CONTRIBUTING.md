# Contributing to macOS UI

First off, thank you for considering contributing to macOS UI! It's people like you that make this project great.

## Where to Start

- **Bug Reports:** If you find a bug, please open an issue. Include a clear title, a description of the issue, and a code sample or a link to a repository that reproduces the bug.
- **Feature Requests:** We are always open to new ideas! Open an issue to discuss your feature request.
- **Pull Requests:** If you want to contribute code, please open a pull request.

## Developing

To get started with development, you'll need to have [pnpm](https://pnpm.io/) installed.

1.  Fork the repository and clone it to your local machine.
2.  Run `pnpm install` to install the dependencies.
3.  Run `pnpm dev` to start the development server.

## Creating a New Component

To create a new component, you can use the `generate` script:

```bash
pnpm generate
```

This will prompt you for the component name and create the necessary files in the `src/components` directory.

## Pull Request Process

1.  Ensure that your code lints (`pnpm lint`).
2.  Make sure all tests pass (`pnpm test`).
3.  Update the documentation if you've added or changed a component's API.
4.  Open a pull request with a clear title and description of your changes.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).
