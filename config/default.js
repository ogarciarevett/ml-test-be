module.exports = {
  port: process.env.PORT || 7000,
  mlAPI: {
    baseURL: 'https://api.mercadolibre.com',
    defaultAuthor: {
      name: 'Omar',
      lastName: 'Garcia'
    },
    testLimits: {
      totalItemsBySearch: 10
    }
  },
  swagger: {
    users: {
      ml: 'omartest'
    },
    options: {
      swaggerDefinition: {
        info: {
          title: 'ML gateway test',
          version: '1.0.0',
          description: 'This is a minimal API gateway of ML'
        },
        basePath: '/'
      },
      apis: [
        './swagger.yaml', // static swagger YAML
        '**/*Router*.js' // dinamic router documentation
      ]
    }
  }
};
