import pkg from "./package.json" assert { type: 'json' };
import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';



export default [
    
    {
        input: "lib/Index.js",
        output: {
            file:"dist/getaddress-find-" + pkg.version + ".mjs",
            format:"es",
        }
        ,plugins:[nodeResolve()]
    },
    {
        input: "lib/Index.js",
        output: 
            {
                file:"dist/getaddress-find-" + pkg.version + ".js",
                format:"iife", 
                name:'getAddress',
                sourcemap:  "inline"
            }
        
        ,plugins:[nodeResolve()]
    },
    {
        input:"dist/getaddress-find-" + pkg.version + ".js",
        output: 
            {
                file:"dist/getaddress-find-" + pkg.version + ".min.js",
                format:"iife",
                name:'getAddress'
            },
        plugins:[terser()]
    }
]