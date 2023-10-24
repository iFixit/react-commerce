module.exports = {
   meta: {
      type: 'suggestion',
      fixable: 'code',
      docs: {
         description:
            'Report the usage of `new Error` and suggest using `SentryError`',
         category: 'Best Practices',
         recommended: true,
      },
   },
   create: function (context) {
      return {
         NewExpression(node) {
            // Check if the NewExpression is for 'Error'
            if (
               node.callee &&
               node.callee.type === 'Identifier' &&
               node.callee.name === 'Error'
            ) {
               context.report({
                  node,
                  message:
                     'Avoid using new Error; consider using SentryError instead to attach contexts, tags, and more.',
                  fix: function (fixer) {
                     // Suggest replacing 'new Error(...);' with 'new SentryError(...);'

                     const isImported = context
                        .getScope()
                        .through.some(
                           (ref) => ref.identifier.name === 'SentryError'
                        );

                     if (!isImported) {
                        return [
                           fixer.insertTextBeforeRange(
                              [0, 0],
                              "import { SentryError } from '@ifixit/sentry';\n"
                           ),
                           fixer.replaceText(node.callee, 'SentryError'),
                        ];
                     }

                     return fixer.replaceText(node.callee, 'SentryError');
                  },
               });
            }
         },
      };
   },
};
