const json=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
export default {
  async fetch(request,env){
    const url=new URL(request.url);
    if(url.pathname!=='/api/presence')return env.ASSETS.fetch(request);
    if(request.method!=='POST')return json({error:'Method not allowed'},405);
    if(request.headers.get('Origin')!==url.origin)return json({error:'Same-origin request required'},403);
    const ip=request.headers.get('CF-Connecting-IP');
    if(!env.DB||!env.VISITOR_HASH_SECRET||!ip)return json({error:'Visitor statistics unavailable'},503);
    try{
      // Keyed digest only. No raw address, location, user agent, or document data is stored.
      const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(env.VISITOR_HASH_SECRET),{name:'HMAC',hash:'SHA-256'},false,['sign']);
      const digest=await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(ip));
      const hash=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
      const now=Math.floor(Date.now()/1000),cutoff=now-300;
      const results=await env.DB.batch([
        env.DB.prepare('DELETE FROM active_visitors WHERE last_seen < ?').bind(cutoff),
        env.DB.prepare('INSERT INTO active_visitors (address_hash,last_seen) VALUES (?,?) ON CONFLICT(address_hash) DO UPDATE SET last_seen=excluded.last_seen').bind(hash,now),
        env.DB.prepare('SELECT COUNT(*) AS active FROM active_visitors WHERE last_seen >= ?').bind(cutoff)
      ]);
      return json({active:results[2].results[0].active,windowSeconds:300,updatedAt:now});
    }catch{console.error('Presence storage unavailable');return json({error:'Visitor statistics unavailable'},503);}
  }
};
