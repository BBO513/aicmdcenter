
# AI Command Center - Digital Product Sales System

A NextJS application that automates digital product creation and sales across multiple platforms using AI agents.

## 🚀 Phase 1 MVP Features

- **7 AI Agents**: Market Research, Content Creation, Platform Management (3 core agents implemented)
- **Dashboard**: Real-time monitoring of agents, products, and revenue
- **Product Pipeline**: From ideation to publication tracking
- **Multi-platform Ready**: Etsy, Gumroad, Creative Market integration framework
- **Revenue Analytics**: Track sales and performance across platforms
- **User Authentication**: Secure NextAuth-based authentication

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Charts**: Chart.js with react-chartjs-2
- **HTTP Client**: Axios, SWR for data fetching

## 🎯 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL (or Docker)
- npm or yarn

### Installation

1. **Clone and install dependencies**:
   ```bash
   cd aicmdcenter
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and secrets
   ```

3. **Set up the database**:
   ```bash
   # Option 1: Using local PostgreSQL
   createdb aicmdcenter
   
   # Run migrations
   npx prisma migrate dev
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Access the application**:
   - Open http://localhost:3000
   - Sign in with any email/password (auto-registration for MVP)
   - Explore the dashboard and AI agents

## 🤖 AI Agents

### Implemented (Phase 1)
- **Market Research Agent**: Analyzes trends, identifies profitable niches, competitor analysis
- **Content Creation Agent**: Generates templates, guides, and graphics using AI
- **Platform Management Agent**: Handles listing optimization and cross-platform management

### Coming in Phase 2
- **SEO Agent**: Keyword optimization and metadata generation
- **Design Agent**: Automated graphics and branding
- **Customer Service Agent**: Automated support responses
- **Analytics Agent**: Advanced performance insights

## 📊 Dashboard Features

- **System Overview**: Products, revenue, agent performance metrics
- **Agent Management**: Trigger agent actions and monitor results
- **Product Pipeline**: Track products from draft to published
- **Revenue Analytics**: Visual charts and performance tracking
- **Activity Feed**: Real-time agent logs and system updates

## 🔗 API Integration Status

| Platform | Status | Implementation |
|----------|--------|----------------|
| Etsy | ✅ Ready | Full API documented, OAuth 2.0 |
| Gumroad | ✅ Ready | REST API with access tokens |
| Creative Market | ⚠️ Manual | No public API, requires automation |

## 📱 Screenshots

*Dashboard Overview*
- System metrics and agent status
- Revenue tracking with visual charts
- Recent activity and product pipeline

*Agent Interface*
- Individual agent cards with actions
- Real-time execution results
- Performance monitoring

## 🔒 Security & Best Practices

- TypeScript strict mode for type safety
- Environment variable management
- Error handling and validation
- SQL injection prevention with Prisma
- Secure authentication with NextAuth

## 📈 Performance

- SWR for efficient data fetching
- Optimized database queries with Prisma
- Responsive design with Tailwind CSS
- Production-ready build optimization

## 🧪 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open database browser
```

### Database Management
```bash
npx prisma migrate dev    # Apply database changes
npx prisma generate       # Regenerate Prisma client
npx prisma db push        # Push schema changes
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in dashboard
3. Deploy automatically on git push

### Docker
```bash
docker compose up -d postgres  # Start PostgreSQL
npm run build                  # Build the app
npm start                      # Start production server
```

### Environment Variables for Production
```bash
DATABASE_URL=your-production-db-url
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret
OPENAI_API_KEY=your-openai-key
# Additional platform API keys as needed
```

## 📋 Roadmap

### Phase 2 (6-8 weeks)
- [ ] Real AI integration (OpenAI GPT-4, DALL-E)
- [ ] Live platform API connections
- [ ] Advanced analytics and reporting
- [ ] Automated workflow scheduling
- [ ] Performance optimizations

### Phase 3 (Future)
- [ ] Mobile app companion
- [ ] Advanced machine learning insights
- [ ] Multi-user team features
- [ ] White-label solutions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- Check the [Phase 2 Implementation Guide](docs/TODO_PHASE2.md)
- Open an issue for bugs or feature requests
- Contact the development team for commercial inquiries

## ⚡ Built for Scale

This MVP is designed to handle:
- Multiple concurrent users
- High-volume product processing
- Real-time agent orchestration
- Cross-platform synchronization
- Revenue tracking at scale

Ready to transform your digital product business with AI automation!
