import{r as t,j as r}from"./index-BLUMn6ph.js";function b({src:e,alt:c,className:d="",width:a,height:i,priority:f=!1}){const[m,l]=t.useState(""),[s,x]=t.useState(!1),[g,u]=t.useState(!1),o=`data:image/svg+xml;base64,${btoa(`
    <svg width="${a||400}" height="${i||400}" viewBox="0 0 ${a||400} ${i||400}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <circle cx="50%" cy="45%" r="15%" fill="#d1d5db"/>
      <rect x="30%" y="65%" width="40%" height="4%" rx="2%" fill="#d1d5db"/>
      <rect x="35%" y="75%" width="30%" height="3%" rx="1.5%" fill="#e5e7eb"/>
    </svg>
  `)}`;return t.useEffect(()=>{if(!e)return;l(o);const n=new Image;n.onload=()=>{l(e),x(!0)},n.onerror=()=>{u(!0),l(o)},n.src=e},[e,o]),r.jsxs("div",{className:"relative overflow-hidden",children:[r.jsx("img",{src:m,alt:c,className:`transition-all duration-300 ${s?"opacity-100":"opacity-60"} ${d}`,width:a,height:i,loading:f?"eager":"lazy",decoding:"async",style:{filter:s?"none":"blur(5px)",transform:s?"scale(1)":"scale(1.05)"}}),!s&&!g&&r.jsx("div",{className:"absolute inset-0 flex items-center justify-center",children:r.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"})})]})}export{b as O};
