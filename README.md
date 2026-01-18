# Next.js 16+ Boilerplate

A production-ready Next.js boilerplate with TypeScript, Tailwind CSS, shadcn/ui, and comprehensive developer tooling. Built for rapid development with best practices and modern React patterns.

## ✨ Features

- **🚀 Next.js 16.1** with App Router - Latest Next.js features and optimizations
- **⚛️ React 19** - Latest React with improved performance
- **📘 TypeScript** - Full type safety across the codebase
- **🎨 Tailwind CSS 3** - Utility-first CSS framework
- **🧩 shadcn/ui** - High-quality, accessible component library built on Radix UI
- **🎯 Atomic Design** - Organized component structure (atoms/molecules/organisms/templates)
- **🎨 Custom Theme System** - CSS variables-based theming with dark mode support
- **📝 Form Management** - Formik + Yup for form handling and validation
- **🔄 State Management** - React Query (TanStack Query) for server state
- **✅ Code Quality** - ESLint, Prettier, Husky, and lint-staged
- **📦 Bundle Analysis** - Built-in bundle analyzer for optimization
- **🐳 Docker Ready** - Multi-stage Dockerfile for production deployment
- **🎭 Dark Mode** - Built-in dark mode support with CSS variables

## 🛠️ Tech Stack

### Core

- **Next.js 16.1** - React framework with App Router
- **React 19.3** - UI library
- **TypeScript 5** - Type-safe JavaScript

### Styling & UI

- **Tailwind CSS 3.4** - Utility-first CSS
- **shadcn/ui** - Component library (Radix UI + Tailwind)
- **tailwindcss-animate** - Animation utilities
- **class-variance-authority** - Variant management for components
- **clsx** + **tailwind-merge** - Conditional class names

### Form & Validation

- **Formik 2.4** - Form state management
- **Yup 1.7** - Schema validation
- **react-hook-form 7.71** - Alternative form library
- **zod 4.3** - TypeScript-first schema validation
- **@hookform/resolvers** - Form validation resolvers

### Data Fetching & State

- **@tanstack/react-query 5.90** - Server state management
- **@tanstack/react-query-devtools** - React Query debugging
- **zustand 5.0** - Client state management (lightweight)

### UI Components (Radix UI)

All Radix UI primitives are available through shadcn/ui components:

- Accordion, Alert Dialog, Avatar, Checkbox, Dialog, Dropdown Menu
- Form, Label, Popover, Progress, Radio Group, Select, Separator
- Slider, Switch, Tabs, Toast, Tooltip, and more

### Code Quality & Tooling

- **ESLint 9** - Linting with Next.js, TypeScript, and custom rules
- **Prettier 3.7** - Code formatting
- **Husky 9.1** - Git hooks
- **lint-staged 16.2** - Run linters on staged files
- **@next/bundle-analyzer** - Bundle size analysis

### Utilities

- **lucide-react** - Icon library
- **next-themes** - Theme switching (dark/light mode)
- **sonner** - Toast notifications
- **input-otp** - OTP input component

## 📦 Installation

### Prerequisites

- **Node.js** >= 20
- **npm** (comes with Node.js)

### Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd FE

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 🚀 Quick Start

### Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
npm start
```

### Code Quality Checks

```bash
# Run all checks (lint + type-check + format check)
npm run check

