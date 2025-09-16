# Folder Structure


```
├── LICENSE
├── README.md
└── app
    ├── client
    │   ├── .gitignore
    │   ├── README.md
    │   ├── eslint.config.js
    │   ├── index.html
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── src
    │   │   ├── App.css
    │   │   ├── App.jsx
    │   │   ├── api
    │   │   │   └── touristApi.js
    │   │   ├── components
    │   │   │   └── UI
    │   │   │       ├── FloatingActionButton.jsx
    │   │   │       ├── Footer.jsx
    │   │   │       └── Navbar.jsx
    │   │   ├── context
    │   │   │   └── AuthContext.jsx
    │   │   ├── index.css
    │   │   ├── main.jsx
    │   │   ├── pages
    │   │   │   ├── admin
    │   │   │   │   ├── AdminDashboard.jsx
    │   │   │   │   ├── AdminLandingPage.jsx
    │   │   │   │   └── AdminLogin.jsx
    │   │   │   ├── common
    │   │   │   │   ├── About.jsx
    │   │   │   │   └── LandingPage.jsx
    │   │   │   └── tourist
    │   │   │       ├── TouristDashboard.jsx
    │   │   │       ├── TouristLandingPage.jsx
    │   │   │       └── TouristRegistrationPage.jsx
    │   │   └── routes
    │   │       ├── AdminRoutes.jsx
    │   │       ├── ProtectedRoute.jsx
    │   │       └── TouristRoutes.jsx
    │   └── vite.config.js
    └── server
        ├── .gitignore
        ├── app.js
        ├── config
        │   ├── constants.js
        │   └── database.js
        ├── controllers
        │   ├── adminController.js
        │   └── touristController.js
        ├── middleware
        │   ├── adminAuth.js
        │   ├── auth.js
        │   └── errorHandler.js
        ├── models
        │   ├── Alert.js
        │   ├── EFIR.js
        │   ├── GeoFence.js
        │   └── Tourist.js
        ├── package-lock.json
        ├── package.json
        ├── routes
        │   ├── admin.js
        │   └── tourists.js
        ├── server.js
        └── services
            ├── aiService.js
            ├── efirService.js
            └── locationService.js

            
```