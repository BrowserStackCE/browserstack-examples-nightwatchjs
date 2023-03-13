![Logo](https://www.browserstack.com/images/static/header-logo.jpg)

# BrowserStack Examples Nightwatchjs <a href="https://nodejs.org"><img src="https://cdn.svgporn.com/logos/nodejs.svg" alt="Node.js" height="22" /></a> <a href="https://nightwatchjs.org"/><image src="https://cdn.svgporn.com/logos/nightwatch.svg" height="22" alt="NightWatch"></a>

## Introduction

Nightwatch.js is an integrated, easy to use End-to-End testing solution for web applications and websites, written in Node.js. It uses the W3C WebDriver API to drive browsers in order to perform commands and assertions on DOM elements.

This BrowserStack Example repository demonstrates a Selenium test framework written in Node.js and Nightwatchjs 1.5 with parallel testing capabilities. The Selenium test test scripts are written for the open source [BrowserStack Demo web application](https://bstackdemo.com) ([Github](https://github.com/browserstack/browserstack-demo-app)). This BrowserStack Demo App is an e-commerce web application which showcases multiple real-world user scenarios. The app is bundled with offers data, orders data and products data that contains everything you need to start using the app and run tests out-of-the-box.

The Selenium test tests are run on different platforms like on-prem, docker and BrowserStack using various run configurations and test capabilities.

---

## Repository setup

-   Clone the repository

-   Ensure you have the following dependencies installed on the machine

    -   Node.js >= 10.17.0
    -   yarn >= 1.22

-   To install repository dependencies run:

    ```sh
    yarn install
    ```

## About the tests in this repository

This repository contains the following Selenium tests:

| Module  | Test name                           | Description                                                                                                                                                                                                                                                                       | Tag     |
| ------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| E2E     | End to End Scenario                 | This test scenario verifies successful product purchase lifecycle end-to-end. It demonstrates the [Page Object Model design pattern](https://www.browserstack.com/guide/page-object-model-in-selenium) and is also the default test executed in all the single test run profiles. | e2e     |
| Login   | Login with given username           | This test verifies the login workflow with different types of valid login users.                                                                                                                                                                                                  | login   |
| Login   | Login as Locked User                | This test verifies the login workflow error for a locked user.                                                                                                                                                                                                                    | login   |
| Offers  | Offers for Mumbai location          | This test mocks the GPS location for Mumbai and verifies that the product offers applicable for the Mumbai location are shown.                                                                                                                                                    | offers  |
| Product | Apply Apple & Samsung Vendor Filter | This test verifies that only Apple and Samsung products shown if the Apple and Samsung vendor filter option is applied.                                                                                                                                                           | product |
| Product | Apply Lowest to Highest Order By    | This test verifies that the product prices are in ascending order when the product sort "Lowest to Highest" is applied.                                                                                                                                                           | product |
| User    | Login as User with no image loaded  | This test verifies that the product images load for user: "image_not_loading_user" on the e-commerce application. Since the images do not load, the test case assertion fails.                                                                                                    | user    |
| User    | Login as User with existing Orders  | This test verifies that existing orders are shown for user: "existing_orders_user"                                                                                                                                                                                                | user    |

---

## Test infrastructure environments

-   [On-premise](#on-premise)
-   [BrowserStack](#browserstack)



## Test Reporting

-   [Allure reports](#generating-allure-reports)

---

# On Premise

This infrastructure points to running the tests on your own machine using a browser (e.g. Chrome) using the browser's driver executables (e.g. ChromeDriver for Chrome). Selenium enables this functionality using WebDriver for many popular browsers.

## Om-Prem Prerequisites

-   For this infrastructure configuration (i.e on-premise), ensure that the ChromeDriver is downloaded successfully via node_modules

Note: The ChromeDriver version must match the Chrome browser version on your machine.

## Running Your Tests

### Run a specific test on your own machine

-   How to run the test?

    To run the default test scenario (e.g. End to End Scenario) on your own machine, use the following command:

    ```sh
    yarn on-prem-single
    ```

    To run a specific test file, use the following command with the additional 'tag-name' argument:

    ```sh
    yarn on-prem --tag <tag-name>
    # for eg: yarn on-prem --tag user
    ```

    where, the argument 'tag-name' can be any tag configured in this repository.

    E.g. "user", "login" or any other tag as outlined in [About the tests in this repository](#About-the-tests-in-this-repository) section.

-   Output

    This run profile executes a specific test scenario on a single browser instance on your own machine.

### Run the entire test suite on your own machine

-   How to run the test?

    To run the entire test suite on your own machine, use the following command:

    ```sh
    yarn on-prem-suite
    ```

-   Output

    This run profile executes the entire test suite sequentially on a single browser, on your own machine.


# BrowserStack

[BrowserStack](https://browserstack.com) provides instant access to 2,000+ real mobile devices and browsers on a highly reliable cloud infrastructure that effortlessly scales as testing needs grow.

## BrowserStack Prerequisites

-   Create a new [BrowserStack account](https://www.browserstack.com/users/sign_up) or use an existing one.
-   Identify your BrowserStack username and access key from the [BrowserStack Automate Dashboard](https://automate.browserstack.com/) and export them as environment variables using the below commands.

    -   For \*nix based and Mac machines:

    ```sh
    export BROWSERSTACK_USERNAME=<browserstack-username> &&
    export BROWSERSTACK_ACCESS_KEY=<browserstack-access-key>
    ```

    -   For Windows:

    ```shell
    set BROWSERSTACK_USERNAME=<browserstack-username>
    set BROWSERSTACK_ACCESS_KEY=<browserstack-access-key>
    ```

    Alternatively, you can also hardcode username and access_key objects in the [browserstack.js](resources/conf/runners/browserstack.js) file and [browserstack_local.js](resources/conf/runners/browserstack_local.js) file.

Note:

-   We have configured a list of test capabilities in the [bstackOptions](resources/conf/runners/browserstack.js or resources/conf/runners/browserstack_local.js) file. You can certainly update them based on your device / browser test requirements.
-   The exact test capability values can be easily identified using the [Browserstack Capability Generator](https://browserstack.com/automate/capabilities)

## Running Your Tests

### Run a specific test on BrowserStack

In this section, we will run a single test on Chrome browser on Browserstack. 

-   How to run the test?

    -   To run the default test scenario (e.g. End to End Scenario) on your own machine, use the following command:

    ```sh
    yarn bstack-single
    ```

    To run a specific test file, use the following command with the additional 'tag-name' argument:

    ```sh
    yarn bstack --tag <tag-name>
    # for eg yarn bstack --tag user
    ```

    where, the argument 'tag-name' can be any tag configured in this repository.

    E.g. "user", "login" or any other tag as outlined in [About the tests in this repository](#About-the-tests-in-this-repository) section.

-   Output

    This run profile executes a single test on a single browser on BrowserStack. Please refer to your [BrowserStack dashboard](https://automate.browserstack.com/) for test results.

### Run the entire test suite in parallel on a single BrowserStack browser

In this section, we will run the tests in parallel on a single browser on Browserstack. 

-   How to run the test?

    To run the entire test suite in parallel on a single BrowserStack browser, use the following command:

    ```sh
    yarn bstack-parallel
    ```

-   Output

    This run profile executes the entire test suite in parallel on a single BrowserStack browser. Please refer to your [BrowserStack dashboard](https://automate.browserstack.com/) for test results.


### Run the entire test suite in parallel on multiple BrowserStack browsers

In this section, we will run the tests in parallel on multiple browsers on Browserstack. 

-   How to run the test?

    To run the entire test suite in parallel on multiple BrowserStack browsers, use the following command:

    ```sh
    yarn bstack-parallel-multiple
    ```

### [Web application hosted on internal environment] Running your tests on BrowserStack using BrowserStackLocal

#### Prerequisites

-   Clone the [BrowserStack demo application](https://github.com/browserstack/browserstack-demo-app) repository.
    ```sh
    git clone https://github.com/browserstack/browserstack-demo-app
    ```
-   Please follow the README.md on the BrowserStack demo application repository to install and start the dev server on localhost.
-   In this section, we will run a single test case to test the BrowserStack Demo app hosted on your local machine i.e. localhost. 
-   Further details for successfully creating a BrowserStackLocal connection can be found here:

    -   [Local Testing with Automate](https://www.browserstack.com/local-testing/automate)
    -   [NightWatch BrowserStack Plugin](https://www.npmjs.com/package/@nightwatch/browserstack)

### [Web application hosted on internal environment] Run a specific test on BrowserStack using BrowserStackLocal

-   How to run the test?

    -   To run the default test scenario (e.g. End to End Scenario) on a single BrowserStack browser using BrowserStackLocal, use the following command:

    ```sh
    yarn bstack-local
    ```

    To run a specific test file, use the following command with the additional 'tag-name' argument:

    ```sh
    nightwatch -c resources/conf/runners/browserstack_local.js --env browserstack.local_firefox
    ```


-   Output

    This run profile executes a single test on an internally hosted web application on a single browser on BrowserStack. Please refer to your BrowserStack dashboard(https://automate.browserstack.com/) for test results.

### [Web application hosted on internal environment] Run the entire test suite in parallel on a single BrowserStack browser using BrowserStackLocal

In this section, we will run the test cases to test the internally hosted website in parallel on a single browser on Browserstack. 

-   How to run the test?

    To run the entire test suite in parallel on a single BrowserStack browser using BrowserStackLocal, use the following command:

    ```sh
    yarn bstack-local-parallel
    ```

-   Output

    This run profile executes the entire test suite on an internally hosted web application on a single browser on BrowserStack. Please refer to your [BrowserStack dashboard](https://automate.browserstack.com/) for test results.

-   Note: By default, this execution would run maximum 10 test threads in parallel on BrowserStack. Refer to the section ["Configuring the maximum parallel test threads for this repository"](#Configuring-the-maximum-parallel-test-threads-for-this-repository) for updating the parallel thread count based on your requirements.

### [Web application hosted on internal environment] Run the entire test suite in parallel on multiple BrowserStack browser using BrowserStackLocal

In this section, we will run the test cases to test the internally hosted website in parallel on multiple browsers on Browserstack. 

-   How to run the test?

    To run the entire test suite in parallel on a single BrowserStack browser using BrowserStackLocal, use the following command:

    ```sh
    yarn bstack-local-parallel-multiple
    ```

-   Output

    This run profile executes the entire test suite on an internally hosted web application on multiple browsers on BrowserStack. Please refer to your [BrowserStack dashboard](https://automate.browserstack.com/) for test results.

-   Note: By default, this execution would run maximum 10 test threads in parallel on BrowserStack. Refer to the section ["Configuring the maximum parallel test threads for this repository"](#Configuring-the-maximum-parallel-test-threads-for-this-repository) for updating the parallel thread count based on your requirements.


## Additional Resources

-   View your test results on the [BrowserStack Automate dashboard](https://www.browserstack.com/automate)
-   Documentation for writing [Automate test scripts in Nightwatchjs](https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/nightwatch)
-   Customizing your tests capabilities on BrowserStack using our [test capability generator](https://www.browserstack.com/automate/capabilities)
-   [List of Browsers & mobile devices](https://www.browserstack.com/list-of-browsers-and-platforms?product=automate) for automation testing on BrowserStack
-   [Using Automate REST API](https://www.browserstack.com/automate/rest-api) to access information about your tests via the command-line interface
-   Understand how many parallel sessions you need by using our [Parallel Test Calculator](https://www.browserstack.com/automate/parallel-calculator?ref=github)
-   For testing public web applications behind IP restriction, [Inbound IP Whitelisting](https://www.browserstack.com/local-testing/inbound-ip-whitelisting) can be enabled with the [BrowserStack Enterprise](https://www.browserstack.com/enterprise) offering


