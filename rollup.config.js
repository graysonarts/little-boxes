import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import eslint from "@rollup/plugin-eslint";
import packageJson from "./package.json";

const extensions = [".js", ".ts", ".jsx", ".tsx"];

export default {
  input: "src/app.ts",
  external: [],
  output: [
    {
      file: packageJson.main,
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [resolve({ extensions }), commonjs(), eslint(), typescript()],
};
