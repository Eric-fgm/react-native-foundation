# 🚀 React Native Foundation

A modern, modular React Native component library built with TypeScript. This monorepo contains headless, accessible UI primitives designed to be highly customizable and performant.

---

## ✨ Features

- 📦 **Modular Architecture** — Pick only the components you need
- 🎨 **Headless Components** — Unstyled primitives for full design control
- ⚡ **High Performance** — Optimized for React Native with Reanimated support
- 🔧 **TypeScript First** — Full type safety and excellent DX
- 🎯 **Accessibility** — Built with a11y in mind
- 📱 **Cross-Platform** — Works on iOS, Android, and Web (Comming Soon)

---

## 📦 Packages

| Package                           | Description                           |
| --------------------------------- | ------------------------------------- |
| `@rn-foundation/accordion`        | Expandable/collapsible content panels |
| `@rn-foundation/aspect-ratio`     | Maintain consistent aspect ratios     |
| `@rn-foundation/avatar`           | User avatars with fallbacks           |
| `@rn-foundation/checkbox`         | Checkbox input component              |
| `@rn-foundation/checkbox-group`   | Group of checkbox inputs              |
| `@rn-foundation/collapsible-tabs` | Tabs with collapsing header           |
| `@rn-foundation/context-menu`     | Right-click/long-press context menus  |
| `@rn-foundation/dialog`           | Modal dialogs and alerts              |
| `@rn-foundation/dropdown-menu`    | Dropdown menu component               |
| `@rn-foundation/infinite-list`    | Virtualized infinite scrolling list   |
| `@rn-foundation/popover`          | Floating popover content              |
| `@rn-foundation/portal`           | Render components outside parent tree |
| `@rn-foundation/radio-group`      | Radio button group                    |
| `@rn-foundation/select`           | Select/dropdown input                 |
| `@rn-foundation/slider`           | Range slider input                    |
| `@rn-foundation/switch`           | Toggle switch component               |
| `@rn-foundation/theming`          | Theme provider and utilities          |
| `@rn-foundation/toast`            | Toast notifications                   |
| `@rn-foundation/toggle`           | Toggle button component               |
| `@rn-foundation/toggle-group`     | Group of toggle buttons               |
| `@rn-foundation/shared`           | Shared utilities and hooks            |
| `@rn-foundation/config`           | Shared configuration                  |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18
- **pnpm** >= 10.12.1

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd rn-foundation

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### Development

```bash
# Run iOS playground (React Native)
pnpm dev:ios
```

---

## 🏗️ Project Structure

```
rn-foundation/
├── apps/
│   ├── playground-react-native/   # React Native demo app (Expo)
│   └── playground-nextjs/         # Next.js demo app
├── packages/
│   ├── accordion/                 # UI Components
│   ├── avatar/
│   ├── dialog/
│   ├── ...
│   ├── shared/                    # Shared hooks & utilities
│   ├── theming/                   # Theme system
│   └── config/                    # Build configuration
├── turbo.json                     # Turborepo configuration
├── pnpm-workspace.yaml            # PNPM workspace config
└── package.json
```

---

## 📜 Scripts

| Command        | Description                                |
| -------------- | ------------------------------------------ |
| `pnpm dev:ios` | Start React Native playground on iOS       |
| `pnpm lint`    | Run ESLint across all packages             |
| `pnpm format`  | Format code with Prettier                  |
| `pnpm clean`   | Clean all build artifacts and node_modules |

---

## 🔧 Using a Package

Install individual packages as needed:

```bash
pnpm add @rn-foundation/dialog @rn-foundation/theming
```

```tsx
import { Dialog, DialogTrigger, DialogContent } from '@rn-foundation/dialog';
import { ThemeProvider } from '@rn-foundation/theming';

export function App() {
  return (
    <ThemeProvider>
      <Dialog>
        <DialogTrigger>
          <Text>Open Dialog</Text>
        </DialogTrigger>
        <DialogContent>
          <Text>Hello from Dialog!</Text>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
```

---

## 🛠️ Tech Stack

- **React Native** 0.81+
- **React** 19
- **Expo** 54
- **TypeScript** 5.8+
- **Turborepo** — Monorepo build system
- **pnpm** — Fast, disk-efficient package manager
- **tsup** — TypeScript library bundler
- **React Native Reanimated** — Smooth animations
- **React Native Gesture Handler** — Touch handling

---

## 📄 License

Private

---

<p align="center">
  Built with ❤️ for React Native
</p>
