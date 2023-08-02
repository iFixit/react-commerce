import { AppProviders } from '@components/common';
import React from 'react';
import { Footer } from './layout/Footer.server';

import './globals.css';

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body>
            <AppProviders>
               <div className="flex flex-col min-h-screen">
                  {children}
                  {/* @ts-ignore Upgrading typescript should solve */}
                  <Footer />
               </div>
            </AppProviders>
         </body>
      </html>
   );
}
