# browserstack-examples-nightwatchjs

## To run the tests

1. `yarn test:browserstack` - Run all test suites on browserstack (default on chrome browser only)
2. `yarn test:browserstack:e2e` - Run e2e test suite
3. `yarn test:browserstack:offers` - Run offers test suite
4. `yarn test:browserstack:user` - Run user test suite
5. `yarn test:browserstack:login` - Run login test suite
6. `yarn test:browserstack:product` - Run product test suite
7. `docker-compose up -d && yarn test:self_hosted && docker-compose down` - Run all test suites on self-hosted docker
