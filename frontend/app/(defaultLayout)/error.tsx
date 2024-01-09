'use client';

import { Alert, AlertDescription, AlertTitle, Center } from '@chakra-ui/react';
import { faCircleExclamation } from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';
import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

interface ErrorBoundaryProps {
   error: Error & { digest?: string };
   reset: () => void;
}

export default function ErrorBoundary({ error }: ErrorBoundaryProps) {
   useEffect(() => {
      Sentry.captureException(error, {
         tags: { error_boundary: true },
      });
   }, [error]);
   return (
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
               Please try to reload the page. If the problem persists, please
               contact{' '}
               <a href="mailto:support@ifixit.com">support@ifixit.com</a>.
            </AlertDescription>
         </Alert>
      </Center>
   );
}
