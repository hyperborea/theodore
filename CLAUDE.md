# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` - Starts Vite dev server with hot module replacement
- **Build for production**: `npm run build` - TypeScript compilation followed by Vite build
- **Run linting**: `npm run lint` - Runs ESLint on the codebase
- **Preview production build**: `npm run preview` - Preview the production build locally

## Project Architecture

This is a React + TypeScript + Vite application using modern tooling:

- **Build tool**: Vite with React plugin and Tailwind CSS integration
- **UI Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4 with DaisyUI component library
- **Linting**: ESLint with TypeScript, React Hooks, and React Refresh plugins
- **TypeScript**: Project references split between app (`tsconfig.app.json`) and node (`tsconfig.node.json`)

## Key Files and Structure

- `src/App.tsx` - Main application component (currently minimal "hello world")
- `src/main.tsx` - React application entry point with StrictMode
- `src/index.css` - Global CSS styles
- `vite.config.ts` - Vite configuration with React and Tailwind plugins
- `eslint.config.js` - ESLint configuration using new flat config format

## Technology Stack

- **React**: v19 with modern patterns
- **TypeScript**: ~5.8.3 with strict configuration
- **Vite**: v7 for fast development and building
- **Tailwind CSS**: v4 with Vite plugin integration
- **DaisyUI**: Component library for Tailwind CSS

## Development Notes

- The project uses Vite's fast refresh for React development
- ESLint is configured with recommended TypeScript and React rules
- No test framework is currently set up
- The components directory (`src/components/`) exists but is currently empty
- TypeScript configuration uses project references for better compilation performance