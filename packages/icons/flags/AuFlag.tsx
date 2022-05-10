import * as React from 'react';

function SvgAuFlag(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg
         viewBox="0 0 16 12"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <path fill="#2E4E9D" d="M0 0h16v12H0z" />
         <mask
            id="au-flag_svg__a"
            maskUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={10}
            height={7}
         >
            <path fill="#C4C4C4" d="M0 0h10v7H0z" />
         </mask>
         <g mask="url(#au-flag_svg__a)">
            <path d="M11-1.167L-1 8.167" stroke="#fff" strokeWidth={2.5} />
            <path d="M11-1.167L-1 8.167" stroke="#DC251C" strokeWidth={0.75} />
            <path d="M-1-1.167l12 9.334" stroke="#fff" strokeWidth={2.5} />
            <path d="M-1-1.167l12 9.334" stroke="#DC251C" strokeWidth={0.75} />
            <path d="M5 0v7M0 3.5h10" stroke="#fff" strokeWidth={3} />
            <path d="M5 0v7M0 3.5h10" stroke="#DC251C" strokeWidth={2} />
         </g>
         <circle cx={12.5} cy={2.5} r={0.5} fill="#fff" />
         <circle cx={11.5} cy={5.5} r={0.5} fill="#fff" />
         <circle cx={14.5} cy={4.5} r={0.5} fill="#fff" />
         <circle cx={13.5} cy={6.5} r={0.5} fill="#fff" />
         <circle cx={12.5} cy={9.5} r={0.5} fill="#fff" />
         <circle cx={5} cy={10} r={1} fill="#fff" />
      </svg>
   );
}

export default SvgAuFlag;
