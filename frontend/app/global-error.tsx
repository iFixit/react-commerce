'use client';

import { Alert, AlertDescription, AlertTitle, Center } from '@chakra-ui/react';
import { FaIcon } from '@ifixit/icons';
import { faCircleExclamation } from '@fortawesome/pro-solid-svg-icons';
import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

interface GlobalErrorProps {
   error: Error & { digest?: string };
   reset: () => void;
}

export default function GlobalError({ error }: GlobalErrorProps) {
   useEffect(() => {
      Sentry.captureException(error, {
         tags: { error_boundary: true },
      });
   }, [error]);
   return (
      <html>
         <body>
            <Center p="4">
               <Alert
                  status="error"
                  variant="subtle"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  height="200px"
                  maxW="1280px"
               >
                  <FaIcon icon={faCircleExclamation} h="10" color="red.500" />
                  <AlertTitle mt={4} mb={1} fontSize="lg">
                     Something went wrong!
                  </AlertTitle>
                  <AlertDescription maxWidth="sm">
                     Please try to reload the page. If the problem persists,
                     please contact{' '}
                     <a href="mailto:support@ifixit.com">support@ifixit.com</a>.
                  </AlertDescription>
               </Alert>
            </Center>
         </body>
      </html>
   );
}
