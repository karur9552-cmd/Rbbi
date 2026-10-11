# Gmail Mobile UI Replica

A pixel-perfect, interactive replica of the Gmail Android mobile app home screen with search, drawer, compose, and inbox views.

## 🚀 How to Deploy to Vercel

### Method 1: Deploy with Vercel CLI
```bash
npm install -g vercel
vercel
```

### Method 2: Deploy via GitHub / GitLab / Bitbucket
1. Extract this zip file into a folder on your computer.
2. Initialize a git repository and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/gmail-mobile.git
   git push -u origin main
   ```
3. Go to [vercel.com/new](https://vercel.com/new)
4. Import your repository.
5. Vercel will automatically detect:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **Deploy**!

### Local Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```
