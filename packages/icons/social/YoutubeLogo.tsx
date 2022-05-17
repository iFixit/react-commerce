import * as React from 'react';

function SvgYoutubeLogo(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg
         viewBox="0 0 18 16"
         fill="currentColor"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <path d="M17.177 3.878a2.144 2.144 0 00-1.51-1.52C14.338 2 9 2 9 2s-5.337 0-6.668.359A2.144 2.144 0 00.823 3.878C.467 5.218.467 8.012.467 8.012s0 2.795.356 4.135a2.113 2.113 0 001.51 1.494C3.662 14 9 14 9 14s5.337 0 6.668-.359a2.113 2.113 0 001.509-1.494c.356-1.34.356-4.135.356-4.135s0-2.795-.356-4.134zM7.255 10.55V5.475l4.46 2.537-4.46 2.538z" />
      </svg>
   );
}

export default SvgYoutubeLogo;
