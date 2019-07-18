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

var CustomCredentials = require('./CustomCredentials');

function CredentialsFactory() {
    this.credentials = new CustomCredentials();
}

CredentialsFactory.prototype.configure = function (groupConfig, properties) {
    this.credentials.principal = groupConfig.name;
    this.credentials.password = Buffer.from(groupConfig.password);
    this.credentials.endpoint = properties.endpoint;
};

CredentialsFactory.prototype.newCredentials = function () {
    return this.credentials;
};

CredentialsFactory.prototype.destroy = function () {
};

module.exports = CredentialsFactory;
