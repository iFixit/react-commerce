import * as React from 'react';

function SvgGlobe(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg
         viewBox="0 0 24 24"
         fill="currentColor"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.519 4.393a7.966 7.966 0 00-3.176 1.95A7.965 7.965 0 004.063 11h2.996c.227-2.363 1.078-4.626 2.46-6.607zm4.962 0c1.382 1.98 2.233 4.244 2.46 6.607h2.997a7.966 7.966 0 00-2.281-4.657 7.967 7.967 0 00-3.176-1.95zm.45 6.607C14.66 8.627 13.65 6.358 12 4.46 10.35 6.357 9.339 8.626 9.07 11h5.86zM9.07 13h5.86c-.269 2.373-1.28 4.642-2.93 6.54-1.65-1.898-2.661-4.167-2.93-6.54zm-2.011 0H4.062a7.965 7.965 0 002.281 4.657l-.701.701.701-.701a7.966 7.966 0 003.176 1.95c-1.382-1.98-2.233-4.244-2.46-6.607zm7.422 6.607c1.382-1.98 2.233-4.244 2.46-6.607h2.997a7.965 7.965 0 01-2.281 4.657l.707.707-.707-.707a7.966 7.966 0 01-3.176 1.95zM12.006 22a9.969 9.969 0 007.065-2.929c3.905-3.905 3.905-10.237 0-14.142-3.905-3.905-10.237-3.905-14.142 0A9.968 9.968 0 002 11.983v.034a9.968 9.968 0 002.93 7.054A9.969 9.969 0 0011.993 22h.012z"
         />
      </svg>
   );
}

export default SvgGlobe;
