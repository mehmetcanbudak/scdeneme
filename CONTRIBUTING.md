# Contributing to SkyCrops Frontend

Thank you for your interest in contributing to the SkyCrops Frontend project! This document provides guidelines and information for contributors.

## 🛠️ Technology Stack

This project uses modern web technologies:

- **Framework**: Next.js 15.2.4 with App Router
- **Language**: TypeScript 5 with strict configuration
- **Styling**: Tailwind CSS 3.4.17 with custom configuration
- **UI Components**: shadcn/ui with Radix UI primitives ("new-york" style)
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts
- **Carousels**: Embla Carousel
- **State Management**: React Context and hooks
- **Performance**: React 19 with optimizations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm (preferred package manager)
- Git
- Basic knowledge of React, Next.js, and TypeScript

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/sc-fe.git`
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`
5. Start development server: `npm run dev`

### Available Scripts

This project includes several npm scripts to help with development:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality
- `npm run lint:fix` - Run ESLint and automatically fix issues
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting with Prettier
- `npm run clean` - Clean build artifacts
- `npm run clean:all` - Clean all artifacts including node_modules
- `npm run analyze` - Analyze bundle size (requires ANALYZE=true)

## 📝 Development Guidelines

### Code Style

#### General
- This project uses **EditorConfig** for consistent coding styles across different editors
- Code is formatted with **Prettier** and linted with **ESLint**
- Run `npm run format` before committing to ensure consistent formatting
- Run `npm run lint:fix` to automatically fix linting issues

#### TypeScript
- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use proper type annotations for function parameters and return values
- Avoid `any` type - use `unknown` or proper types instead

#### React Components
- Use functional components with hooks
- Prefer `React.memo` for performance optimization
- Use `useCallback` and `useMemo` appropriately
- Follow the single responsibility principle

#### File Naming
- Use kebab-case for file names: `user-profile.tsx`
- Use PascalCase for component names: `UserProfile`
- Use camelCase for variables and functions: `getUserData`

#### Import Organization
```typescript
// 1. React and Next.js imports
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// 2. Third-party libraries
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// 3. Local imports
import { UserProfile } from '@/components/user-profile'
import { useAuth } from '@/hooks/use-auth'

// 4. Type imports
import type { User } from '@/types/user'
```

### Component Structure

#### Basic Component Template
```typescript
"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface ComponentNameProps {
  className?: string
  children?: React.ReactNode
}

const ComponentName = React.memo<ComponentNameProps>(({ 
  className, 
  children 
}) => {
  return (
    <div className={cn("base-styles", className)}>
      {children}
    </div>
  )
})

ComponentName.displayName = 'ComponentName'

export default ComponentName
```

#### Page Component Template
```typescript
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title | SkyCrops',
  description: 'Page description for SEO',
}

const PageName = () => {
  return (
    <main className="min-h-screen">
      {/* Page content */}
    </main>
  )
}

export default PageName
```

### Styling Guidelines

#### Tailwind CSS
- Use Tailwind utility classes when possible
- Create custom components for complex patterns
- Use `cn()` utility for conditional classes
- Follow mobile-first responsive design

#### shadcn/ui Components
- This project uses shadcn/ui with the "new-york" style variant
- Components are configured in `components.json` with proper path aliases
- Use the established component library before creating custom components
- Follow the existing component patterns and prop interfaces

#### CSS Custom Properties
- Use CSS custom properties for theme values
- Define colors, spacing, and typography in CSS variables
- Avoid hardcoded values in components

### Performance Guidelines

#### React Optimizations
- Use `React.memo` for expensive components
- Implement `useCallback` for event handlers
- Use `useMemo` for expensive calculations
- Avoid inline object/function creation in render

#### Image Optimization
- Use Next.js Image component
- Implement proper loading strategies
- Optimize image formats and sizes
- Use appropriate alt text for accessibility

## 🔧 Development Workflow

