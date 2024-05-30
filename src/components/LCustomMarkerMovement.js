/* eslint-disable max-len */
const svg = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="691.429"
  height="1007.429"
  viewBox="0 0 182.94 266.549"
>
  <path d="M91.5 0 L0 266 L 91.5 200 L182.94 266 z"/>
  <path d="M91.5 110 L13 250 L 91.5 160 L170 250 z"/>
</svg>
`;
/* eslint-enable */

export default function(rotation) {
  return L.divIcon({
    className: "",
    html: `<span class="move" style="transform: rotate(${rotation}deg)">${svg}</span>`,
  });
}
