import * as React from 'react';

function SvgFrFlag(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg
         viewBox="0 0 16 12"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <path fill="#F5F8FB" d="M0 0h16v12H0z" />
         <path fill="#41479B" d="M0 0h5v12H0z" />
         <path fill="#E51D1D" d="M11 0h5v12h-5z" />
      </svg>
   );
}

export default SvgFrFlag;
