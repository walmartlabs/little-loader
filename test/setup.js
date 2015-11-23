"use strict";
/**
 * Test setup for server-side tests.
 */
var expect = require("expect.js");

// Add test lib globals.
global.expect = expect;

// Set test environment
process.env.NODE_ENV = "func";
