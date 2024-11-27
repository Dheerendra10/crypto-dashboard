
This documentation provides a detailed overview of the implementation of the Crypto Dashboard. It covers setup instructions, key design and technical choices, and considerations made during development.

Project Overview:
The Crypto Dashboard is a responsive web application built with React.js and @tanstack/react-query, which integrates the CoinGecko API to display cryptocurrency data. The application includes:
Dashboard View: Displays a list of cryptocurrencies with key details.
Search Bar: Allows filtering of cryptocurrencies by name or symbol.
Pagination: Supports browsing through cryptocurrencies' pages.
Responsive Design: Optimized for both desktop and mobile devices.

# Setup Instructions
Prerequisites
1.Node.js (v16 or higher) installed
2. npm or yarn package manager installed


# Installation
# Clone the Repository
1. git clone https://github.com/Dheerendra10/crypto-dashboard.git
2. cd crypto-dashboard
3. npm install
4. npm start
5. The application will be accessible at http://localhost:3000.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


## Learn More

## Performance Optimization
1. React Query caching minimizes redundant API calls.
2. Pagination reduces the amount of data loaded at once.
3. Dynamic fetching ensures only the required data is requested.
## CSS Framework
1. Tailwind CSS FrameWork
2. Custom CSS was used for styling, providing complete control over the design.


# Folder Structure
src/
├── api/
│   └── coinGeckoAPI.ts    # API request functions
├── components/
│   ├── DashboardView.tsx  # Main dashboard component
│   ├── SearchBar.tsx      # Search bar component
│   └── Pagination.tsx     # Pagination component
├── styles/
│   └── styles.css         # Custom CSS styles
├── App.tsx                # Main application component
├── index.tsx              # Entry point

