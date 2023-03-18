"use strict";var i=Object.defineProperty;var w=Object.getOwnPropertyDescriptor;var E=Object.getOwnPropertyNames;var N=Object.prototype.hasOwnProperty;var x=(t,e)=>{for(var n in e)i(t,n,{get:e[n],enumerable:!0})},A=(t,e,n,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of E(e))!N.call(t,o)&&o!==n&&i(t,o,{get:()=>e[o],enumerable:!(r=w(e,o))||r.enumerable});return t};var _=t=>A(i({},"__esModule",{value:!0}),t);var v={};x(v,{getSHASync:()=>P,listSync:()=>R});module.exports=_(v);var g=require("os"),D=/^(?<changeType>[ACDMRTUXB])(?<similarity>[0-9]{3})?[ \t]+(?<name>[^ \t]+)[ \t]*(?<newName>[^ \t]+)?$/,L=/^(?<stagedChangeType>[ ACDMRTUXB?!])(?<unStagedChangeType>[ ACDMRTUXB?!])[ \t]+(?<name>[^ \t]+)(( -> )(?<newName>[^ \t]+))?$/,O={A:"added",C:"copied",D:"deleted",M:"modified",R:"renamed",T:"type changed",U:"unmerged",B:"pairing broken"," ":"unmodified","?":"untracked","!":"ignored"};function p(t){return O[t]??"unknown"}function j(t){let e=t.match(L),n={};if(e!=null&&e.groups){let r=p(e.groups.stagedChangeType),o=p(e.groups.unStagedChangeType);n.changeType=r==="unmodified"?o:r,e.groups.newName?(n.name=e.groups.newName,n.oldName=e.groups.name):n.name=e.groups.name}return n}function k(t){let e=t.match(D),n={};return e!=null&&e.groups&&(n.changeType=p(e.groups.changeType),e.groups.newName?(n.name=e.groups.newName,n.oldName=e.groups.name):n.name=e.groups.name),n}function y(t){return t.split(g.EOL).filter(Boolean).map(j).filter(({name:e,changeType:n})=>!!e&&!!n)}function l(t){return t.split(g.EOL).filter(Boolean).map(k).filter(({name:e,changeType:n})=>!!e&&!!n)}var s=require("child_process");function d(t){return t instanceof Buffer?t.toString("utf8"):t}function B(t){throw t.code==="ENOENT"?new Error("git executable not found"):new Error(`internal spawn error: ${t}`)}function u(t,e,n){let r=n("git",t,{cwd:process.cwd(),env:process.env});if(r.error&&B(r.error),r.status===0)return d(r.stdout);throw new Error(e[r.status??0]||`internal git error: ${r.status} (${d(r.stderr)})`)}function h(t=s.spawnSync){let e={129:`'${process.cwd()}' does not seem to be a git repository`};return u(["status","--porcelain"],e,t)}function S(t,e,n=s.spawnSync){let r={128:`revision '${t}' ${e?`(or '${e}') `:""}unknown`,129:`'${process.cwd()}' does not seem to be a git repository`};return u(e?["diff",t,e,"--name-status"]:["diff",t,"--name-status"],r,n)}function c(t=s.spawnSync){return u(["rev-parse","HEAD"],{},t).slice(0,40)}var C=require("path"),U=new Set([".cjs",".cjsx",".coffee",".csx",".cts",".js",".json",".jsx",".litcoffee",".ls",".mjs",".mts",".svelte",".ts",".tsx",".vue",".vuex"]),$=new Set(["modified","added","renamed","copied","untracked"]);function f(t,e=U,n=$){return`^(${t.filter(o=>n.has(o.changeType)).map(({name:o})=>o).filter(o=>e.has((0,C.extname)(o))).join("|")})$`}function m(t){return JSON.stringify(t,null,2)}var b=t=>t,M=new Map([["regex",f],["json",m]]);function T(t,e){return(M.get(e??"unknown")||b)(t)}function P(){return c()}function R(t,e,n){let r=t||c(),o=n||{},a=l(S(r,e));return o.trackedOnly||(a=a.concat(y(h()).filter(({changeType:I})=>I==="untracked"))),T(a,o.outputType)}0&&(module.exports={getSHASync,listSync});
