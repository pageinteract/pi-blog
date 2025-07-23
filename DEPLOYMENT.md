# Deployment Guide - Pi Blog

This guide covers deploying the Pi Blog (Next.js + Strapi) to staging and production environments using Kamal.

## Prerequisites

1. **Ruby and Kamal**: Install Ruby and the Kamal gem
   ```bash
   gem install kamal
   ```

2. **Docker**: Ensure Docker is installed locally for building images

3. **GitHub Container Registry**: Set up GHCR access
   - Create a GitHub Personal Access Token with `write:packages` permission
   - Add it to your environment as `KAMAL_REGISTRY_PASSWORD`

4. **Server Access**: SSH access to your deployment servers

## Project Structure

```
pi-blog/
├── next/                 # Next.js frontend
│   ├── Dockerfile
│   └── ...
├── strapi/               # Strapi CMS backend
│   ├── Dockerfile
│   ├── data/            # Database exports
│   └── ...
├── config/
│   ├── deploy.yml       # Production config
│   └── deploy.staging.yml # Staging config
├── scripts/
│   ├── setup-deployment.sh
│   └── migrate-strapi-data.sh
└── .env.example
```

## Environment Setup

1. **Copy environment template**:
   ```bash
   cp .env.example .env
   ```

2. **Fill in your values**:
   ```bash
   # Kamal Registry Password (GitHub Container Registry Token)
   KAMAL_REGISTRY_PASSWORD=ghp_your_github_token_here

   # Strapi Configuration
   ADMIN_JWT_SECRET=$(openssl rand -base64 32)
   API_TOKEN_SALT=$(openssl rand -base64 32)
   TRANSFER_TOKEN_SALT=$(openssl rand -base64 32)
   APP_KEYS=$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32)
   JWT_SECRET=$(openssl rand -base64 32)

   # Next.js Configuration
   NEXT_PUBLIC_API_URL=https://stg-strapi.pageinteract.com
   CLIENT_URL=https://stg-ruby.pageinteract.com
   PREVIEW_SECRET=$(openssl rand -base64 32)
   IMAGE_HOSTNAME=stg-strapi.pageinteract.com

   # Email Configuration
   RESEND_API_KEY=re_your_resend_api_key_here
   ```

## Staging Deployment

### Initial Setup

1. **Run the setup script**:
   ```bash
   ./scripts/setup-deployment.sh
   ```

2. **Deploy to staging**:
   ```bash
   kamal deploy -d staging
   ```

### Migrate Strapi Data

After the initial deployment, migrate your existing Strapi data:

```bash
./scripts/migrate-strapi-data.sh
```

### Staging URLs

- **Blog**: https://stg-ruby.pageinteract.com/blog
- **Strapi Admin**: https://stg-strapi.pageinteract.com/admin

## Production Deployment

1. **Update production config**: Edit `config/deploy.yml` and replace `YOUR_PRODUCTION_SERVER_IP` with your actual server IP

2. **Update environment**: Create production environment variables

3. **Deploy**:
   ```bash
   kamal deploy -d production
   ```

## Services Overview

### Next.js Service
- **Port**: 3000
- **Path**: `/blog` (mounted under the main Ruby app)
- **Image**: `ghcr.io/pageinteract/pi-blog-nextjs-staging`
- **Features**:
  - Standalone output for optimized Docker images
  - Static file serving
  - Dynamic sitemap and robots.txt

### Strapi Service
- **Port**: 1337
- **Host**: `stg-strapi.pageinteract.com`
- **Image**: `ghcr.io/pageinteract/pi-blog-strapi-staging`
- **Database**: SQLite (file-based)
- **Features**:
  - Content management
  - API endpoints
  - Media uploads
  - Persistent data storage via Docker volumes

## Useful Commands

### Deployment
```bash
# Deploy staging
kamal deploy -d staging

# Deploy production
kamal deploy -d production

# Check deployment status
kamal status -d staging
```

### Logs and Monitoring
```bash
# View all logs
kamal logs -f -d staging

# View Next.js logs
kamal nextjs logs -f -d staging

# View Strapi logs
kamal strapi logs -f -d staging

# View Strapi database status
kamal strapi exec -d staging "ls -la /opt/app/data/"
```

### Container Management
```bash
# Access shell
kamal console -d staging

# Access Strapi console
kamal strapi-console -d staging

# Restart services
kamal restart -d staging

# Stop services
kamal stop -d staging
```

### Database Management
```bash
# Access Strapi console for database operations
kamal strapi exec -d staging --interactive "yarn strapi console"

# Create database backup (copy SQLite file)
kamal strapi exec -d staging "cp /opt/app/data/data.db /opt/app/data/backup-$(date +%Y%m%d-%H%M%S).db"

# List database backups
kamal strapi exec -d staging "ls -la /opt/app/data/backup-*.db"
```

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Docker logs: `kamal logs -d staging`
   - Verify environment variables are set correctly
   - Ensure all dependencies are properly installed

2. **Database Issues**:
   - Verify SQLite file permissions in /opt/app/data/
   - Check that data volume is properly mounted
   - Ensure sufficient disk space for database growth

3. **SSL/Domain Issues**:
   - Verify DNS records point to your server
   - Check kamal-proxy configuration
   - Ensure SSL certificates are properly configured

4. **Permission Issues**:
   - Check file permissions on uploads directory
   - Verify user permissions in containers

### Logs Location

- **Application Logs**: Available via `kamal logs` commands
- **System Logs**: `/var/log/` on the server
- **Database Backups**: `/opt/app/data/` directory (SQLite files)

## Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **Database Security**: SQLite file is contained within the application container
3. **SSL/TLS**: Always use HTTPS in production
4. **Backups**: Regular SQLite database file backups via volume snapshots
5. **Updates**: Keep base images and dependencies updated

## SEO Features

### Sitemap
- **URL**: `https://stg-ruby.pageinteract.com/blog/sitemap.xml`
- **Dynamic**: Automatically includes all published articles and pages
- **Update Frequency**: Updates with content changes

### Robots.txt
- **URL**: `https://stg-ruby.pageinteract.com/blog/robots.txt`
- **Configuration**: Allows blog content, blocks admin areas
- **AI Crawlers**: Blocks GPT and other AI crawlers

## Monitoring and Maintenance

1. **Health Checks**: Kamal automatically monitors container health
2. **Log Rotation**: Configure log rotation to prevent disk space issues
3. **Database Maintenance**: Regular SQLite VACUUM operations for optimization
4. **Security Updates**: Keep base images and dependencies updated
5. **Backup Verification**: Regularly test SQLite backup restoration procedures

## Support

For issues or questions:
1. Check the logs using the commands above
2. Review the Kamal documentation: https://kamal-deploy.org
3. Check the project's GitHub issues
4. Review Strapi and Next.js documentation for application-specific issues