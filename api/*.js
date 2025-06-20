{
  "version": 2,
  "builds": [
    {
      "src": "vite.config.ts",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "api/login.ts",
      "use": "@vercel/node"
    },
    {
      "src": "api/logout.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/login",
      "methods": ["POST", "OPTIONS"],
      "dest": "api/login.ts"
    },
    {
      "src": "/api/logout",
      "methods": ["POST", "OPTIONS"],
      "dest": "api/logout.ts"
    },
    {
      "src": "/.*",
      "dest": "index.html",
      "status": 200
    }
  ]
}
