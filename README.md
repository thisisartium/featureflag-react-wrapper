# Getting Started with FeatureFlag React Wrapper

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This app is intended to become both a demonstration and a library:

* As a demonstration, it shows how you can configure a simple React component to be aware of feature flags
* As a library, it provides functionality for safely wrapping a feature flag system in whatever tooling you want. 
  We provide LaunchDarkly implementation as an example.

## Where We Are Today

 * There's a wrapper component and associated unit tests that prove you can unit test code that is
   feature flagged. The test also includes a simple unit test driven feature flag system `testFeatureFlags`. 
   Check out `src/FeatureFlagWrapper.test.js`.
 * There's a LaunchDarkly plugin (`src/LaunchDarkly.js`) that provides proper events into the wrapper.
 * There's a sample app (`src/App.js`) that uses a LaunchDarkly feature flag. You'll need to make a
   `.env` file that contains a value for `REACT_APP_LAUNCH_DARKLY_CLIENT_ID` which you can get from 
   the LaunchDarkly console: Account Settings > Projects > Client-side ID for whichever env you care about.

## Where We Want To Go From Here

 * Package this project up as an NPM module so you can reuse the `<FeatureFlagWrapper>` component instead
   of copy-pasting the two relevant files into your local project.
 * Make an environment-variable driven plugin so we aren't coupled to LaunchDarkly.

## Running the Sample App

`yarn start`

You'll need to have access to our LaunchDarkly account or change the feature flag
that the app uses.