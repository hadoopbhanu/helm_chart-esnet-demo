
import fs from 'fs';
import path from 'path';

// Define the sections to create as separate apps
const sections = ['network', 'services', 'infrastructure', 'security', 'about', 'index'];

// Create directories if they don't exist
sections.forEach(section => {
  const appDir = `${section}_app`;
  if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir);
    fs.mkdirSync(`${appDir}/src`);
    fs.mkdirSync(`${appDir}/public`);
    fs.mkdirSync(`${appDir}/src/components`);
    fs.mkdirSync(`${appDir}/src/lib`);
    fs.mkdirSync(`${appDir}/src/utils`);
    fs.mkdirSync(`${appDir}/src/hooks`);
    fs.mkdirSync(`${appDir}/src/pages`);
  }
});

// Copy shared configuration files
sections.forEach(section => {
  const appDir = `${section}_app`;
  
  // Copy package.json with modified name
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  packageJson.name = `${section}-app`;
  fs.writeFileSync(`${appDir}/package.json`, JSON.stringify(packageJson, null, 2));
  
  // Copy tsconfig files
  fs.copyFileSync('tsconfig.json', `${appDir}/tsconfig.json`);
  fs.copyFileSync('tsconfig.app.json', `${appDir}/tsconfig.app.json`);
  fs.copyFileSync('tsconfig.node.json', `${appDir}/tsconfig.node.json`);
  
  // Copy vite.config.ts
  fs.copyFileSync('vite.config.ts', `${appDir}/vite.config.ts`);
  
  // Copy CSS files
  fs.copyFileSync('src/index.css', `${appDir}/src/index.css`);
  fs.copyFileSync('src/App.css', `${appDir}/src/App.css`);
  
  // Copy vite-env.d.ts
  fs.copyFileSync('src/vite-env.d.ts', `${appDir}/src/vite-env.d.ts`);
  
  // Copy main.tsx with modifications
  const mainTsx = fs.readFileSync('src/main.tsx', 'utf8');
  fs.writeFileSync(`${appDir}/src/main.tsx`, mainTsx);
  
  // Create index.html
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${section.charAt(0).toUpperCase() + section.slice(1)} App</title>
    <meta name="description" content="${section.charAt(0).toUpperCase() + section.slice(1)} Section of ESnet" />
    <meta name="author" content="ESnet" />
    <meta property="og:image" content="/og-image.png" />
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
  fs.writeFileSync(`${appDir}/index.html`, indexHtml);

  // Copy lib, utils, and hooks
  fs.readdirSync('src/lib').forEach(file => {
    fs.copyFileSync(`src/lib/${file}`, `${appDir}/src/lib/${file}`);
  });
  
  fs.readdirSync('src/utils').forEach(file => {
    fs.copyFileSync(`src/utils/${file}`, `${appDir}/src/utils/${file}`);
  });
  
  fs.readdirSync('src/hooks').forEach(file => {
    fs.copyFileSync(`src/hooks/${file}`, `${appDir}/src/hooks/${file}`);
  });
  
  // Copy public assets
  if (fs.existsSync('public/lovable-uploads')) {
    if (!fs.existsSync(`${appDir}/public/lovable-uploads`)) {
      fs.mkdirSync(`${appDir}/public/lovable-uploads`);
    }
    fs.readdirSync('public/lovable-uploads').forEach(file => {
      fs.copyFileSync(`public/lovable-uploads/${file}`, `${appDir}/public/lovable-uploads/${file}`);
    });
  }
  
  // Copy og-image.png if it exists
  if (fs.existsSync('public/og-image.png')) {
    fs.copyFileSync('public/og-image.png', `${appDir}/public/og-image.png`);
  }
  
  // Copy NotFound.tsx
  fs.copyFileSync('src/pages/NotFound.tsx', `${appDir}/src/pages/NotFound.tsx`);
  
  // Copy Navbar, Footer, and other shared components
  fs.copyFileSync('src/components/Navbar.tsx', `${appDir}/src/components/Navbar.tsx`);
  fs.copyFileSync('src/components/Footer.tsx', `${appDir}/src/components/Footer.tsx`);
  fs.copyFileSync('src/components/NetworkVisualization.tsx', `${appDir}/src/components/NetworkVisualization.tsx`);
  fs.copyFileSync('src/components/StatusPanel.tsx', `${appDir}/src/components/StatusPanel.tsx`);
  fs.copyFileSync('src/components/FeatureCard.tsx', `${appDir}/src/components/FeatureCard.tsx`);
  
  // Create UI components directory
  fs.mkdirSync(`${appDir}/src/components/ui`);
  // Copy UI components
  if (fs.existsSync('src/components/ui')) {
    fs.readdirSync('src/components/ui').forEach(file => {
      fs.copyFileSync(`src/components/ui/${file}`, `${appDir}/src/components/ui/${file}`);
    });
  }
});

// Create section-specific App.tsx and copy main page content
sections.forEach(section => {
  const appDir = `${section}_app`;
  const capitalizedSection = section.charAt(0).toUpperCase() + section.slice(1);
  
  // Copy the specific page
  if (section === 'index') {
    fs.copyFileSync('src/pages/Index.tsx', `${appDir}/src/pages/Index.tsx`);
  } else {
    fs.copyFileSync(`src/pages/${capitalizedSection}.tsx`, `${appDir}/src/pages/${capitalizedSection}.tsx`);
  }
  
  // Create App.tsx with only the relevant route
  const appContent = `
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ${section === 'index' ? 'Index' : capitalizedSection} from "./pages/${section === 'index' ? 'Index' : capitalizedSection}";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<${section === 'index' ? 'Index' : capitalizedSection} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
`;
  fs.writeFileSync(`${appDir}/src/App.tsx`, appContent);
  
  // Create README.md with instructions
  const readmeContent = `# ${capitalizedSection} App

This is a standalone application for the ${capitalizedSection} section of ESnet.

## Getting Started

1. Install dependencies:
\`\`\`
npm install
\`\`\`

2. Run the development server:
\`\`\`
npm run dev
\`\`\`

3. Build for production:
\`\`\`
npm run build
\`\`\`

4. Docker build example:
\`\`\`
docker build -t esnet-${section} .
\`\`\`

5. Run the Docker container:
\`\`\`
docker run -p 8080:80 esnet-${section}
\`\`\`
`;
  fs.writeFileSync(`${appDir}/README.md`, readmeContent);
  
  // Create Dockerfile with consistent casing
  const dockerfileContent = `FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Build the app
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine

# Copy built files to Nginx serve directory
COPY --from=build /app/dist /usr/share/nginx/html

# Configure Nginx to handle SPA routing
RUN echo 'server { \\
  listen 80; \\
  location / { \\
    root /usr/share/nginx/html; \\
    index index.html; \\
    try_files $uri $uri/ /index.html; \\
  } \\
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
`;
  fs.writeFileSync(`${appDir}/Dockerfile`, dockerfileContent);
});

console.log("Modular applications created successfully!");
