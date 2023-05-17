export default [
   {
      method: 'POST',
      path: '/seed',
      handler: 'seedController.importContentTypes',
      config: {
         policies: [],
      },
   },
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
];
