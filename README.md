# Micro-App Shell Launcher

A modern, minimalist web shell that serves as a launcher for micro-applications. This is a frontend-only static application designed for institutional use.

## Features

- Full-screen responsive layout
- Grid of 7 configurable micro-app launchers
- Clean, institutional-modern design
- Static hosting ready (GitHub Pages, Netlify, Vercel, etc.)
- No authentication or backend required

## Customization Guide

### Replace Background Image

Edit `src/App.tsx` line 10:
```typescript
backgroundImage: 'url("YOUR_IMAGE_URL_HERE")'
```

### Replace Title Logo/SVG

Edit `src/App.tsx` lines 22-31 to replace the placeholder SVG with your own logo component or external SVG.

### Configure Micro-Apps

Edit `src/config/apps.ts` to update:
- **title**: Display name of the app
- **description**: App description (for accessibility)
- **url**: Target URL for navigation
- **icon**: Icon name from [Lucide React](https://lucide.dev/icons/)

Example:
```typescript
{
  id: 'app-1',
  title: 'Your App Name',
  description: 'App description',
  url: 'https://your-app-url.com',
  icon: 'IconName', // See lucide.dev for available icons
}
```

### Change Portal Title

Edit `src/App.tsx` line 33:
```typescript
<h1>Your Portal Name</h1>
```

## Development

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for static hosting.

## Deployment

This application can be deployed to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Azure Static Web Apps
- Firebase Hosting

Simply upload the contents of the `dist/` folder after building.
