# Typography System

Comprehensive typography system for SkyCrops application using Montserrat font family.

## Font Family

**Primary Font**: Montserrat
**Weights Available**: 300, 400, 500, 600, 700, 800
**Fallback**: system-ui, sans-serif

## Components

### Typography Component

For headings and display text.

```tsx
import { Typography } from "@/components/ui/typography";

// Display variants (Hero/Marketing)
<Typography variant="display-1">Largest Display Text</Typography>
<Typography variant="display-2">Large Display Text</Typography>

// Heading variants
<Typography variant="h1">Page Title</Typography>
<Typography variant="h2">Section Title</Typography>
<Typography variant="h3">Subsection Title</Typography>
<Typography variant="h4">Component Title</Typography>
<Typography variant="h5">Small Heading</Typography>
<Typography variant="h6">Smallest Heading</Typography>

// Custom element
<Typography variant="h1" as="div">Non-semantic heading</Typography>
```

### Text Component

For body content, labels, captions, and UI text.

```tsx
import { Text } from "@/components/ui/text";

// Body text variants
<Text variant="body-xl">Extra large body text</Text>
<Text variant="body-lg">Large body text</Text>
<Text variant="body">Standard body text</Text>
<Text variant="body-sm">Small body text</Text>

// UI variants
<Text variant="label">Form Label</Text>
<Text variant="caption">Small caption or helper text</Text>
<Text variant="overline">OVERLINE TEXT</Text>

// Link variants
<Text variant="link" as="a" href="/about">Standard Link</Text>
<Text variant="link-sm" as="a" href="/help">Small Link</Text>
<Text variant="link-subtle" as="a" href="/info">Subtle Link</Text>
```

## Typography Scale

### Display Text (Marketing/Hero)

| Variant | Size (Mobile → Desktop) | Line Height | Weight | Letter Spacing |
|---------|------------------------|-------------|--------|----------------|
| display-1 | 48px → 72px | 1.1 | 800 (Extrabold) | -0.02em |
| display-2 | 40px → 60px | 1.15 | 700 (Bold) | -0.015em |

### Headings

| Variant | Size (Mobile → Desktop) | Line Height | Weight | Letter Spacing |
|---------|------------------------|-------------|--------|----------------|
| h1 | 32px → 48px | 1.2 | 700 (Bold) | -0.02em |
| h2 | 28px → 36px | 1.25 | 700 (Bold) | -0.01em |
| h3 | 24px → 30px | 1.3 | 600 (Semibold) | normal |
| h4 | 20px → 24px | 1.35 | 600 (Semibold) | normal |
| h5 | 18px → 20px | 1.4 | 600 (Semibold) | normal |
| h6 | 18px | 1.45 | 600 (Semibold) | normal |

### Body Text

| Variant | Size | Line Height | Weight |
|---------|------|-------------|--------|
| body-xl | 20px | 1.6 | 400 (Regular) |
| body-lg | 18px | 1.6 | 400 (Regular) |
| body | 16px | 1.5 | 400 (Regular) |
| body-sm | 14px | 1.5 | 400 (Regular) |

### UI Elements

| Variant | Size | Line Height | Weight | Special |
|---------|------|-------------|--------|---------|
| button | 16px | 1.0 | 600 (Semibold) | 0.025em tracking |
| button-sm | 14px | 1.0 | 600 (Semibold) | 0.025em tracking |
| button-lg | 18px | 1.0 | 600 (Semibold) | 0.025em tracking |
| label | 14px | 1.4 | 500 (Medium) | - |
| caption | 12px | 1.4 | 400 (Regular) | - |
| overline | 12px | 1.0 | 600 (Semibold) | 0.1em tracking, UPPERCASE |

## Direct Tailwind Usage

### Font Size Classes

```tsx
// Responsive typography
<h1 className="text-h1">Responsive H1</h1>
<h2 className="text-h2">Responsive H2</h2>
<div className="text-display-1">Responsive Display</div>

// Fixed sizes
<p className="text-base">Base 16px</p>
<p className="text-lg">Large 18px</p>
<p className="text-xl">XL 20px</p>
<p className="text-2xl">2XL 24px</p>
<p className="text-3xl">3XL 30px</p>
<p className="text-4xl">4XL 36px</p>
<p className="text-5xl">5XL 48px</p>
```

