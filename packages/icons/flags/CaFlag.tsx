import * as React from 'react';

function SvgCaFlag(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg
         viewBox="0 0 16 12"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <path fill="#F5F8FB" d="M0 0h16v12H0z" />
         <path fill="#E31D1C" d="M4 0v12H0V0zM16 0v12h-4V0z" />
         <path
            d="M6.91 4.024L8 2.5l1.09 1.524v1.298l1.91.216L9.636 7.27l-1.09.433-.355 1.167a.2.2 0 01-.382 0l-.354-1.167-1.091-.433L5 5.54l1.91-.217V4.024z"
            fill="#DC251C"
         />
      </svg>
   );
}

export default SvgCaFlag;
