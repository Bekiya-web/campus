# Campus Connect Hub

A modern, high-performance platform for Ethiopian university students to discover, share, and collaborate on study materials. Built with a focus on speed, scalability, and user experience.

## 📁 Project Structure

```
campus-connect-hub/
│
├── 📁 .git/                        # Git repository
│
├── 📁 frontend/                    # Core Frontend Application
│   │
│   ├── 📁 src/                     # Application Source Code
│   │   ├── 📁 components/          # Modular React Components
│   │   │   ├── 📁 admin/          # Admin Panel widgets & management
│   │   │   ├── 📁 auth/           # Authentication guards & setup
│   │   │   ├── 📁 chat/           # Real-time messaging interfaces
│   │   │   ├── 📁 common/         # Shared UI (MaterialCards, SearchBar)
│   │   │   ├── 📁 discussions/    # Forum & comment systems
│   │   │   ├── 📁 features/       # Feature modules (GPA, AI Chat)
│   │   │   │   └── 📁 gpa/        # GPA Calculator logic & UI
│   │   │   ├── 📁 home/           # Landing page sections & components
│   │   │   ├── 📁 layouts/        # Application layout wrappers
│   │   │   ├── 📁 navbar/         # Navigation, Menus & Notifications
│   │   │   └── 📁 ui/             # shadcn/ui primitive components
│   │   │
│   │   ├── 📁 pages/              # Route-level components (23 pages)
│   │   ├── 📁 services/           # Supabase & API logic (11 services)
│   │   ├── 📁 contexts/           # Global State (Auth, Theme)
│   │   ├── 📁 hooks/              # Custom React hooks (Admin, Chat)
│   │   ├── 📁 integrations/       # External API & client configs
│   │   │   └── 📁 supabase/       # Supabase client & initialization
│   │   ├── 📁 data/               # Static data & constants (Universities)
│   │   ├── 📁 lib/                # Shared library utilities
│   │   ├── 📁 types/              # TypeScript interfaces & definitions
│   │   └── 📁 utils/              # Helper functions & test data
│   │
│   ├── 📁 database/                # SQL Infrastructure & Scripts
│   │   ├── 📁 admin/              # Admin role & system setup
│   │   ├── 📁 chat/               # Chat system schemas & seeds
│   │   ├── 📁 discussions/        # Discussion forum schemas
│   │   └── 📁 schema/             # Core material & user tables
│   │
│   ├── 📁 public/                  # Static Public Assets
│   │   └── 📁 universities/       # University logo collection
│   │
│   ├── 📁 dist/                    # Build output (generated)
│   ├── 📁 node_modules/            # Project dependencies
│   │
│   ├── 📄 package.json             # Build & dependency manifest
│   ├── 📄 vite.config.ts           # Vite build configuration
│   └── 📄 tailwind.config.ts       # Design system & tokens
│
├── 📄 README.md                    # Main Project Documentation
└── 📄 PROJECT_STRUCTURE.md         # Detailed structural map
```

## 🎯 Key Features

### Core Platform
- 🎓 **University Hubs**: Dedicated academic spaces for 30+ Ethiopian universities.
- 📚 **Material Library**: Secure sharing, previewing, and downloading of resources.
- 💬 **Real-time Chat**: Course-specific global and local communication channels.
- 🏛️ **Discussion Forums**: Rich academic interaction and Q&A system.

### Smart Tools
- 📊 **GPA Calculator**: Full support for Ethiopian grading scales with trends.
- 🤖 **Smart AI Assistant**: Context-aware AI integrated for study help.
- 🛡️ **Admin Dashboard**: Advanced moderation, user management, and stats.

## 🚀 Technical Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Supabase (Postgres, Real-time, Auth, Storage)
- **Architecture**: Service-oriented with typed repository layers

## 📊 Project Statistics

- **Complexity**: 50+ Custom TypeScript/React components.
- **Navigation**: 23 unique route pages for a comprehensive experience.
- **Data Integrity**: Service layers for all 11 core API domains.
- **Code Quality**: ✅ Modular, type-safe, and highly maintainable structure.

## 🛠️ Getting Started

1. **Clone & Setup**:
   ```bash
   git clone <repository-url>
   cd campus-connect-hub/frontend
   npm install
   ```

2. **Development**:
   ```bash
   npm run dev
   ```

---
Built with ❤️ for the Ethiopian student community.