### Branch Naming Convention
- `feature/feature-name` - New features
- `bugfix/bug-description` - Bug fixes
- `hotfix/urgent-fix` - Critical fixes
- `refactor/component-name` - Code refactoring
- `docs/documentation-update` - Documentation changes
- `memo/feature-description` - Experimental or memo branches for development notes

### Commit Message Convention
Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

#### Examples
```
feat(navigation): add mobile menu toggle

fix(auth): resolve login validation error

docs(readme): update installation instructions

refactor(components): extract reusable button component

style: format code with prettier
```

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write clean, documented code
   - Add tests if applicable
   - Update documentation

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat(component): add new feature"
   ```

4. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **PR Requirements**
   - Clear title and description
   - Link related issues
   - Include screenshots for UI changes
   - Ensure all checks pass

## 🧪 Testing

### Pre-commit Checklist
Before committing your changes, ensure:
- [ ] Run `npm run type-check` to verify TypeScript types
- [ ] Run `npm run lint` to check code quality
- [ ] Run `npm run format` to format your code
- [ ] Test your changes in the browser
- [ ] Ensure the build passes with `npm run build`

### Testing Guidelines
- Write tests for new components when applicable
- Ensure existing functionality still works after changes
- Test on multiple devices and browsers
- Test accessibility features
- Run `npm run type-check` to verify TypeScript compilation

### Testing Tools
- **Type Checking**: TypeScript compiler for static analysis
- **Linting**: ESLint for code quality
- **Manual Testing**: Browser testing for functionality
- **Build Testing**: Production build verification

*Note: Automated testing framework setup is planned for future implementation*

## ♿ Accessibility

### Accessibility Standards
- Follow WCAG 2.1 AA guidelines
- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation
- Test with screen readers

### Accessibility Checklist
- [ ] Proper heading hierarchy
- [ ] Alt text for images
- [ ] ARIA labels for interactive elements
- [ ] Keyboard navigation support
- [ ] Color contrast compliance
- [ ] Screen reader compatibility

## 📚 Documentation

### Code Documentation
- Use JSDoc comments for complex functions
- Document component props with TypeScript interfaces
- Include usage examples in component files
- Update README.md for new features

### Documentation Standards
- Clear and concise descriptions
- Include code examples
- Document breaking changes
- Keep documentation up to date

## 🚨 Code Review

### Review Process
1. All PRs require at least one review
2. Address review comments promptly
3. Request reviews from appropriate team members
4. Use PR templates for consistency

### Review Checklist
- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] Accessibility requirements met
- [ ] Performance considerations addressed
- [ ] Security implications reviewed

## 🐛 Bug Reports

### Bug Report Template
```
**Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- OS: [e.g. macOS, Windows]
- Browser: [e.g. Chrome, Safari]
- Version: [e.g. 22]

**Additional Context**
Any other context about the problem
```

## 💡 Feature Requests

### Feature Request Template
```
**Problem Statement**
Clear description of the problem this feature would solve

**Proposed Solution**
Description of the proposed solution

**Alternative Solutions**
Any alternative solutions considered

**Additional Context**
Any other context or screenshots
```

## 📞 Getting Help

### Communication Channels
- GitHub Issues for bugs and feature requests
- GitHub Discussions for questions and ideas
- Team meetings for complex discussions

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🎯 Contribution Areas

### High Priority
- Bug fixes and performance improvements
- Accessibility enhancements
- Documentation updates
- Test coverage improvements

### Medium Priority
- New UI components
- Feature enhancements
- Code refactoring
- Performance optimizations

### Low Priority
- Cosmetic changes
- Minor UI tweaks
- Additional documentation
- Developer experience improvements

## 🙏 Recognition

Contributors will be recognized in:
- Project README.md
- Release notes
- Project documentation
- Team acknowledgments

---

Thank you for contributing to SkyCrops Frontend! Your contributions help make this project better for everyone.
