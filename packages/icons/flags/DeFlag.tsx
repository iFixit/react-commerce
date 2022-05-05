import * as React from 'react';

function SvgDeFlag(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg
         viewBox="0 0 16 12"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <path fill="#272727" d="M0 0h16v12H0z" />
         <path fill="#E31D1C" d="M0 4h16v4H0z" />
         <path fill="#FFD018" d="M0 8h16v4H0z" />
      </svg>
   );
}

export default SvgDeFlag;
