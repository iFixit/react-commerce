describe('/parts page', () => {
   const user = cy;

   it('redirects to correct sitemap', () => {
      user
         .request({ url: '/Parts/sitemap.xml', followRedirect: false })
         .then((response) => {
            expect(response.status).to.eq(308);
            expect(response.headers.location).to.match(
               /\/sitemap\/parts\.xml$/
            );
         });

      user
         .request({ url: '/Tools/sitemap.xml', followRedirect: false })
         .then((response) => {
            expect(response.status).to.eq(308);
            expect(response.headers.location).to.match(
               /\/sitemap\/tools\.xml$/
            );
         });

      user
         .request({ url: '/Shop/sitemap.xml', followRedirect: false })
         .then((response) => {
            expect(response.status).to.eq(308);
            expect(response.headers.location).to.match(
               /\/sitemap\/marketing\.xml$/
            );
         });
   });
});

export {};
