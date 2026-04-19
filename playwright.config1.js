// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
  retries: 1,
  timeout: 30*1000,// increase the timeout for debug mode to avoid failure
  expect: {
    timeout:15000,
  },
  reporter : 'html',

  use: {

    browserName : 'chromium',
    headless : false,
    screenshot : 'on',
    trace : 'on',//off/on/retain-on-failure,trace.playwright.dev-url to check the trace files.
    //viewport : {width:720,height:720}
    //...devices['iPhone 11'],
  },
 
  

 });
 module.exports=config  

