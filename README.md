# 🌟 LaunchPad - Next.js + Strapi Full-Stack Blog Platform

Welcome to LaunchPad, a cutting-edge full-stack blog platform built with **Next.js** (frontend) and **Strapi** (CMS/backend). This template provides everything you need to create a modern, performant, and SEO-optimized blog.

## ✨ Features

- 🎨 **Modern UI**: Built with ShadCN UI components and Tailwind CSS
- 🚀 **Performance**: Optimized for speed with Next.js 14 and standalone output
- 📱 **Responsive**: Mobile-first design that works on all devices
- 🔍 **SEO-Friendly**: Dynamic sitemaps, robots.txt, and meta tags
- 🎯 **CMS Integration**: Full Strapi CMS with content management
- 🖼️ **Media Handling**: Optimized image handling and uploads
- 📝 **Rich Content**: Support for rich text, blocks, and dynamic zones
- 🌐 **Deployment Ready**: Docker containers with Kamal deployment
- 🔒 **Production Ready**: Security, monitoring, and backup features

## 🏗️ Architecture

- **Frontend**: Next.js 14 with TypeScript, ShadCN UI, Tailwind CSS
- **Backend**: Strapi 5.x CMS with PostgreSQL
- **Deployment**: Docker containers orchestrated with Kamal
- **Infrastructure**: Automated backups, SSL, and monitoring

## 🚀 Getting Started

### Local Development

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd pi-blog
   ```

2. **Install dependencies**:
   ```bash
   # Install root dependencies
   yarn install

   # Install Next.js dependencies
   cd next
   yarn install

   # Install Strapi dependencies
   cd ../strapi
   yarn install
   ```

3. **Set up environment variables**:

   For Strapi:
   ```bash
   cp ./strapi/.env.example ./strapi/.env
   ```

   For Next.js:
   ```bash
   cp ./next/.env.example ./next/.env
   ```

4. **Start the development servers**:

   Terminal 1 (Strapi):
   ```bash
   cd strapi
   yarn develop
   ```

   Terminal 2 (Next.js):
   ```bash
   cd next
   yarn dev
   ```

5. **Access the applications**:
   - Next.js frontend: http://localhost:3000
   - Strapi admin: http://localhost:1337/admin

## 🚢 Deployment

This project is configured for deployment using **Kamal** with Docker containers. See the [DEPLOYMENT.md](DEPLOYMENT.md) guide for detailed instructions.

### Quick Deployment to Staging

1. **Install Kamal**:
   ```bash
   gem install kamal
   ```

2. **Set up environment**:
   ```bash
   cp .env.example .env
   # Fill in your values
   ```

3. **Deploy**:
   ```bash
   ./scripts/setup-deployment.sh
   kamal deploy -d staging
   ```

### Staging URLs
- **Blog**: https://stg-ruby.pageinteract.com/blog
- **Strapi Admin**: https://stg-strapi.pageinteract.com/admin

### Production Deployment
For production deployment, see the comprehensive [DEPLOYMENT.md](DEPLOYMENT.md) guide.

## 📁 Project Structure

```
pi-blog/
├── next/                    # Next.js frontend application
│   ├── app/                # App router pages and layouts
│   ├── components/         # Reusable UI components
│   ├── lib/               # Utilities and configurations
│   └── Dockerfile         # Next.js container configuration
├── strapi/                 # Strapi CMS backend
│   ├── src/               # API routes and content types
│   ├── config/            # Strapi configuration
│   ├── data/              # Database exports and seeds
│   └── Dockerfile         # Strapi container configuration
├── config/                 # Kamal deployment configurations
│   ├── deploy.yml         # Production deployment
│   └── deploy.staging.yml # Staging deployment
├── scripts/               # Deployment and utility scripts
├── .github/workflows/     # CI/CD GitHub Actions
└── DEPLOYMENT.md          # Comprehensive deployment guide
```

## 🎨 UI Components

This project uses [ShadCN UI](https://ui.shadcn.com/) for consistent, accessible, and customizable components:

- Modern design system with Tailwind CSS
- Fully accessible components
- Dark/light mode support
- Responsive design patterns
- TypeScript support

## 📊 Content Management

### Strapi Features
- **Content Types**: Articles, Pages, Categories, Products
- **Dynamic Zones**: Flexible content blocks
- **Media Library**: Image and file management
- **SEO Plugin**: Meta tags and Open Graph support
- **User Permissions**: Role-based access control
- **Preview Mode**: Draft content preview

### Content Types
- **Articles**: Blog posts with rich content
- **Pages**: Static pages with dynamic zones
- **Categories**: Content organization
- **Global**: Site-wide settings and navigation

## 🔍 SEO Features

- **Dynamic Sitemap**: Automatically generated from content
- **Robots.txt**: Configured for optimal crawling
- **Meta Tags**: Comprehensive SEO metadata
- **Open Graph**: Social media optimization
- **Structured Data**: Rich snippets support
- **Performance**: Optimized Core Web Vitals

## 🛠️ Development Tools

- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality checks
- **Docker**: Containerized development and deployment

## 🔒 Security Features

- **Environment Variables**: Secure configuration management
- **HTTPS**: SSL/TLS encryption
- **Database Security**: Connection encryption and access control
- **Content Security**: Input validation and sanitization
- **Authentication**: Secure admin access

## 📈 Monitoring and Maintenance

- **Health Checks**: Automated service monitoring
- **Automated Backups**: Database and media backups
- **Log Management**: Centralized logging
- **Performance Monitoring**: Application metrics
- **Security Updates**: Automated dependency updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
- **Issues**: Report bugs and request features via GitHub Issues
- **Community**: Join discussions in GitHub Discussions

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Strapi](https://strapi.io/) - Headless CMS
- [ShadCN UI](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Kamal](https://kamal-deploy.org/) - Deployment tool
