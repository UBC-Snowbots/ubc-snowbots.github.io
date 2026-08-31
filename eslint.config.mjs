import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // We deliberately use plain <img> rather than next/image. The site is a
      // static export (`output: "export"`), so there is no runtime image
      // optimizer for next/image to call — it would fall back to serving the
      // original bytes anyway, minus the control we get from a plain tag.
      // Every <img> here is paired with a fixed-aspect container plus explicit
      // loading/decoding hints, so the CLS and lazy-loading benefits the rule
      // protects are already handled.
      "@next/next/no-img-element": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
