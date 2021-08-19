export type ClientArgs = {
   domain: string;
   accessToken: string;
   version?: string;
};

export class StorefrontClient {
   domain: string;
   accessToken: string;
   version: string;

   constructor(args: ClientArgs) {
      this.domain = args.domain;
      this.accessToken = args.accessToken;
      this.version = args.version || '2021-07';
   }

   async request<Data = any, Variables = any>(
      query: string,
      variables: Record<string, any>
   ): Promise<Data> {
      const response = await fetch(
         `https://${this.domain}/api/${this.version}/graphql.json`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'x-shopify-storefront-access-token': this.accessToken,
            },
            body: JSON.stringify({
               query,
               variables,
            }),
         }
      );
      const result = await response.json();
      return result;
   }
}
