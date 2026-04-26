# GEMINI.md

## Project Overview

This project, `@sylonik/macos-ui`, is a React component library designed for building user interfaces that mimic the look and feel of macOS. It provides a set of customizable and reusable components, with a primary focus on a `Window` component that supports dragging, resizing, and other standard window behaviors. The library is built with TypeScript, React, and Tailwind CSS, and it uses Vite for bundling and Vitest for testing. It also includes a command-line interface (CLI) to help developers integrate components into their own projects.

## Building and Running

The following commands are used to build, run, and test the project:

*   **Build for development:**
    ```bash
    pnpm dev
    ```
*   **Build for production:**
    ```bash
    pnpm build
    ```
*   **Run tests:**
    ```bash
    pnpm test
    ```
*   **Run tests in watch mode:**
    ```bash
    pnpm test:watch
    ```
*   **Run tests with coverage:**
    ```bash
    pnpm test:coverage
    ```
*   **Lint the codebase:**
    ```bash
    pnpm lint
    ```
*   **Type-check the codebase:**
    ```bash
    pnpm type-check
    ```

## Development Conventions

The project follows standard conventions for a modern frontend project:

*   **Component-based architecture:** The UI is built using a component-based architecture, with each component encapsulated in its own directory.
*   **Styling:** The project uses Tailwind CSS for styling, with a custom preset defined in `tailwind.preset.js`.
*   **Testing:** The project uses Vitest for unit and integration testing, and Playwright for end-to-end testing. Property-based testing is also used, as indicated by the presence of `fast-check` and `.property.test.ts` files.
*   **CLI:** The project includes a CLI for adding components to a project, which simplifies the process of using the library.

## CLI Usage

The CLI can be used to add components to your project and initialize theme configuration.

*   **Install individual components:**
    ```bash
    npx macos-ui add <component-name>
    ```
*   **Initialize theme configuration:**
    ```bash
    npx macos-ui init
    ```
