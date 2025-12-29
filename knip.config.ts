import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  ignore: [
    'src/api/generated_api.ts', // Auto-generated api client
    'public/config.js', // Used via index.html
  ],
  ignoreBinaries: ['dot'],
}

export default config
