import {terser} from 'rollup-plugin-terser';
import dts from "rollup-plugin-dts";
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
        output: 
            {
                file:"dist/getaddress-find-" + version + ".js",
                format:"iife", 
                name:'getAddress',
                sourcemap:  "inline"
            }
        
        ,plugins:[nodeResolve(),ts(
            {tsconfig: {
                declaration: false
            }}
        )]
    },
    {
        input: "dist/getaddress-find.mjs",
        output: 
            {
                file:"dist/getaddress-find-" + version + ".min.js",
                format:"iife",
                name:'getAddress'
            },
        plugins:[terser()]
    }
]