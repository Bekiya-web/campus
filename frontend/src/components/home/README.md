# Home Page Components

This folder contains all the components for the Home page, organized by functionality for better maintainability and easier debugging.

## 📁 File Structure

```
src/components/home/
├── index.ts                    # Central export file for all components
├── CarouselArrow.tsx          # Reusable carousel navigation arrow component
├── UniLogo.tsx                # University logo avatar component
├── HeroSection.tsx            # Hero section with CTA and live activity
├── FeaturesSection.tsx        # Platform features carousel
├── HowItWorksSection.tsx      # 3-step guide section
├── UniversitiesSection.tsx    # Featured & all universities carousels
├── ProjectsSection.tsx        # Projects & community section
└── Footer.tsx                 # Footer with links and CTA
```

## 🎯 Component Responsibilities

### **CarouselArrow.tsx**
- Reusable navigation arrow for all carousels
- Professional multi-layer design with glow effects
- Supports disabled state
- Props: `direction`, `onClick`, `disabled`, `className`, `ariaLabel`

### **UniLogo.tsx**
- Displays university logo or fallback avatar
- Three sizes: `sm`, `md`, `lg`
- Gradient background with abbreviation
- Props: `abbr`, `color`, `size`

### **HeroSection.tsx**
- Main hero section with headline and CTA buttons
- Live student activity card
- Platform statistics display
- Responsive design for mobile and desktop

### **FeaturesSection.tsx**
- 6 platform features in carousel (mobile) or grid (desktop)
- Horizontal scrolling with navigation arrows
- Icon-based feature cards
- Smooth animations

### **HowItWorksSection.tsx**
- 3-step onboarding guide
- Numbered step cards
- Carousel on mobile, grid on desktop
- Navigation arrows for mobile

### **UniversitiesSection.tsx**
- **Featured Universities**: Centered carousel with pagination dots
- **All Universities**: Horizontal scroll grid
- Logo-based cards with hover effects
- Counter display (e.g., "1 / 8")
- Click to filter materials by university

### **ProjectsSection.tsx**
- 3 project cards: Student Chat, AI Assistant, Campus Projects
- Horizontal carousel on mobile
- Grid layout on desktop
- CTA buttons for each project

### **Footer.tsx**
- Product, Account, and Projects links
- Social media links
- CTA card for registration
- Copyright and branding

## 🔧 Usage

Import components individually or use the barrel export:

```tsx
// Individual import
import { HeroSection } from '@/components/home/HeroSection';

// Barrel import (recommended)
import { 
  HeroSection, 
  FeaturesSection, 
  UniversitiesSection 
} from '@/components/home';
```

## 📱 Responsive Design

All components are fully responsive:
- **Mobile**: Horizontal carousels with navigation arrows
- **Desktop**: Grid layouts with hover effects
- **Breakpoint**: `md` (768px)

## 🎨 Styling

- Uses Tailwind CSS utility classes
- Custom gradients and animations
- Consistent spacing and typography
- Dark mode support

## 🚀 Benefits of This Structure

1. **Easy to Find**: Each section is in its own file
2. **Easy to Debug**: Isolated components make debugging simpler
3. **Reusable**: Components like `CarouselArrow` and `UniLogo` are shared
4. **Maintainable**: Changes to one section don't affect others
5. **Testable**: Each component can be tested independently
6. **Scalable**: Easy to add new sections or modify existing ones

## 🔄 Main Home Page

The main `src/pages/Home.tsx` file now simply imports and composes these sections:

```tsx
import { 
  HeroSection, 
  FeaturesSection, 
  HowItWorksSection, 
  UniversitiesSection, 
  ProjectsSection, 
  Footer 
} from "@/components/home";

const Home = () => {
  return (
    <div className="flex-1 overflow-hidden bg-background">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <UniversitiesSection />
      <ProjectsSection />
      <Footer />
    </div>
  );
};
```

This makes the main file clean and easy to understand at a glance!
