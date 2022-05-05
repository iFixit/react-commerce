import * as React from 'react';

function SvgGbFlag(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg
         viewBox="0 0 16 12"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <path d="M0 0h16v12H0V0z" fill="#2E4E9D" />
         <path
            d="M16 10.438L10.083 6 16 1.562V0h-2.083L8 4.438 2.083 0H0v1.563L5.917 6 0 10.438V12h2.083L8 7.563 13.917 12H16v-1.563z"
            fill="#fff"
         />
         <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0v.625L7.167 6 0 11.375V12h.833L8 6.625 15.167 12H16v-.625L8.833 6 16 .625V0h-.833L8 5.375.833 0H0z"
            fill="#DC251C"
         />
         <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 4V0h4v4h6v4h-6v4H6V8H0V4h6z"
            fill="#fff"
         />
         <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 5V0h2v5h7v2H9v5H7V7H0V5h7z"
            fill="#DC251C"
         />
      </svg>
   );
}

export default SvgGbFlag;
