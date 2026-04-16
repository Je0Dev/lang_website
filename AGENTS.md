# Project Agents & Commands

## Available Agents

### opencode
- AI assistant for software engineering tasks
- Supports: file search, code editing, web searches, code context lookup
- Use for: bug fixes, new features, refactoring, code reviews

## Key Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking

# Preview
npm run preview      # Preview production build
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Route pages (Hero, Resources, Milestones, etc.)
├── context/         # React context (translations, theme)
└── data/           # Static data (if extracted)
```

## Coding Conventions

- Use TypeScript for all new code
- Follow existing Tailwind CSS patterns
- Use lucide-react for icons
- Use motion/react for animations
- All text must use translation keys (no hardcoded strings in main content)

## Adding New Features

1. Create component in `src/components/`
2. Add page route in `src/App.tsx`
3. Add translation keys in `src/context/translations.ts`
4. Update navigation in Navbar.tsx