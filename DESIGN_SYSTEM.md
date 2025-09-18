git # SkyCrops Design System

This document outlines the standardized design system for SkyCrops frontend application to ensure consistency across all pages.

## **Design Principles**

### 1. **Clean & Minimal**
- White backgrounds (`bg-white`)
- Subtle shadows (`shadow-sm`)
- Clean borders (`border-gray-100`)

### 2. **Consistent Typography**
- Page titles: `text-4xl md:text-5xl font-light text-gray-800`
- Section titles: `text-2xl font-medium text-gray-700`
- Body text: `text-gray-600`
- Consistent line height: `leading-relaxed`

### 3. **Standard Spacing**
- Section padding: `py-12 px-6`
- Card padding: `p-8`
- Container max-width: `max-w-6xl mx-auto`

### 4. **Consistent Colors**
- Primary: `blue-600` / `blue-700` (Water/Technology/Trust theme)
- Secondary: `green-600` (Nature/Agriculture)
- Accent: `yellow-600` (Sun/Energy)
- Text: `gray-800` (headers) / `gray-700` (subheaders) / `gray-600` (body)
- Borders: `gray-100` / `gray-200`

## **Layout Components**

### **PageHeader**
```tsx
<PageHeader 
  title="Page Title"
  subtitle="Optional subtitle"
/>
```

### **Section**
```tsx
<Section className="bg-gray-50"> // Optional background
  {children}
</Section>
```

### **ContentCard**
```tsx
<ContentCard>
  {content}
</ContentCard>
```

### **Grid**
```tsx
<Grid cols={2|3|4}>
  {items}
</Grid>
```

### **FeatureCard**
```tsx
<FeatureCard
  icon={<Icon />}
  title="Feature Title"
  description="Feature description"
  features={["Feature 1", "Feature 2"]}
/>
```

## **Color Palette**

### **Primary Colors**
- `blue-600`: #2563eb (Primary actions, trust theme)
- `blue-700`: #1d4ed8 (Hover states)
- `blue-50`: #eff6ff (Light backgrounds)

### **Gray Scale**
- `gray-800`: #1f2937 (Main headings)
- `gray-700`: #374151 (Subheadings)
- `gray-600`: #4b5563 (Body text)
- `gray-100`: #f3f4f6 (Borders)
- `gray-50`: #f9fafb (Subtle backgrounds)

### **Secondary Colors**
- `green-600`: #16a34a (Nature, agriculture)
- `yellow-600`: #ca8a04 (Sun, energy, ratings)
- `blue-200`: #bfdbfe (Borders for blue sections)

## **Typography Scale**

### **Headings**
- H1 (Page Title): `text-4xl md:text-5xl font-light`
- H2 (Section Title): `text-2xl font-medium`
- H3 (Card Title): `text-xl font-medium`

### **Body Text**
- Large: `text-lg`
- Regular: `text-base`
- Small: `text-sm`

## **Spacing System**

### **Sections**
- Vertical padding: `py-12`
- Horizontal padding: `px-6`

### **Cards**
- Standard padding: `p-8`
- Small cards: `p-6`

### **Grids**
- Standard gap: `gap-8`
- Large gap: `gap-12`

## **Button Styles**

### **Primary Button**
```tsx
<Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-300">
```

### **Secondary Button**
```tsx
<Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
```

## **Card Styles**

### **Standard Card**
```tsx
className="bg-white p-8 rounded-lg shadow-sm border border-gray-100"
```

### **Feature Card with Hover**
```tsx
className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
```

## **Background Patterns**

### **Alternating Sections**
- White sections: `bg-white`
- Light gray sections: `bg-gray-50`

### **Special Sections**
- CTA sections can use colored backgrounds with white text
- Keep hero sections with image/video backgrounds

## **Component Usage Guidelines**

1. **Always use standardized components** from `/components/ui/page-layout.tsx`
2. **Follow the color palette** - no custom colors
3. **Use consistent spacing** - stick to the spacing system
4. **Maintain typography hierarchy** - follow the type scale
5. **Keep it simple** - avoid heavy effects like glassmorphism
6. **Ensure accessibility** - proper contrast and semantic HTML

## **DO NOT Use**

❌ **Glassmorphism effects**: `backdrop-blur-*`, `bg-white/30`
❌ **Complex gradients**: `bg-gradient-to-br from-* via-* to-*`
❌ **Heavy shadows**: `shadow-2xl`
❌ **Complex rounded corners**: `rounded-3xl`
❌ **Transparency overlays**: Complex opacity layers

## **Examples**

### ✅ **Good Practice**
```tsx
<Section className="bg-gray-50">
  <SectionHeader 
    title="Our Services"
    subtitle="What we offer"
  />
  <Grid cols={3}>
    <FeatureCard 
      icon={<Icon />}
      title="Service Name"
      description="Clean description"
    />
  </Grid>
</Section>
```

### ❌ **Avoid**
```tsx
<section className="py-20 px-6 bg-gradient-to-br from-orange-100 via-green-50 to-blue-50 relative overflow-hidden">
  <div className="backdrop-blur-md bg-white/30 rounded-3xl p-12 border border-white/20 shadow-2xl">
    {/* Complex glassmorphism effects */}
  </div>
</section>
```

This design system ensures consistency, maintainability, and a professional appearance across all pages.