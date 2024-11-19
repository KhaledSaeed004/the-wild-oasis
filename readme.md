# The Wild Oasis React Practice Project

Main project in Jonas's React Course with some customizations.

## Features

-   **Component-Based Architecture**: Organized code into reusable components.
-   **Routing**: Implemented navigation with `react-router-dom`.
-   **API Integration**: Fetched and displayed data from SupaBase Project API.
-   **Styling**: Styled using styled-components.

## Technologies Used

-   **React**
-   **React Router**
-   **Tanstack Query**
-   **Styled-Components / JSS**

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

-   Node.js (v14 or later)
-   npm (v6 or later) or yarn

### Installation

1. **Clone the repository**:

    ```
        git clone https://github.com/your-username/react-practice-project.git
    ```

2. **Navigate to the project directory**:

cd THE-WILD-OASIS

3. **Install dependencies**:

npm install or yarn install

4.  **Running the Project**:

    Start the development server:

        npm start

    Open your browser and go to http://localhost:5173 to see the app.

src
│ App.jsx
│ main.jsx
├── contexts
│ └── DarkModeContext.jsx
├── hooks
│ ├── useLocalStorageState.js
│ ├── useLoseFocus.js
│ └── DarkModeContext.jsx
├── features
│ ├── authentication
│ | └── ...
│ ├── bookings
│ | └── ...
│ ├── cabins
│ | └── ...
│ ├── check-in-out
│ | └── ...
│ ├── dashboard
│ | └── ...
│ └── settings
│ └── ...
├── pages
│ ├── Booking.jsx
│ ├── Bookings.jsx
│ ├── Cabins.jsx
│ ├── Checkin.jsx
│ ├── Dashboard.jsx
│ ├── Login.jsx
│ ├── PageNotFound.jsx
│ ├── Settings.jsx
│ └── Users.jsx
├── services
│ ├── apiAuth.js
│ ├── apiBookings.js
│ ├── apiCabins.js
│ ├── apiSettings.js
│ └── supabase.js
├── styles
│ └── GlobalStyles.js
├── ui
│ └── ...
└── utils
├── constants.js
├── helpers.js
└── navItems.js