# Run checks and build (pre-push validation)
npm run check:build
```

## 📁 Project Structure

```
FE/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with fonts & providers
│   ├── page.tsx                 # Home page
│   ├── providers/
│   │   └── ReactQueryProvider.tsx  # React Query setup with DevTools
│   └── globals.css              # Global styles (moved to styles/)
│
├── components/                   # Component library (Atomic Design)
│   ├── atoms/                   # Basic components (Button, Input, etc.)
│   │   └── button/
│   │       └── index.tsx
│   ├── molecules/               # Composite components
│   ├── organisms/               # Complex components
│   └── templates/               # Layout templates
│
├── lib/                         # Utility functions & shared logic
│   ├── utils.ts                 # cn() helper (clsx + tailwind-merge)
│   └── validation.ts            # Yup schemas for validation
│
├── hooks/                       # Custom React hooks
│
├── styles/                      # Global styles
│   └── globals.css              # Tailwind directives + CSS variables
│
├── public/                      # Static assets
│
├── scripts/                     # Build & utility scripts
│   └── add-component.js         # Helper to add shadcn components
│
├── .husky/                      # Git hooks
│   ├── pre-commit              # Runs lint-staged
│   └── pre-push                # Runs check:build
│
├── components.json              # shadcn/ui configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.mjs           # PostCSS configuration
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── eslint.config.mjs            # ESLint configuration
├── .lintstagedrc.js             # lint-staged configuration
└── package.json                 # Dependencies & scripts
```

### Component Organization (Atomic Design)

When adding new components:

- **Atoms** (`components/atoms/`) - Smallest, reusable components
  - Button, Input, Label, Badge, etc.
- **Molecules** (`components/molecules/`) - Groups of atoms functioning together
  - FormField, SearchBox, Card, etc.
- **Organisms** (`components/organisms/`) - Complex UI components
  - Header, Footer, DataTable, Form, etc.
- **Templates** (`components/templates/`) - Page-level layouts
  - AuthLayout, DashboardLayout, etc.

## 🎨 Theme & Colors

The boilerplate includes a comprehensive color system using CSS variables. All colors are defined in `styles/globals.css` and mapped to Tailwind utilities in `tailwind.config.ts`.

### Available Color Tokens

- **Primary** - Brand color (`#1E88E5` - Sport blue)
- **Secondary** - Secondary actions
- **Accent** - CTA/Action color (`#FF9800` - Energy orange)
- **Destructive** - Error/Delete actions (`#D32F2F`)
- **Success** - Success states (`#2E7D32`)
- **Warning** - Warning states (`#F9A825`)
- **Muted** - Muted backgrounds/text
- **Card** - Card backgrounds
- **Popover** - Popover backgrounds
- **Background** - Page background
- **Foreground** - Primary text color
- **Border** - Border color
- **Input** - Input border color
- **Ring** - Focus ring color

### Using Colors in Components

All shadcn/ui components automatically use these color tokens:

```tsx
// Primary color
<Button variant="default">Primary Button</Button>

// Destructive color
<Button variant="destructive">Delete</Button>

// Success color
<div className="bg-success text-success-foreground">Success message</div>

// Warning color
<div className="bg-warning text-warning-foreground">Warning message</div>
```

### Customizing Colors

Edit `styles/globals.css` to customize the color palette:

```css
:root {
  --primary: 207 77% 51%; /* HSL values without hsl() wrapper */
  --primary-foreground: 0 0% 100%;
  /* ... */
}
```

All components will automatically use the updated colors.

## 🧩 Adding shadcn/ui Components

This boilerplate uses **shadcn/ui** with a custom directory structure. Use the provided script to add components:

```bash
npm run add:component <component-name>
```

For example:

```bash
npm run add:component button
npm run add:component input
npm run add:component card
```

The script will:

1. Install the component using `shadcn add`
2. Organize it into `components/atoms/<component-name>/`
3. Update imports automatically

You can also use shadcn CLI directly:

```bash
npx shadcn@latest add <component-name>
```

Components will be added to `components/atoms/` based on `components.json` configuration.

### Available shadcn/ui Components

