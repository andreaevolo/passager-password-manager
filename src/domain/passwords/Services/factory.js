/**
 * This file is part of Passager Password Manager.
 * https://github.com/oegea/passager-password-manager
 *
 * Copyright (C) 2022 Oriol Egea Carvajal
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// Own libraries
import { AESDecrypt, AESEncrypt, importAESKey } from '@useful-tools/crypto';
// Services
import { CreatePasswordService } from './CreatePasswordService.js';
import { DecryptPasswordService } from './DecryptPasswordService.js';
import { DeletePasswordService } from './DeletePasswordService.js';
import { EditPasswordService } from './EditPasswordService.js';
import { SubscribeToPasswordsService } from './SubscribeToPasswordsService.js';
// Factories
import { PasswordsRepositoriesFactory } from '../Repositories/factory.js';

export class PasswordsServicesFactory {
    static createPasswordService = ({ config }) =>
        new CreatePasswordService({
            AESEncrypt,
            importAESKey,
            repository: PasswordsRepositoriesFactory.getRepository({ config }),
        });

    static decryptPasswordService = ({ config }) =>
        new DecryptPasswordService({
            AESDecrypt,
            importAESKey,
        });

    static deletePasswordService = ({ config }) =>
        new DeletePasswordService({
            repository: PasswordsRepositoriesFactory.getRepository({ config }),
        });

    static editPasswordService = ({ config }) =>
        new EditPasswordService({
            AESEncrypt,
            importAESKey,
            repository: PasswordsRepositoriesFactory.getRepository({ config }),
        });

    static subscribeToPasswordsService = ({ config }) =>
        new SubscribeToPasswordsService({
            repository: PasswordsRepositoriesFactory.getRepository({ config }),
        });
}
