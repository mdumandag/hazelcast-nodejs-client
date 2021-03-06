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

import * as Promise from 'bluebird';
import * as Long from 'long';
import {DistributedObject} from '../DistributedObject';

export interface IAtomicLong extends DistributedObject {
    addAndGet(delta: Long | number): Promise<Long>;

    compareAndSet(expect: Long | number, update: Long | number): Promise<boolean>;

    decrementAndGet(): Promise<Long>;

    get(): Promise<Long>;

    getAndAdd(delta: Long | number): Promise<Long>;

    getAndSet(newValue: Long | number): Promise<Long>;

    incrementAndGet(): Promise<Long>;

    getAndIncrement(): Promise<Long>;

    set(newValue: Long | number): Promise<void>;
}
