import { defineConfig } from 'vitest/config'
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [viteTsconfigPaths()],
  test: {
    environmentMatchGlobs: [['src/infra/controllers/**', 'prisma']]
  }
})