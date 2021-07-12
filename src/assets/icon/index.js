const requireAll = context => context.keys().map(context)

requireAll(require.context('./', true, /\.svg$/))
