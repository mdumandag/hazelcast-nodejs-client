/*
 * Copyright (c) 2008-2020, Hazelcast, Inc. All Rights Reserved.
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

import {AddressProvider} from './AddressProvider';
import {ClientNetworkConfig} from '../config/ClientNetworkConfig';
import * as Promise from 'bluebird';

/**
 * Default address provider of Hazelcast.
 *
 * Loads addresses from the Hazelcast configuration.
 */
export class DefaultAddressProvider implements AddressProvider {

    private networkConfig: ClientNetworkConfig;
    private readonly noOtherAddressProviderExist: boolean;

    constructor(networkConfig: ClientNetworkConfig, noOtherAddressProviderExist: boolean) {
        this.networkConfig = networkConfig;
        this.noOtherAddressProviderExist = noOtherAddressProviderExist;
    }

    loadAddresses(): Promise<string[]> {
        const addresses: string[] = this.networkConfig.addresses;
        if (addresses.length === 0 && this.noOtherAddressProviderExist) {
            addresses.push('localhost:5701');
        }

        return Promise.resolve(addresses);
    }
}
