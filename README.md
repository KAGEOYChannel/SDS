# NISN Search Pro

Modern, responsive, and mobile-friendly NISN (Nomor Induk Siswa Nasional) search website optimized for Android devices.

## Features
- 📱 **Mobile-First Design**: Optimized for touch interaction and various screen sizes.
- ⚡ **Real-time Search**: Fast searching with debounce for better performance.
- 📊 **Excel Powered**: Data is loaded directly from a local `.xlsx` file.
- 🌙 **Dark Mode**: Supports system theme preferences.
- 📋 **One-tap Copy**: Easily copy NISN numbers to clipboard.
- 🎨 **Modern UI**: Clean aesthetic with smooth animations using Framer Motion.

## Project Structure
- `src/App.tsx`: Main application container and UI components.
- `src/lib/excel.ts`: Logic for parsing Excel files using SheetJS.
- `src/hooks/useNISNData.ts`: Data fetching and search filtering logic.
- `public/data.xlsx`: The data source file.

## Setup & Operation

### 1. File Format
The application expects an Excel file named `data.xlsx` in the `public/` folder.
The file should have at least the following columns:
- **Nama** (or "Full Name", "Name")
- **NISN**

### 2. Updating Data
To update the student database:
1. Open the `public/` directory.
2. Replace the existing `data.xlsx` with your new file.
3. Ensure the filename remains `data.xlsx`.
4. The application will automatically pick up the new data on the next reload.

## Deployment
This app is built with React and Vite. To deploy:
1. Run `npm run build`.
2. Serve the contents of the `dist/` folder.
3. Ensure the `data.xlsx` file stays in the same relative path as when it was in the `public/` folder.

## Development
- `npm install`: Install dependencies.
- `npm run dev`: Start development server.
- `npm run build`: Build for production.
