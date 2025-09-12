#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Clean build for hosting - removes potential security flags
const cleanDist = () => {
  const distPath = './dist';
  
  if (!fs.existsSync(distPath)) {
    console.log('No dist folder found. Run build first.');
    return;
  }

  // Remove source maps for production
  const removeSourceMaps = (dir) => {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        removeSourceMaps(filePath);
      } else if (file.endsWith('.map')) {
        fs.unlinkSync(filePath);
        console.log(`Removed: ${filePath}`);
      }
    });
  };

  removeSourceMaps(distPath);
  console.log('Build cleaned for hosting');
};

cleanDist();