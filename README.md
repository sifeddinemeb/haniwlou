
# 🇩🇿 7aniwlou (حنيولو) - Platform Reporting for Algeria

> **"Catch the crime, fix the street — together."**

7aniwlou is a community-driven reporting platform designed specifically for Algerian citizens to anonymously report crimes, hazards, and public infrastructure issues. Built with Arabic-first design and real understanding of Algerian urban challenges.

![Arabic RTL](https://img.shields.io/badge/Arabic-RTL%20Support-green)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Supabase](https://img.shields.io/badge/Supabase-Ready-green)

## 🌟 Key Features

- **🔍 Anonymous Reporting**: Submit reports without registration required
- **📱 Mobile-First Design**: Fully responsive Arabic interface (RTL)
- **🗺️ Interactive Maps**: Geographic view of community reports
- **📊 Real-time Dashboard**: Track community statistics and trends
- **🚨 Emergency Integration**: Direct access to police (17/1548) and emergency (14/1021)
- **🎯 Smart Filtering**: Filter by category, wilaya, status, and popularity
- **❤️ Community Engagement**: Like and interact with reports
- **🔐 Privacy-First**: Built-in privacy protection and data anonymization

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS with custom Arabic design system
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **State Management**: TanStack React Query v5
- **UI Components**: Custom shadcn/ui implementation
- **Icons**: Lucide React
- **Routing**: React Router DOM v6

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/7aniwlou.git
cd 7aniwlou

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Supabase credentials

# Start development server
npm run dev
```

### Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── integrations/       # Supabase client and types
├── data/               # Mock data and constants
└── lib/                # Utility functions

project-docs/           # Comprehensive documentation
├── overview.md         # Project overview and features
├── plan.md             # Strategic execution plan
├── sprints.md          # Development roadmap
└── ...                 # Additional technical docs
```

## 🇩🇿 Contributing (للمطورين الجزائريين)

We welcome contributions from Algerian developers who understand local needs and challenges!

### Why Contribute?

- 🎯 **Impact**: Help build something that matters for Algerian communities
- 🧠 **Learn**: Work with modern React, TypeScript, and Supabase
- 🤝 **Network**: Connect with other Algerian developers
- 🔧 **Skills**: Gain experience with real-world production apps

### How to Contribute

1. **Fork the repository**
2. **Check `/project-docs/sprints.md`** for current development priorities
3. **Pick a sprint task** that matches your skills
4. **Create a feature branch**: `git checkout -b feature/your-feature-name`
5. **Make your changes** following our coding standards
6. **Test thoroughly** on both desktop and mobile
7. **Submit a Pull Request** with detailed description

### Development Priorities (Current Sprint)

Check `/project-docs/sprints.md` for the latest development roadmap. We're currently focusing on:

- 🔐 **Authentication System**: Supabase integration
- 📊 **Database Schema**: Reports and user management
- 🎨 **UI/UX Polish**: Mobile responsiveness and Arabic RTL
- 🔍 **Real Data Integration**: Moving from mock to live data

### Contribution Guidelines

- **Arabic-First**: All UI text should be in Arabic with proper RTL support
- **Mobile-Responsive**: Test on various screen sizes
- **Clean Code**: Follow TypeScript best practices
- **Documentation**: Update docs when adding features
- **Testing**: Ensure features work end-to-end

### Local Development Tips

```bash
# Run with Arabic RTL testing
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📋 Current Status & Roadmap

### ✅ Completed
- Fully responsive Arabic UI with RTL support
- Complete component library and design system
- Multi-step report submission form
- Interactive map integration
- Dashboard with statistics
- Authentication UI (username/password)

### 🚧 In Progress (See `/project-docs/sprints.md`)
- Supabase backend integration
- Real authentication system
- Database schema and RLS policies
- File upload for photos/videos
- Real-time data synchronization

### 🎯 Upcoming
- Advanced filtering and search
- Admin moderation tools
- Performance optimization
- Progressive Web App features

## 🔒 Security & Privacy

7aniwlou is built with privacy and security as core principles:

- **Anonymous Reporting**: No personal data required
- **Data Protection**: Row Level Security (RLS) policies
- **File Validation**: Secure file upload with type checking
- **Rate Limiting**: Protection against spam and abuse
- **Privacy Guidelines**: Built-in recommendations for photo/video privacy

## 📚 Documentation

Comprehensive documentation is available in `/project-docs/`:

- **[Overview](project-docs/overview.md)**: Project goals and features
- **[Development Plan](project-docs/plan.md)**: Strategic execution roadmap
- **[Sprint Guide](project-docs/sprints.md)**: Week-by-week development tasks
- **[Architecture](project-docs/data-integrations.md)**: Technical implementation details

## 🤝 Community & Support

### For Developers
- **GitHub Issues**: Bug reports and feature requests
- **Discussions**: Technical questions and ideas
- **Pull Requests**: Code contributions welcome

### For Users
- **Feature Requests**: Share ideas for improving the platform
- **Bug Reports**: Help us identify and fix issues
- **Community Feedback**: Tell us how we can better serve Algerian communities

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the Algerian community with love and dedication
- Inspired by the need for transparent, community-driven reporting
- Thanks to all contributors who help make this platform better

---

**Ready to contribute?** Start by reading `/project-docs/sprints.md` and pick a task that interests you!

**مستعد للمساهمة؟** ابدأ بقراءة دليل التطوير واختر مهمة تهمك!
