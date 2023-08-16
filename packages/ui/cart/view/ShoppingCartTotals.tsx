import { Card, CardBody, CardHeader } from '@chakra-ui/react';
import * as React from 'react';

export function ShoppingCartTotals() {
   return (
      <Card>
         <CardHeader textAlign="center">Summary</CardHeader>
         <CardBody>Some totals</CardBody>
      </Card>
   );
}
