(function () {

  'use strict';

  var assert = require('assert');
  var fs = require('fs');
  var path = require('path');

  var spawn = require('child_process').spawn;

  module.exports = function () {

    var helper = this;

    this.Given(/^I run "([^"]*)"$/, function (runLine, callback) {

      var splitCommand = runLine.split(' ');
      var command = splitCommand.splice(0, 1)[0];
      var args = splitCommand;

      var proc = spawn(command, args, {
        cwd: helper.world.cwd,
        stdio: null,
        env: process.env
      });

      proc.stdout.on('data', function (data) {
        console.log(data.toString());
      });

      proc.stderr.on('data', function (data) {
        console.error(data.toString());
      });

      proc.on('exit', function (code, signal) {
        if (code !== 0) {
          callback.fail('Exit code was ' + code);
        } else {
          callback();
        }

      });

    });

    this.Given(/^I cd to "([^"]*)"$/, function (directory, callback) {
      helper.world.cwd = path.resolve(helper.world.cwd, directory);
      callback();
    });


    this.Given(/^I start meteor$/, function (callback) {

      var toOmit = [
        'ROOT_URL',
        'PORT',
        'MOBILE_DDP_URL',
        'MOBILE_ROOT_URL',
        'MONGO_OPLOG_URL',
        'MONGO_URL',
        'METEOR_PRINT_ON_LISTEN',
        'METEOR_PARENT_PID',
        'TMPDIR',
        'APP_ID',
        'OLDPWD'
      ];

      var currentEnv = _.omit(process.env, toOmit);

      helper.world.meteor = spawn('meteor', ['-p', '3030'], {
        cwd: helper.world.cwd,
        stdio: null,
        detached: true,
        env: currentEnv
      });

      var onMeteorData = Meteor.bindEnvironment(function (data) {
        var stdout = data.toString();
        console.log('[meteor-output]', stdout);
        if (stdout.match(/=> App running at/i)) {
          console.log('[meteor-output] Meteor started');
          helper.world.meteor.stdout.removeListener('data', onMeteorData);
          callback();
        }
      });
      helper.world.meteor.stdout.on('data', onMeteorData);

    });



    this.Then(/^I should see a green dot in the the velocity html reporter$/, function (callback) {
      // Write code here that turns the phrase above into concrete actions
      callback.pending();
    });

    this.Then(/^I click the green dot$/, function (callback) {
      // Write code here that turns the phrase above into concrete actions
      callback.pending();
    });

    this.Then(/^I should see "([^"]*)" in the Velocity reporter$/, function (arg1, callback) {
      // Write code here that turns the phrase above into concrete actions
      callback.pending();
    });

    this.When(/^I navigate to "([^"]*)"$/, function (arg1, callback) {
      // Write code here that turns the phrase above into concrete actions
      callback.pending();
    });


  };

})();