const svg = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="138"
  height="200"
  viewBox="0 0 138 200"
>
  <path d="M69 0 L138 200 C120 150 18 150 0 200z"/>
  <path d="M69 131 m 25 0 a 25 25 0 1 0 -50 0 a 25 25 0 1 0 50 0"/>
</svg>
`;

export default function (rotation) {
  return L.divIcon({
    className: "",
    html: `<span class="pin pin-move"
      style="transform: rotate(${rotation}deg)">${svg}</span>`,
  });
}
