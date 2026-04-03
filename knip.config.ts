import type { KnipConfig } from "knip"

const config: KnipConfig = {
  ignore: [
    "src/api/generated_api.ts", // Auto-generated api client
  ],
  ignoreBinaries: ["dot"],
}

export default config
