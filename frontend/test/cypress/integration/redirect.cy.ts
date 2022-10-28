describe('/parts page', () => {
   it('redirects to correct sitemap', () => {
      cy.request({ url: '/Parts/sitemap.xml', followRedirect: false }).then(
         (response) => {
            expect(response.status).to.eq(308);
            expect(response.headers.location).to.match(
               /\/sitemap\/parts\.xml$/
            );
         }
      );

      cy.request({ url: '/Tools/sitemap.xml', followRedirect: false }).then(
         (response) => {
            expect(response.status).to.eq(308);
            expect(response.headers.location).to.match(
               /\/sitemap\/tools\.xml$/
            );
         }
      );

      cy.request({ url: '/Shop/sitemap.xml', followRedirect: false }).then(
         (response) => {
            expect(response.status).to.eq(308);
            expect(response.headers.location).to.match(
               /\/sitemap\/marketing\.xml$/
            );
         }
      );
   });
});

export {};
