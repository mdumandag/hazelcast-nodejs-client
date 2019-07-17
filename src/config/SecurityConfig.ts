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

import {CredentialsFactoryConfig} from './CredentialsFactoryConfig';
import {Credentials} from '../security/Credentials';

/**
 * Contains the security configuration for the client.
 */
export class SecurityConfig {
    //TODO Update README and code samples with SecurityConfig
    /**
     * Credentials object that will be used when the client is authenticating.
     */
    credentials: Credentials = null;

    /**
     * {@link CredentialsFactoryConfig} to allows user to pass custom properties 
     * and use group config when instantiating a credentials object.
     */
    credentialsFactoryConfig: CredentialsFactoryConfig = new CredentialsFactoryConfig();
}
