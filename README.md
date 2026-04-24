# Campus Connect Hub

A modern platform for Ethiopian university students to discover, share, and collaborate on study materials.

## 📁 Project Structure

```
campus-connect-hub/
├── .git/                    # Git repository
└── frontend/                # Frontend application
    ├── src/                 # Source code
    ├── public/              # Static assets
    ├── dist/                # Build output
    ├── supabase/            # Database schema
    └── ...config files
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 📦 Frontend Application

The frontend is a React + TypeScript application built with:
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Supabase** - Backend & database
- **React Router** - Navigation

### Key Features
- 🎓 30+ Ethiopian universities supported
- 📚 Material sharing and discovery
- 🤖 AI-powered study assistance
- 📊 GPA calculator with Ethiopian grading scale
- 🔐 Secure authentication
- 📱 Fully responsive design
- 🌙 Light/dark mode support

### Project Statistics
- **Total Components**: 28 modular components
- **Average File Size**: ~60 lines
- **Code Quality**: All custom files under 300 lines
- **Build Status**: ✅ Passing (0 errors)

## 📖 Documentation

Detailed documentation is available in the `frontend/` directory:
- `CLEANUP_REPORT.md` - Security and cleanup improvements
- `REFACTORING_SUMMARY.md` - Code refactoring guide
- `FINAL_REFACTORING_REPORT.md` - Complete file analysis
- `src/components/home/README.md` - Component documentation

## 🔒 Security

- ✅ No SSH keys or credentials in repository
- ✅ Comprehensive `.gitignore` rules
- ✅ Environment variables for sensitive data
- ✅ Supabase Row Level Security (RLS) enabled

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm test             # Run tests
```

### Code Organization

```
frontend/src/
├── components/
│   ├── home/        # Home page components (9 files)
│   ├── gpa/         # GPA calculator components (10 files)
│   ├── navbar/      # Navigation components (9 files)
│   └── ui/          # shadcn/ui components
├── pages/           # Route pages
├── services/        # API services
├── contexts/        # React contexts
├── hooks/           # Custom hooks
└── lib/             # Utilities
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🌟 Acknowledgments

Built with ❤️ for Ethiopian university students.
