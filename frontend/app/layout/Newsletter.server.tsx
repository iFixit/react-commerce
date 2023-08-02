export type NewsletterHeaderProps = {
   title: string;
   subtitle: string;
};

export function NewsletterHeader({ title, subtitle }: NewsletterHeaderProps) {
   return (
      <div className="text-left">
         <span className="block text-sm font-semibold text-white leading-[21px]">
            {title}
         </span>
         <span className="block text-gray-300 text-sm font-normal mt-1.5 leading-[21px]">
            {subtitle}
         </span>
      </div>
   );
}
