import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'fs'

if (fs.existsSync('.env.local')) {
  const envConfig = fs.readFileSync('.env.local', 'utf-8')
  envConfig.split('\n').forEach(line => {
    const parts = line.split('=')
    const key = parts[0]?.trim()
    const val = parts.slice(1).join('=').trim()
    if (key && val && !process.env[key]) {
      process.env[key] = val
    }
  })
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'netlify-functions-dev-server',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url && req.url.startsWith('/.netlify/functions/analyze-financial-message')) {
            try {
              const handler = (await server.ssrLoadModule('/netlify/functions/analyze-financial-message.mjs')).default
              let body = ''
              req.on('data', chunk => { body += chunk })
              req.on('end', async () => {
                const mockReq = {
                  method: req.method,
                  text: async () => body,
                }
                const response = await handler(mockReq, {})
                const responseText = await response.text()
                res.statusCode = response.status
                res.setHeader('Content-Type', 'application/json')
                res.end(responseText)
              })
            } catch (err) {
              console.error('Dev server Netlify function error:', err)
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }))
            }
          } else {
            next()
          }
        })
      }
    }
  ],
})

