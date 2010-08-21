// Test writing and reading uint32 values in different endiannesses.

var assert = require('assert');
var util = require('./util');
var strtok = require('../lib/strtok');

util.runGenerateTests(
    [function(s) {
        strtok.UINT32_LE.put(s, 0);
    }, '\x00\x00\x00\x00'],
    [function(s) {
        strtok.UINT32_LE.put(s, 0xff);
    }, '\xff\x00\x00\x00'],
    [function(s) {
        strtok.UINT32_BE.put(s, 0);
    }, '\x00\x00\x00\x00'],
    [function(s) {
        strtok.UINT32_BE.put(s, 0xff);
    }, '\x00\x00\x00\xff'],
    [function(s) {
        strtok.UINT32_LE.put(s, 0xaabbccdd);
    }, '\xdd\xcc\xbb\xaa'],
    [function(s) {
        strtok.UINT32_BE.put(s, 0xaabbccdd);
    }, '\xaa\xbb\xcc\xdd']
);

var le = function(v) {
    assert.equal(v, 0x001a001a);
    return strtok.UINT32_BE;
};

var be = function(v) {
    assert.equal(v, 0x1a001a00);
    return strtok.UINT32_LE;
};

util.runParseTests(
    '\x1a\x00\x1a\x00\x1a\x00\x1a\x00\x1a\x00\x1a\x00\x1a\x00\x1a\x00',
    [
        function(v) {
            assert.ok(v === undefined);
            return strtok.UINT32_LE;
        },
        le, be, le, be
]);