### Font Weight Classes

```tsx
<p className="font-light">300 - Light</p>
<p className="font-normal">400 - Regular</p>
<p className="font-medium">500 - Medium</p>
<p className="font-semibold">600 - Semibold</p>
<p className="font-bold">700 - Bold</p>
<p className="font-extrabold">800 - Extrabold</p>
```

### Letter Spacing Classes

```tsx
<p className="tracking-tighter">-0.05em</p>
<p className="tracking-tight">-0.025em</p>
<p className="tracking-normal">0</p>
<p className="tracking-wide">0.025em</p>
<p className="tracking-wider">0.05em</p>
<p className="tracking-widest">0.1em</p>
```

## Usage Guidelines

### 1. **Hierarchy**

- Use **display-1/display-2** for hero sections and landing pages
- Use **h1** for page titles (one per page)
- Use **h2** for major sections
- Use **h3-h6** for subsections and components
- Use **body** variants for paragraphs and content

### 2. **Consistency**

- Stick to the predefined variants
- Use components (`<Typography>`, `<Text>`) for consistency
- Avoid custom font sizes unless absolutely necessary

### 3. **Accessibility**

- Maintain proper heading hierarchy (don't skip levels)
- Use semantic HTML elements
- Ensure sufficient color contrast (minimum 4.5:1 for body text)
- Use `rem` units for better accessibility (built into system)

### 4. **Responsive Design**

- Display and heading variants automatically scale on mobile
- Test typography on all breakpoints
- Consider line length (45-75 characters optimal)

### 5. **Color**

- Default text color: `text-black`
- For muted text: `text-black/80` or `text-black/60`
- Always ensure proper contrast with background

## Common Patterns

### Hero Section

```tsx
<div className="text-center">
  <Typography variant="display-1" className="mb-4">
    Welcome to SkyCrops
  </Typography>
  <Text variant="body-lg" className="text-black/80">
    Fresh greens delivered to your door
  </Text>
</div>
```

### Content Section

```tsx
<article>
  <Typography variant="h2" className="mb-4">
    Section Title
  </Typography>
  <Text variant="body" className="mb-6">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Text>
  <Typography variant="h3" className="mb-3">
    Subsection
  </Typography>
  <Text variant="body">
    More content here...
  </Text>
</article>
```

### Form Field

```tsx
<div>
  <Text variant="label" as="label" htmlFor="email" className="mb-2 block">
    Email Address
  </Text>
  <input id="email" type="email" />
  <Text variant="caption" className="mt-1 text-black/60">
    We'll never share your email
  </Text>
</div>
```

### Card Component

```tsx
<div className="card">
  <Typography variant="h4" className="mb-2">
    Card Title
  </Typography>
  <Text variant="body-sm" className="mb-4 text-black/70">
    Card description text
  </Text>
  <Text variant="link" as="a" href="/learn-more">
    Learn More →
  </Text>
</div>
```

## Migration Guide

### Before (Inconsistent)

```tsx
// ❌ Old way - inconsistent sizing and weights
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Title</h1>
<p className="text-lg leading-relaxed">Body text</p>
<span className="text-sm text-gray-600">Caption</span>
```

### After (Systematic)

```tsx
// ✅ New way - using typography system
<Typography variant="h1">Title</Typography>
<Text variant="body-lg">Body text</Text>
<Text variant="caption" className="text-black/60">Caption</Text>
```

## Performance Notes

- Montserrat font is loaded with `display: swap` for optimal performance
- Font weights 300-800 are preloaded
- Uses system font as fallback
- Font subsetting for Latin characters only
- Kerning and ligatures enabled for better readability

## Customization

To add new variants, update:

1. **tailwind.config.ts** - Add new font sizes
2. **lib/typography-config.ts** - Add configuration
3. **components/ui/typography.tsx** or **text.tsx** - Add variant classes
4. **globals.css** - Add base styles if needed
5. **TYPOGRAPHY.md** - Document the new variant

---

**Last Updated**: 2025
**Font Version**: Montserrat (Google Fonts)
**System Version**: 1.0
