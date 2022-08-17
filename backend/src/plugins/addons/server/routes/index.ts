export default [
   {
      method: 'POST',
      path: '/seed',
      handler: 'seedController.importContentTypes',
      config: {
         policies: [],
      },
   },
];
