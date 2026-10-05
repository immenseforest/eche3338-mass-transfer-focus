const fs=require('node:fs'),path=require('node:path');
// Plain HTML/CSS/JS remains unchanged in public; the Worker artifact has client/server folders.
const root=path.resolve('dist'),client=path.join(root,'client');
fs.mkdirSync(client,{recursive:true});
for(const e of fs.readdirSync('public',{withFileTypes:true})){
  fs.cpSync(path.join('public',e.name),path.join(client,e.name),{recursive:true});
}
fs.mkdirSync(path.join(root,'server'),{recursive:true});
fs.copyFileSync('worker/index.mjs',path.join(root,'server/index.js'));
console.log('Built Worker and client assets.');
