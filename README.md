# browserstack-examples-nightwatchjs

## To run the tests

1. `yarn test:browserstack` - Run all test suites on browserstack (default on chrome browser only)
2. `yarn test:browserstack:e2e` - Run e2e test suite
3. `yarn test:browserstack:offers` - Run offers test suite
4. `yarn test:browserstack:user` - Run user test suite
5. `yarn test:browserstack:login` - Run login test suite
6. `yarn test:browserstack:product` - Run product test suite
7. `docker-compose up -d && yarn test:self_hosted && docker-compose down` - Run all test suites on self-hosted docker

## Run acc to profiles

1. `yarn test:browserstack:single` - Run single test on BS
2. `yarn test:onprem:single` - Run single test on prem
3. `yarn test:docker:single` - Run single test on docker
4. `yarn test:browserstack:parallel` - Run entire suite in parallel on BS
5. `yarn test:onprem:suite` - Run entire suite on prem
6. `yarn test:docker:parallel` - Run entire suite in parallel on docker
7. `yarn test:browserstack:parallel_multiple` - Run entire suite in parallel on BS across different browsers
8. `yarn test:browserstack:local` - Run locally hosted app single test on browserstack
9. `yarn test:browserstack:local_parallel` - Run locally hosted app suite tests on browserstack in parallel
10. `yarn test:browserstack:local_parallel_multiple` - Run locally hosted app suite tests on browserstack in parallel across different browsers
11. `yarn generate-reports` - Run after any tests to generate reports
12. `yarn open-reports` - To view the generated reports
13. `yarn test:browserstack:mobile` - run tests on mobile devices
