module.exports = {
  plugins: [
    {
      module: require('sourcebit-source-contentful'),
      options: {
        accessToken: process.env['CONTENTFUL_ACCESS_TOKEN'],
        environment: 'master',
        spaceId: 'pyifz91mcau0'
      }
    },
    {
      module: require('sourcebit-transform-assets'),
      options: {
        assetPath: function(entry,asset) {
        return [
          "public/images",
          [asset.__metadata.id, asset.fileName].join("-")
        ].join("/");
        },
        publicUrl: function(entry,asset,assetPath) {
        return [
          "/images",
          [asset.__metadata.id, asset.fileName].join("-")
        ].join("/");
        }
      }
    },
    {
      module: require('sourcebit-target-next'),
      options: {
        pages: function(objects) {
        return objects.reduce((pages, object) => {
          if ((object.__metadata.modelName === 'about') && (object.__metadata.source === 'sourcebit-source-contentful')) {
            return pages.concat({ path: '/{slug}', page: object });
          }
          if ((object.__metadata.modelName === 'blogPost') && (object.__metadata.source === 'sourcebit-source-contentful')) {
            return pages.concat({ path: '/posts/{slug}', page: object });
          }
          return pages;
        }, [])
        },
        commonProps: function(objects) {
        return {
          posts: objects.reduce((acc, object) => object.__metadata.modelName === 'blogPost' ? acc.concat(object) : acc, [])
        }
        }
      }
    }
  ]
}
