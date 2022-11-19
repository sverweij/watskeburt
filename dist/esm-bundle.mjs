import{EOL as m}from"os";var C=/^(?<changeType>[ACDMRTUXB])(?<similarity>[0-9]{3})?[ \t]+(?<name>[^ \t]+)[ \t]*(?<newName>[^ \t]+)?$/,I=/^(?<stagedChangeType>[ ACDMRTUXB?!])(?<unStagedChangeType>[ ACDMRTUXB?!])[ \t]+(?<name>[^ \t]+)(( -> )(?<newName>[^ \t]+))?$/,E={A:"added",C:"copied",D:"deleted",M:"modified",R:"renamed",T:"type changed",U:"unmerged",B:"pairing broken"," ":"unmodified","?":"untracked","!":"ignored"};function s(n){return E[n]||"unknown"}function w(n){let e=n.match(I),t={};if(e!=null&&e.groups){let r=s(e.groups.stagedChangeType),o=s(e.groups.unStagedChangeType);t.changeType=r==="unmodified"?o:r,e.groups.newName?(t.name=e.groups.newName,t.oldName=e.groups.name):t.name=e.groups.name}return t}function x(n){let e=n.match(C),t={};return e!=null&&e.groups&&(t.changeType=s(e.groups.changeType),e.groups.newName?(t.name=e.groups.newName,t.oldName=e.groups.name):t.name=e.groups.name),t}function T(n){return n.split(m).filter(Boolean).map(w).filter(({name:e,changeType:t})=>Boolean(e)&&Boolean(t))}function l(n){return n.split(m).filter(Boolean).map(x).filter(({name:e,changeType:t})=>Boolean(e)&&Boolean(t))}import{spawnSync as i}from"child_process";function d(n){return n instanceof Buffer?n.toString("utf8"):n}function N(n){throw n.code==="ENOENT"?new Error("git executable not found"):new Error(`internal spawn error: ${n}`)}function g(n,e,t){let r=t("git",n,{cwd:process.cwd(),env:process.env});if(r.error&&N(r.error),r.status===0)return d(r.stdout);throw new Error(e[r.status??0]||`internal git error: ${r.status} (${d(r.stderr)})`)}function h(n=i){let e={129:`'${process.cwd()}' does not seem to be a git repository`};return g(["status","--porcelain"],e,n)}function y(n,e,t=i){let r={128:`revision '${n}' ${e?`(or '${e}') `:""}unknown`,129:`'${process.cwd()}' does not seem to be a git repository`};return g(e?["diff",n,e,"--name-status"]:["diff",n,"--name-status"],r,t)}function p(n=i){return g(["rev-parse","HEAD"],{},n).slice(0,40)}import{extname as A}from"path";var _=new Set([".cjs",".cjsx",".coffee",".csx",".cts",".js",".json",".jsx",".litcoffee",".ls",".mjs",".mts",".svelte",".ts",".tsx",".vue",".vuex"]),D=new Set(["modified","added","renamed","copied","untracked"]);function u(n,e=_,t=D){return`^(${n.filter(o=>t.has(o.changeType)).map(({name:o})=>o).filter(o=>e.has(A(o))).join("|")})$`}var L=2;function c(n){return JSON.stringify(n,null,L)}var O=n=>n,B=new Map([["regex",u],["json",c]]);function f(n,e){return(B.get(e??"unknown")||O)(n)}function Y(){return p()}function V(n,e,t){let r=n||p(),o=t||{},a=l(y(r,e));return o.trackedOnly||(a=a.concat(T(h()).filter(({changeType:S})=>S==="untracked"))),f(a,o.outputType)}export{Y as getSHASync,V as listSync};
