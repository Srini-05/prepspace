import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true'
const base = isGitHubPagesBuild && repositoryName && !repositoryName.endsWith('.github.io')
  ? `/${repositoryName}/`
  : '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
