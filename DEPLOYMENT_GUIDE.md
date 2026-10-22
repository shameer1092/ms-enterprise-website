# MS Enterprise Website - Deployment & Operations Guide

This guide provides instructions for deploying, hosting, and maintaining the MS Enterprise website and administrative panel.

---

## 1. Architecture Overview

- **Framework:** Next.js 14 (App Router) with React 18 and TypeScript.
- **Styling:** Tailwind CSS with Spatial UI theme (layered depth, translucent frosted panels, soft shadows, electric cyan accents, dark obsidian background `#060b14`).
- **Data Layer:** File-backed transactional atomic database stored in `data/ms_database.json` with automatic backup rotations in `data/backups/`.
- **Authentication:** JWT session tokens stored in secure `httpOnly` cookies with bcrypt password hashing and optional 2FA / security PIN verification.
- **Icons:** SVG icons via `lucide-react`. Zero emojis used anywhere in the codebase.
- **Copy Standards:** Strict avoidance of em dashes across all text strings and pages.

---

## 2. Environment Variables

Create a `.env.production` file on your server or configure these in your hosting dashboard:

```env
# Node Environment
NODE_ENV=production

# Strong secret key for signing admin authentication JWTs
JWT_SECRET=ms_enterprise_ultra_secure_jwt_secret_key_change_me_in_prod_2026

# Public site domain URL (used for sitemap and metadata)
NEXT_PUBLIC_SITE_URL=https://msenterprise.com

# Optional SMTP Configuration (can also be configured directly in Admin > Settings)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contact@msenterprise.com
SMTP_PASS=your_app_password
SMTP_FROM=inquiries@msenterprise.com
```

---

## 3. Deployment Options

### Option A: Standard VPS / Cloud Server (Ubuntu / Debian / AWS / DigitalOcean)

#### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm
- PM2 process manager
- Nginx reverse proxy with Certbot (Let's Encrypt SSL)

#### Steps:
1. Clone or upload the project to `/var/www/ms-enterprise-website`.
2. Install dependencies and build the application:
   ```bash
   npm install --production=false
   npm run build
   ```
3. Start with PM2:
   ```bash
   pm2 start npm --name "ms-enterprise" -- start -- -p 3000
   pm2 save
   pm2 startup
   ```
4. Configure Nginx reverse proxy:
   ```nginx
   server {
       server_name msenterprise.com www.msenterprise.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```
5. Install SSL Certificate:
   ```bash
   sudo certbot --nginx -d msenterprise.com -d www.msenterprise.com
   ```

---

### Option B: Vercel / Netlify Deployment

1. Connect your repository to Vercel.
2. Build Command: `next build`
3. Output Directory: `.next`
4. Set Environment Variables (`JWT_SECRET`, etc.).
5. Click **Deploy**.

> Note: For persistent disk writes on serverless environments like Vercel, connect an external database adapter or use an attached volume. For complete on-premise autonomy, VPS or Docker deployment with the included transactional file database is recommended.

---

## 4. Domain & DNS Setup

To point your custom domain (e.g. `msenterprise.com`) to your server:

| Type  | Name | Value | TTL |
|-------|------|-------|-----|
| A     | @    | YOUR_SERVER_PUBLIC_IP | 300 / Auto |
| CNAME | www  | msenterprise.com | 300 / Auto |

---

## 5. Administrative Access & Default Credentials

- **Admin Login URL:** `/admin/login`
- **Default Owner Account:**
  - Username: `admin`
  - Password: `Admin@12345`
- **Default Editor Account:**
  - Username: `editor`
  - Password: `Admin@12345`

*Important: After your first login, visit Admin > Users to change your default password and optionally enable Two-Factor Security.*

---

## 6. Backups & Disaster Recovery

- **Manual Backups:** In **Admin > Backup & Recovery**, click **Create Backup Now**. You can download full JSON snapshots directly to your local computer.
- **Automated Safety Backups:** Before any restore or significant destructive update is accepted, the system automatically takes an immutable safety snapshot in `data/backups/`.
- **Restoring:** Click **Restore from File**, choose your desired `.json` backup file, and confirm. The system validates the schema and hot-swaps the database with zero downtime.

---

## 7. Quality Checklist Verification

Before public launch, verify:
- [x] Clickable logo returns to `/`
- [x] Clickable `tel:` and `mailto:` links trigger native handlers
- [x] Floating WhatsApp button links to valid WhatsApp number
- [x] Copyright year updates dynamically based on system clock
- [x] Inquiry form saves to database and sends notification
- [x] Custom 404 page exists and functions
- [x] Sitemap (`/sitemap.xml`) and robots (`/robots.txt`) render correctly
- [x] Zero purple gradients and zero pale shift buttons
- [x] Zero em dashes anywhere in website copy
- [x] Accessible contrast, keyboard navigation, and focus rings
