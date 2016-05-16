'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var esc = {
    sp: ' ',
    nl: '\n'
};

/**
 * Initialize a new `Specs` matrix test reporter.
 *
 * @param {Runner} runner
 * @api public
 */

var CucumberReporter = (function (_events$EventEmitter) {
    _inherits(CucumberReporter, _events$EventEmitter);

    function CucumberReporter(baseReporter, config) {
        var _this = this;

        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, CucumberReporter);

        _get(Object.getPrototypeOf(CucumberReporter.prototype), 'constructor', this).call(this);

        this.baseReporter = baseReporter;

        this.on('suite:start', function (p) {
            if (p.parent) {
                _this.printLine('suite', '' + esc.nl + esc.sp + esc.sp + esc.sp + esc.sp + 'Scenario: ' + p.title);
            } else {
                _this.printLine('medium', '' + esc.nl + esc.sp + esc.sp + 'Feature: ' + p.title);
            }
        });

        this.on('test:pending', function (p) {
            _this.printLine('pending', '' + esc.sp + esc.sp + esc.sp + esc.sp + esc.sp + esc.sp + p.title);
        });

        this.on('test:pass', function (p) {
            _this.printLine('green', '' + esc.sp + esc.sp + esc.sp + esc.sp + esc.sp + esc.sp + p.title);
        });

        this.on('test:fail', function (p) {
            _this.printLine('bright fail', '' + esc.sp + esc.sp + esc.sp + esc.sp + esc.sp + esc.sp + p.title);
            _this.printLine('error message', '' + esc.nl + esc.sp + esc.sp + esc.sp + esc.sp + esc.sp + esc.sp + p.err.message + esc.nl);
            _this.printLine('error stack', '' + esc.nl + esc.sp + esc.sp + esc.sp + esc.sp + esc.sp + esc.sp + p.err.stack + esc.nl);
        });

        this.on('test:end', function () {});

        this.on('end', function () {
            _this.printEpilogueEnd();
        });
    }

    _createClass(CucumberReporter, [{
        key: 'printLine',
        value: function printLine(status, line) {
            var color = this.baseReporter.color;

            if (!status || !line) {
                return;
            }

            process.stdout.write(color(status, line + esc.nl));
        }
    }, {
        key: 'printEpilogueEnd',
        value: function printEpilogueEnd() {
            var _baseReporter = this.baseReporter;
            var color = _baseReporter.color;
            var stats = _baseReporter.stats;

            var results = stats.getCounts();
            var total = results.failures + results.passes + results.pending;
            var separator = function separator(condition) {
                return condition ? color('suite', ', ') : '';
            };

            var steps = color('suite', '' + esc.nl + total + ' step' + (total === 1 ? '' : 's') + ' (');
            var passed = color('green', results.passes + ' passed');
            var failed = !results.failures ? '' : separator(results.passes) + color('bright fail', results.failures + ' failed');
            var pending = !results.pending ? '' : separator(results.passes || results.failures) + color('pending', results.pending + ' pending');
            var end = color('suite', ')' + esc.nl + esc.nl);

            process.stdout.write('' + steps + passed + failed + pending + end);
        }
    }]);

    return CucumberReporter;
})(_events2['default'].EventEmitter);

exports['default'] = CucumberReporter;
module.exports = exports['default'];
