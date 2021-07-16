# Framework Design Principles and Fundamentals

> This document describes how this examples respository is structured and what are the design principles being followed.

## Table Of Contents

1. [Folder Structure](#folder-structure)

2. [How to extend your test framework](#how-to-extend-your-test-framework)

3. [Add or remove new devices](#add-or-remove-new-devices)

4. [Configure BrowserStackLocal](#configure-browserstacklocal)

## Folder Structure

```bash
.
├── docker
│   └── docker-compose.yml
├── package.json
├── resources
│   ├── conf
│   │   ├── caps
│   │   │   ├── browserstack.json
│   │   │   └── docker.json
│   │   └── runners
│   │       ├── base_config.js
│   │       ├── browserstack.js
│   │       ├── browserstack_local.js
│   │       ├── docker.js
│   │       └── on-prem.js
│   └── data
│       ├── login.json
│       └── users.json
├── src
│   ├── app
│   │   └── pages
│   │       ├── checkout.js
│   │       ├── home.js
│   │       ├── login.js
│   │       └── orders.js
│   └── tests
│       ├── suites
│       │   ├── e2e
│       │   │   └── index.test.js
│       │   ├── login
│       │   │   ├── data-driven.test.js
│       │   │   └── index.test.js
│       │   ├── offers
│       │   │   └── index.test.js
│       │   ├── product
│       │   │   └── index.test.js
│       │   └── user
│       │       └── index.test.js
│       └── utils
│           └── hooks.js
└── yarn.lock
```

Starting from the top, this is what the following directories/files contain:

-   docker/:

    This folder contains the docker compose file required to start a selenium grid on Docker

-   package.json:

    This is the file which node.js uses to track a particular project/respository and it's dependencies

-   resources/:

    -   conf/:

        -   caps/:

            This folder defines the device capabilites on which the tests are to be executed. There are multiple files according to the different infrastructure that will be used

            -   browserstack.json:
                This is the configuration file which is used to store the BrowserStack Username, BrowserStack Access Key and capabilites for devices to run tests on BrowserStack infrastructure.
            -   docker.json:
                This is the configuration file which is used to run tests on the Selenium servers which are setup on Docker environment/infrastructure.

        -   runners/:

            This folder contains runner files which read the capabilities file and run tests on the specified Infrastructure

            -   base_config.js:

                This file defines the base configuration which will be extended by all other runners. It sets the source to find the test files from, along with path to the Page Object Model source and an output directory

            -   browserstack_local.js:

                This runner defines the starting and stoping of BrowserStack Local

            -   browserstack.js:

                This runner reads the browserstack.json from capability folder and sets up the necessary objects to start a test on BrowserStack.

            -   docker.js:

                This runner reads the docker.json from capability folder and sets up the necessary objects to start a test on Selenium Grid hosted on Docker

            -   on-prem.js:

                This runner uses a chromedriver installed by the yarn package manager as a part of the project dependencies and runs the tests on the same

    -   data/:

        This folder contains data for Data Driven tests

-   src/:

    This folder contains the test code base, page object models and utilities that can be used by the tests like hooks.

    -   app/pages/:

        This folder contains the page object models and this path is being referred in the base_config.js for the same

    -   tests/:

        -   suites/:

            This is the folder that contains the test code base and this path is referred in the base_config.js for the same

        -   utils/:

            This folder contains any utilites that would be required by the test suites. Examples: hooks, logging, stubs, etc.

## How to extend your test framework

To extend your existing framework using the principles used here, you need to make sure that you are implementing/overiding the following properties:

-   `Runners`:

    Runners are an important part of how the tests are being executed for Nightwatch.js. Internally Nightwatch.js will use the runner code to create a connection to the browser driver. Modify the fields in the `base_config.js` to meet your test scripts.

-   `Capabilities`:

    All the runner files pick up their respective capabilites from resources/conf/caps folder. All the capability files are JSON files and we pick certains keys from this file to determine the infrastructure. The following keys should be present in these files:

    -   `server`: This key defines the Selenium server URL
    -   `defaultUrl`: The URL to application under test
    -   `project, build` _(optional)_: Specify the build version of the project under testing
    -   `username, access_key` _(optional)_: The username and access key required as authentication by the Selenium server
    -   `local_args` _(optional)_: These are the arguments you need to paas BrowserStack Local. Refer [Configure BrowserStackLocal](#configure-BrowserStackLocal)
    -   _`<device_name>`_: This defines the capability for each browser that you want to test on

-   `Test Commands`:

    The test commands for various infrastructures are placed in `package.json`. Please use appropriate commands from it and modify the paths to runner files

## Add or remove new devices

To add new devices, head over to [capabilites generator](https://www.browserstack.com/automate/capabilities), use NodeJS as language and copy the desired capabilities into `browserstack.json` file inside capabilities folder. Sample to add new devices:

```json
{
    ...
    "chrome-beta": {
        "os" : "OS X",
        "os_version" : "Big Sur",
        "browserName" : "Chrome",
        "browser_version" : "latest-beta"
    },
    "chrome90": {
        "os" : "OS X",
        "os_version" : "Big Sur",
        "browserName" : "Chrome",
        "browser_version" : "90",
    }
    ...
}
```

To run tests on these environment, specify the key value in --env flag, for eg. `--env chrome-beta,chrome90`

## Configure BrowserStackLocal

If your tests are connecting to internal/private environments and you want to use BrowserStack Local to connect to them, then you can use the `local_args` in the capabilites file to configure the BrowserStack Local. Possible arguments can be found at [Local testing with Automate](https://www.browserstack.com/local-testing/automate) and [Flags for binary](https://www.browserstack.com/local-testing/binary-params)
