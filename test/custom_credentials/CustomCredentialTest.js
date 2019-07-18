/*
 * Copyright (c) 2008-2019, Hazelcast, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var Controller = require('./../RC');
var markEnterprise = require('../Util').markEnterprise;
var Client = require('../../lib').Client;
var Config = require('../../lib').Config.ClientConfig;
var CustomCredentials = require('./CustomCredentials');
var CredentialsFactory = require('./CredentialsFactory');
var IllegalStateError = require('../../lib/HazelcastError').IllegalStateError;
var HazelcastError = require('../../lib/HazelcastError').HazelcastError;


describe('CustomCredentialsTest', function () {
    var cluster;
    var client;

    before(function () {
        return Controller.createCluster().then(function (cl) {
            cluster = cl;
            return Controller.startMember(cluster.id);
        });
    });

    beforeEach(function () {
        markEnterprise(this);
        client = null;
    });

    afterEach(function () {
        if (client) {
            return client.shutdown();
        }
    });

    after(function () {
        return Controller.shutdownCluster(cluster.id);
    });

    it('should throw if credentials and credentials factory are set', function () {
        var config = new Config();
        config.securityConfig.credentials = new CustomCredentials(config.groupConfig.name,
            '127.0.0.1', Buffer.from(config.groupConfig.password));
        config.securityConfig.credentialsFactoryConfig.implementation = new CredentialsFactory();
        return expect(Client.newHazelcastClient(config).then(function (hz) {
                client = hz;
            })).to.be.rejectedWith(IllegalStateError);
    });

    it('should connect to cluster with custom credentials', function () {
        var config = new Config();
        config.securityConfig.credentials = new CustomCredentials(config.groupConfig.name,
            '127.0.0.1', Buffer.from(config.groupConfig.password));
        return Client.newHazelcastClient(config).then(function (hz) {
            client = hz;
            expect(client.getLifecycleService().isRunning()).to.be.true;
        });
    });

    it('should not connect with invalid credentials', function () {
        var config = new Config();
        config.securityConfig.credentials = new CustomCredentials('in', 'va', Buffer.from('lid'));
        return expect(Client.newHazelcastClient(config).then(function (hz) {
                client = hz;
            })).to.be.rejectedWith(HazelcastError);
    });

    it('should connect to cluster with credentials factory', function () {
        var config = new Config();
        config.securityConfig.credentialsFactoryConfig.implementation = new CredentialsFactory();
        config.securityConfig.credentialsFactoryConfig.properties.endpoint = '127.0.0.1';
        return Client.newHazelcastClient(config).then(function (hz) {
            client = hz;
            expect(client.getLifecycleService().isRunning()).to.be.true;
        });
    });
});
