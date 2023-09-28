import { Enum_Productlist_Type, FindProductListQuery } from '@lib/strapi-sdk';

export const getProductListMock: FindProductListQuery = {
   productLists: {
      data: [
         {
            id: '1714',
            attributes: {
               type: null,
               handle: 'microsoft-surface-laptop-2-m1782',
               deviceTitle: 'Microsoft Surface Laptop 2',
               title: ' Microsoft Surface Laptop 2 (M1782) Parts',
               h1: null,
               tagline:
                  'Replacement parts for your Microsoft Surface Laptop 2 (M1782) model to fix your broken laptop!',
               description:
                  'iFixit has you covered with parts, tools, and free repair guides. Repair with confidence! All of our replacement parts are tested to rigorous standards and backed by our industry-leading warranty.',
               metaDescription:
                  'Microsoft Surface Laptop 2 (M1782) parts for DIY repair. Batteries tested and guaranteed with fast shipping and easy returns.',
               metaTitle: null,
               defaultShowAllChildrenOnLgSizes: null,
               filters: null,
               forceNoindex: null,
               heroImage: {
                  data: null,
               },
               brandLogo: {
                  data: null,
               },
               brandLogoWidth: null,
               parent: {
                  data: {
                     attributes: {
                        type: Enum_Productlist_Type.Parts,
                        title: 'Microsoft Surface Laptop Parts',
                        handle: 'microsoft-surface-laptop',
                        deviceTitle: 'Microsoft Laptop',
                        parent: {
                           data: {
                              attributes: {
                                 type: null,
                                 title: 'PC Laptop Parts',
                                 handle: 'pc-laptop',
                                 deviceTitle: 'PC Laptop',
                                 parent: {
                                    data: {
                                       attributes: {
                                          type: Enum_Productlist_Type.AllParts,
                                          title: 'All Parts',
                                          handle: 'Parts',
                                          deviceTitle: '',
                                          parent: {
                                             data: null,
                                          },
                                       },
                                    },
                                 },
                              },
                           },
                        },
                     },
                  },
               },
               children: {
                  data: [],
               },
               sections: [],
               itemOverrides: [],
            },
         },
      ],
   },
};
