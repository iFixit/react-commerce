import * as React from 'react';

function SvgFacebookLogo(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg
         viewBox="0 0 16 16"
         fill="currentColor"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <path d="M16 1.714v12.572c0 .946-.768 1.714-1.714 1.714h-3.047V9.671h2.165l.31-2.414H11.24V5.714c0-.7.193-1.175 1.197-1.175h1.278V2.382a17.19 17.19 0 00-1.864-.096c-1.843 0-3.107 1.125-3.107 3.193V7.26H6.57v2.414h2.175V16H1.714A1.715 1.715 0 010 14.286V1.714C0 .768.768 0 1.714 0h12.572C15.232 0 16 .768 16 1.714z" />
      </svg>
   );
}

export default SvgFacebookLogo;
