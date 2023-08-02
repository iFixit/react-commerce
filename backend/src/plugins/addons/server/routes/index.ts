export default [
   {
      method: 'POST',
      path: '/backup',
      handler: 'seedController.backup',
      config: {
         policies: [],
      },
   },
   {
      method: 'POST',
      path: '/import',
      handler: 'seedController.import',
      config: {
         policies: [],
      },
   },
   {
      method: 'GET',
      path: '/content-types',
      handler: 'contentTypesController.findManyContentTypes',
      config: {
         policies: [],
      },
   },
   {
      method: 'POST',
      path: '/export-csv',
      handler: 'bulkOperationsController.exportCSV',
      config: {
         policies: [],
      },
   },
   {
      method: 'POST',
      path: '/import-csv',
      handler: 'bulkOperationsController.importCSV',
      config: {
         policies: [],
      },
   },
];
