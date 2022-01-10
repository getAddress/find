import {terser} from 'rollup-plugin-terser';
import dts from "rollup-plugin-dts";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import {version} from "./package.json";

export default [
    {
        input: "@types/GetAddress.d.ts",
        output: [{ file: "@types/getaddress-find.d.ts", format: "es" }],
        plugins: [dts()],
    },
     {
        input: "src/GetAddress.js",
        output: {
            file:"dist/getaddress-find-" + version + ".js",
            format:"iife", 
            name:'getAddress'
        }
        ,plugins:[nodeResolve()]
    },
    {
        input: "src/GetAddress.js",
        output: {
            file:"dist/getaddress-find-" + version + ".mjs",
            format:"es"
        }
        ,plugins:[nodeResolve()]
    },
    {
        input: "dist/getaddress-find-" + version + ".mjs",
        output: {
            file:"dist/getaddress-find-" + version + ".min.js",
            format:"iife",
            name:'getAddress'
        },
        plugins:[terser()]
    }
];
