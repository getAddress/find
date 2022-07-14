import {terser} from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import {version} from "./package.json"; 
import ts from "rollup-plugin-ts";



export default [
    
    {
        input: "src/GetAddress.ts",
        output: {
            file:"dist/getaddress-find.mjs",
            format:"es",
        }
        ,plugins:[nodeResolve(),ts()]
    },
    {
        input: "src/GetAddress.ts",
        output: [
            {
                file:"dist/getaddress-find-" + version + ".js",
                format:"iife", 
                name:'getAddress',
                sourcemap:  "inline"
            },
            {
                file:"dist/getaddress-find.js",
                format:"iife",
                name:'getAddress',
                sourcemap:  "inline"
            }
        ],
        plugins:[nodeResolve(),ts(
            {tsconfig: {
                declaration: false
            }}
        )]
    },
    {
        input: "dist/getaddress-find.mjs",
        output: [
            {
                file:"dist/getaddress-find-" + version + ".min.js",
                format:"iife",
                name:'getAddress'
            },
            {
                file:"dist/getaddress-find.min.js",
                format:"iife",
                name:'getAddress'
            }
        ],
        plugins:[terser()]
    }
]