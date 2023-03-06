

const bstackOptions = {
  'bstack:options' : {
      "os" : "OS X",
      "osVersion" : "Big Sur",
      "buildName" : "browserstack-build-1",
      "sessionName" : "BStack nightwatch snippet",
      "seleniumVersion" : "4.0.0",
      userName: '${BROWSERSTACK_USERNAME}',
      accessKey: '${BROWSERSTACK_ACCESS_KEY}',
  },
}



const browserStack = {
  webdriver: {
    start_process: false
  },

  selenium: {
    host: 'hub.browserstack.com',
    port: 443
  },

  desiredCapabilities: {
      browserName: 'chrome',
    ...bstackOptions
  }
}

const nightwatchConfigs = {
  src_folders: ["src/tests/suites"],
  live_output: true,
  plugins: ['@nightwatch/browserstack'],
      // browserstack plugin settings...
               '@nightwatch/browserstack': {
        browserstackLocal: true, // set true to manage browserstack local tunnel. Defaults to false.
      },

  test_settings: {
    default: {
      launch_url: 'https://localhost:3000',
      desiredCapabilities:{
        browserName: 'chrome',
        ...bstackOptions
      },
    },
	

    browserstack:  {
      ...browserStack
    },

    "browserstack.chrome": {
      ...browserStack,
      desiredCapabilities:{
        browserName: 'chrome',
        ...bstackOptions
      }
    },
    "browserstack.firefox": {
      ...browserStack,
      desiredCapabilities:{
        browserName: 'firefox',
        ...bstackOptions
      }
    },
    "browserstack.edge": {
      ...browserStack,
      desiredCapabilities:{
        browserName: 'Edge',
        ...bstackOptions
      }
    },
    // capabilities to run local test on BrowserStack
    'browserstack.local': {
      ...browserStack,
      desiredCapabilities: {
        browserName: 'chrome',
        ...bstackOptions
      },
    },
    'browserstack.local_chrome': {
      ...browserStack,
      desiredCapabilities: {
        browserName: 'chrome',
        ...bstackOptions
      }
    },
    'browserstack.local_firefox': {
      ...browserStack,
      desiredCapabilities: {
        browserName: 'firefox',
        ...bstackOptions
      }
    }
  }
}

module.exports = nightwatchConfigs;