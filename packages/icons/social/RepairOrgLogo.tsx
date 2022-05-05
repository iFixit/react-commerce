import * as React from 'react';

function SvgRepairOrgLogo(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg
         viewBox="0 0 18 16"
         fill="currentColor"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.588 8l-3.397 6H3.397L0 8l3.397-6h6.794l3.397 6zM8.984 4.132L11.174 8l-2.19 3.868h-4.38L2.414 8l2.19-3.868h4.38z"
         />
         <path
            d="M12.038 2l3.508 6.107L12.16 14h2.454L18 8.107 14.492 2h-2.454z"
            fill="#39444D"
         />
      </svg>
   );
}

export default SvgRepairOrgLogo;
