#!/usr/bin/env node

// Build script for Vercel deployment
import { execSync } from 'child_process';
import { mkdirSync, existsSync } from 'fs';

console.log('🚀 Building DeliWer for Vercel deployment...');

try {
  // Ensure dist directory exists
  if (!existsSync('dist')) {
    mkdirSync('dist', { recursive: true });
  }

  if (!existsSync('dist/public')) {
    mkdirSync('dist/public', { recursive: true });
  }

  // Build the frontend
  console.log('📦 Building frontend...');
  execSync('vite build', { stdio: 'inherit' });

  console.log('✅ Build completed successfully!');
  console.log('📁 Static files are in: dist/public/');
  console.log('🔗 API functions are in: api/');
  console.log('🌐 Ready for Vercel deployment!');

} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}