var Metalsmith = require('metalsmith')
var markdown = require('metalsmith-markdown')
var jade = require('metalsmith-jade')
var layouts = require('metalsmith-layouts')
var watch = require('metalsmith-watch')
//var permalinks  = require('metalsmith-permalinks')

console.log('Start the building process...')

Metalsmith(__dirname)
  .metadata({
    title: "My Static Site & Blog",
    description: "It's about saying »Hello« to the World.",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/"
  })
  .source('./src/pages')
  .destination('./www')
  .clean(false)
  .use(markdown())
  .use(jade())
  //.use(permalinks())
  .use(layouts({
    engine: 'handlebars',
    directory: './src/layouts'
  }))
  .use(
    watch({
      paths: {
        "${source}/**/*": true,
        "./src/layouts/*": "**/*.*",
      },
      livereload: true,
    })
  )
  .build(function(err, files) {
    if (err) { throw err }
    console.log('End of the building process.')
  })
