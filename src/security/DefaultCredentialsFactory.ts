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

import {ICredentialsFactory} from './ICredentialsFactory';
import {GroupConfig} from '../config/GroupConfig';
import {Credentials} from './Credentials';
import {SecurityConfig} from '../config/SecurityConfig';
import {UsernamePasswordCredentials} from './UsernamePasswordCredentials';

/**
 * This is the factory that uses Credentials instance giving by implementation
 * instead of factory given bey user.
 */
export class DefaultCredentialsFactory implements ICredentialsFactory {
    private readonly credentials: Credentials;

    constructor(securityConfig: SecurityConfig, groupConfig: GroupConfig) {
        this.credentials = this.initCredentials(securityConfig, groupConfig);
    }

    configure(groupConfig: GroupConfig, properties: Object): void {
    }

    destroy(): void {
    }

    newCredentials(): Credentials {
        return this.credentials;
    }

    private initCredentials(securityConfig: SecurityConfig, groupConfig: GroupConfig): Credentials {
        let credentials = securityConfig.credentials;
        if (credentials == null) {
            credentials = new UsernamePasswordCredentials(groupConfig.name, groupConfig.password);
        }
        return credentials;
    }
}
