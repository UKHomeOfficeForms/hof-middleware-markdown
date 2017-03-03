'use strict';

const reqres = require('reqres');
const chai = require('chai');
global.expect = chai.expect;
global.sinon = require('sinon');
global.request = reqres.req;
global.response = reqres.res;

chai.use(require('sinon-chai'));
