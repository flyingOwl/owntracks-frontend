/* eslint-disable max-len */
const svg = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="138"
  height="200"
  viewBox="0 0 138 200"
>
  <path d="M138 69 C138 105 96 171 69 200 C42 171 0 105 0 69 C0 31 31 0 69 0 C107 0 138 31 138 69z"/>
  <path d="M 69 69 m 35 0 a 35 35 0 1 0 -70 0 a 35 35 0 1 0 70 0"/>
</svg>
`;
/* eslint-enable */

export default L.divIcon({
  className: "",
  html: `<span class="pin pin-default">${svg}</span>`,
});
