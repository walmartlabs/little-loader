/**
 * Test setup for client-side tests.
 */
// TODO: Add expect.js + ie8 compat.
// https://github.com/walmartlabs/little-loader/issues/17

/*globals window:false*/
var chai = require("chai");
var sinonChai = require("sinon-chai");

// --------------------------------------------------------------------------
// Chai / Mocha configuration.
// --------------------------------------------------------------------------
// Integration
chai.use(sinonChai);

// Exports
window.expect = chai.expect;

// Mocha (part of static include).
window.mocha.setup({
  ui: "bdd",
  bail: false
});

// --------------------------------------------------------------------------
// Bootstrap
// --------------------------------------------------------------------------
// Use webpack to infer and `require` tests automatically.
var testsReq = require.context(".", true, /\.spec\.js$/);
testsReq.keys().map(testsReq);
