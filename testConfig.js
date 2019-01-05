process.env.NODE_ENV = 'test';
require('@babel/register')();
var jsdom = require('jsdom').JSDOM;
var exposedProperties = ['window', 'navigator', 'document'];
var dom = new jsdom('<!DOCTYPE html><html><head></head><body></body></html>', {
  url: "http://localhost"
});
global.window = dom.window;
global.document = dom.window.document;
global.Audio = dom.window.Audio;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});
global.navigator = {
  userAgent: 'node.js'
};
documentRef = document;