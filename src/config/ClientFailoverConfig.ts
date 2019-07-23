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

import {ClientConfig} from './Config';

/**
 * Config class to configure multiple client configs to be used by single client instance
 * The client will try to connect them in given order.
 * When the connected cluster fails or the client blacklisted from the cluster via the management center,
 * the client will search for alternative clusters with given configs.
 */
export class ClientFailoverConfig {
    /**
     * Number of iterations over the provided client configurations before
     * the client decides to shutdown each time the client is disconnected
     * from a cluster and it cannot connect back to the same one.
     */
    tryCount: number = Number.MAX_SAFE_INTEGER;
    /**
     * List of client configurations the client tries to connect in case
     * it disconnects from the cluster. Configurations are tried in the order
     * they added to this array.
     */
    clientConfigs: ClientConfig[] = [];

    /**
     * Utility method to add client configuration.
     *
     * @param clientConfig Client configuration to be added.
     */
    addClientConfig(clientConfig: ClientConfig): void {
        this.clientConfigs.push(clientConfig);
    }
}