Visit [shadcn/ui documentation](https://ui.shadcn.com/docs/components) for the full list. Popular components include:

- `button`, `input`, `label`, `textarea`
- `card`, `dialog`, `dropdown-menu`, `popover`
- `table`, `form`, `select`, `checkbox`, `radio-group`
- `toast`, `alert-dialog`, `accordion`, `tabs`
- And many more...

## 📝 Scripts

### Development

```bash
npm run dev              # Start development server
```

### Build

```bash
npm run build            # Build for production
npm start                # Start production server
```

### Code Quality

```bash
npm run lint             # Lint all files
npm run lint:fix         # Lint and auto-fix issues
npm run format           # Format all files with Prettier
npm run format:check     # Check formatting without fixing
npm run type-check       # TypeScript type checking
npm run check            # Run lint + type-check + format:check
npm run check:build      # Run check + build (pre-push validation)
```

### Component Management

```bash
npm run add:component <name>  # Add shadcn/ui component
```

### Bundle Analysis

```bash
ANALYZE=true npm run build     # Analyze bundle size
```

## 🔄 Development Workflow

### Git Hooks

The project uses **Husky** for Git hooks:

#### Pre-commit Hook

- Automatically formats staged files with Prettier
- Lints and fixes staged files with ESLint
- Ensures all commits are properly formatted

#### Pre-push Hook

- Runs full validation: `lint` + `type-check` + `format:check` + `build`
- Prevents pushing code with errors
- Ensures build succeeds before pushing

### Recommended Workflow

1. **Create a feature branch**

   ```bash
   git checkout -b feat/your-feature
   ```

2. **Develop your feature**

   ```bash
   npm run dev  # Start dev server
   ```

3. **Before committing, check your code**

   ```bash
   npm run lint
   npm run type-check
   npm run format
   ```

4. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add new feature"
   # Pre-commit hook will auto-format/lint
   ```

5. **Push to remote**

   ```bash
   git push origin feat/your-feature
   # Pre-push hook will validate everything
   ```

6. **Create Pull Request**
   - Push will be blocked if checks fail
   - Fix any issues and try again

## 🔧 Configuration Files

### ESLint (`eslint.config.mjs`)

Configured with:

- Next.js core web vitals
- TypeScript rules
- Prettier integration
- Import ordering rules
- React Hooks rules

### Prettier (`.prettierrc`)

Standard formatting rules for consistent code style.

### TypeScript (`tsconfig.json`)

Strict TypeScript configuration with path aliases:

- `@/*` maps to project root
- Incremental compilation enabled

### Tailwind (`tailwind.config.ts`)

- Custom color system via CSS variables
- Dark mode support (`class` strategy)
- Container configuration
- Custom animations (accordion, etc.)

### Next.js (`next.config.ts`)

- Bundle analyzer integration
- Production optimizations

## 🐳 Docker Deployment

The project includes a multi-stage Dockerfile for production deployment:

```bash
# Build Docker image
docker build -t my-next-app .

# Run container
docker run -p 3000:3000 my-next-app
```

The Dockerfile uses:

- **Stage 1 (deps)**: Install dependencies
- **Stage 2 (builder)**: Build Next.js app
- **Stage 3 (runner)**: Minimal production image with non-root user

## 📚 Key Concepts

### React Query Setup

React Query is configured in `app/providers/ReactQueryProvider.tsx`:

```tsx
import { useQuery } from "@tanstack/react-query";

function MyComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  // ...
}
```

React Query DevTools are available in development mode.

### Form Handling

Two options are available:

#### Option 1: Formik + Yup (Recommended)

```tsx
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});

function MyForm() {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      /* ... */
    },
  });

  // ...
}
```

#### Option 2: React Hook Form + Zod

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  // ...
}
```

### Dark Mode

Dark mode is supported via CSS variables. Toggle using `next-themes`:

```tsx
import { useTheme } from "next-themes";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle
    </button>
  );
}
```

### Path Aliases

TypeScript paths are configured in `tsconfig.json`:

```tsx
import { Button } from "@/components/atoms/button";
import { cn } from "@/lib/utils";
import { useCustomHook } from "@/hooks/use-custom-hook";
```

## 🤝 Contributing

This is a boilerplate template. When using it for your project:

1. Update `package.json` with your project name
2. Update metadata in `app/layout.tsx`
3. Customize colors in `styles/globals.css`
4. Add your components following Atomic Design principles
5. Configure environment variables as needed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [React Query](https://tanstack.com/query) - Powerful data synchronization

---

Built with ❤️ using Next.js 16, React 19, and TypeScript
