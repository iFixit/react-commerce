module.exports = {
   meta: {
      type: 'suggestion',
      fixable: 'code',
      docs: {
         description: 'Ensure Sentry.withScope callback never calls throw',
         category: 'Best Practices',
         recommended: true,
      },
   },
   create: function (context) {
      let isSentryWithScope = false;

      return {
         CallExpression(node) {
            if (
               node.callee.type === 'MemberExpression' &&
               node.callee.object &&
               node.callee.object.name === 'Sentry' &&
               node.callee.property &&
               node.callee.property.name === 'withScope'
            ) {
               isSentryWithScope = true;
            }
         },
         'CallExpression:exit': function (node) {
            if (isSentryWithScope) {
               const callee = node.callee;
               if (
                  callee.type === 'MemberExpression' &&
                  callee.object &&
                  callee.object.name === 'Sentry' &&
                  callee.property &&
                  callee.property.name === 'withScope'
               ) {
                  isSentryWithScope = false;
               }
            }
         },
         ThrowStatement(node) {
            if (isSentryWithScope) {
               context.report({
                  node,
                  message:
                     'Do not use throw in Sentry.withScope callback.\nSentry will not capture errors thrown in this callback.\n\nYou likely want to use `throw new SentryError(message, sentryData)` instead',
               });
            }
         },
      };
   },
};
