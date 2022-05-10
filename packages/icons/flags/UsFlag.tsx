import * as React from 'react';

function SvgUsFlag(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg
         viewBox="0 0 16 12"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <path fill="#EEF3F8" d="M0 0h16v11H0z" />
         <path fill="#2150BC" d="M0 0h9v7H0z" />
         <path
            fill="#DC251C"
            d="M9 0h7v1H9zM9 2h7v1H9zM9 4h7v1H9zM9 6h7v1H9zM0 8h16v1H0zM0 10h16v1H0z"
         />
         <path
            fill="#C5D0EC"
            d="M1 1h1v1H1zM3 1h1v1H3zM5 1h1v1H5zM7 1h1v1H7zM1 3h1v1H1zM3 3h1v1H3zM5 3h1v1H5zM2 4h1v1H2zM4 4h1v1H4zM6 4h1v1H6zM2 2h1v1H2zM4 2h1v1H4zM6 2h1v1H6zM7 3h1v1H7zM1 5h1v1H1zM3 5h1v1H3zM5 5h1v1H5zM7 5h1v1H7z"
         />
      </svg>
   );
}

export default SvgUsFlag;
