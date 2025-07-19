# Items Manager Frontend Setup

This is a Next.js frontend for the Items REST API backend located in the `250719_API_Project` directory.

## Prerequisites

1. **Backend API must be running**: Start the FastAPI backend first
   ```bash
   cd ../250719_API_Project
   python main.py
   ```
   The API should be available at `http://localhost:8000`

2. **Node.js**: Ensure you have Node.js installed

## Setup and Run

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**: Navigate to `http://localhost:3000`

## Features

- **View all items**: See a list of all items from the database
- **Create new items**: Add new items with name and optional description
- **Real-time updates**: List refreshes automatically after creating items
- **Error handling**: Displays appropriate error messages for API failures
- **Responsive design**: Works on desktop and mobile devices

## API Integration

The frontend connects to the FastAPI backend running on `localhost:8000` with the following endpoints:

- `GET /items` - Fetch all items
- `POST /items` - Create a new item
- `GET /items/{id}` - Get specific item (ready for future features)

## Build for Production

```bash
npm run build
npm start
```

## Troubleshooting

- **"Failed to fetch items"**: Ensure the backend API is running on port 8000
- **CORS errors**: The backend should already have CORS configured for localhost:3000
- **Build errors**: Run `npm run lint` to check for code issues