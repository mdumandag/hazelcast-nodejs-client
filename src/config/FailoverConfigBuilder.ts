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

import * as Promise from 'bluebird';
import {ClientFailoverConfig} from './ClientFailoverConfig';
import {tryGetArray, tryGetNumber} from '../Util';
import {HazelcastError} from '../HazelcastError';
import {JsonConfigLocator} from './JsonConfigLocator';
import {ConfigBuilder} from './ConfigBuilder';

export class FailoverConfigBuilder {
    static readonly DEFAULT_FILE_NAME = 'hazelcast-client-failover.json';
    static readonly ENV_VARIABLE_NAME = 'HAZELCAST_CLIENT_FAILOVER_CONFIG';

    private clientFailoverConfig: ClientFailoverConfig = new ClientFailoverConfig();
    private loadedJson: any;
    private configLocator: JsonConfigLocator;

    constructor(filePath?: string) {
        if (filePath === undefined) {
            this.configLocator = new JsonConfigLocator(FailoverConfigBuilder.DEFAULT_FILE_NAME,
                FailoverConfigBuilder.ENV_VARIABLE_NAME);
        } else {
            this.configLocator = new JsonConfigLocator(filePath, null);
        }
    }

    loadConfig(): Promise<void> {
        return this.configLocator.load().then(() => {
            const loadedBuffer = this.configLocator.getBuffer();
            if (loadedBuffer) {
                this.loadedJson = JSON.parse(loadedBuffer.toString());
            }
        });
    }

    build(): Promise<ClientFailoverConfig> {
        return this.handleConfig(this.loadedJson)
            .then(() => {
                return this.clientFailoverConfig;
            }).catch(e => {
                return Promise.reject(new HazelcastError('Error parsing config: ' + e.message, e));
            });
    }

    private handleConfig(jsonObject: any): Promise<void> {
        const promises: Array<Promise<void>> = [];
        for (const key in jsonObject) {
            if (key === 'clients') {
                promises.push(this.handleClients(jsonObject[key]));
            } else if (key === 'tryCount') {
                promises.push(this.handleTryCount(jsonObject[key]));
            }
        }
        return Promise.all(promises).thenReturn();
    }

    private handleClients(jsonObject: any): Promise<void> {
        const promises: Array<Promise<void>> = [];
        const clientConfigs = tryGetArray(jsonObject);
        for (const index in clientConfigs) {
            const clientConfig = clientConfigs[index];
            const configBuilder = new ConfigBuilder(clientConfig);
            promises.push(configBuilder.loadConfig()
                .then(() => {
                    this.clientFailoverConfig.addClientConfig(configBuilder.build());
                }));
        }
        return Promise.all(promises).thenReturn();
    }

    private handleTryCount(jsonObject: any): Promise<void> {
        this.clientFailoverConfig.tryCount = tryGetNumber(jsonObject);
        return Promise.resolve();
    }
}
