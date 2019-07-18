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

import {ICredentialsFactory} from '../security/ICredentialsFactory';
import {Properties} from './Properties';

/**
 * Contains the configuration for Credentials Factory.
 */
export class CredentialsFactoryConfig {

    /**
     * {@link ICredentialsFactory} to be used to create the credentials object to be used
     * during client authentication before connection is accepted by the master node.
     */
    implementation: ICredentialsFactory = null;

    /**
     *  Properties to be passed into the {@link ICredentialsFactory#configure}
     *  method as a custom configuration option.
     */
    properties: Properties = {};
}
