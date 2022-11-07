import * as React from 'react';

function SvgValve(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg
         width={96}
         height={64}
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <path
            d="M10 42.64V21.36h76v21.28H10zm13.209-16.915l-2.533 9.64-2.532-9.64H15.79l3.8 12.73h2.171l3.8-12.73h-2.353zm13.209 0h-3.076l-3.8 12.73h2.533l.778-3.09h3.873l.778 3.09h2.532l-3.618-12.73zM54.15 36.274h-5.429v-10.55h-2.353v12.731H54.151v-2.181zm10.676-10.55l-2.532 9.64-2.532-9.64h-2.354l3.8 12.731h2.172l3.8-12.73h-2.354zm13.028 7.095h-3.437v-2.002h3.075V29.18h-3.075v-1.82h3.437v-1.637h-5.247v8.73h5.247v-1.634zM34.79 27.726l1.43 5.639h-2.86l1.43-5.639z"
            fill="#F74843"
         />
      </svg>
   );
}

export default SvgValve;
