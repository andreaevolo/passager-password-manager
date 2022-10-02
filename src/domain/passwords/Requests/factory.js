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

import { PasswordOperationRequest } from './PasswordOperationRequest.js';
import { PasswordReferenceRequest } from './PasswordReferenceRequest.js';
import { PasswordSubscriptionRequest } from './PasswordSubscriptionRequest.js';

export class PasswordsRequestsFactory {
    static passwordOperationRequest = ({
        folderId,
        folderKey,
        name,
        owner,
        password,
        passwordId,
        url,
        username,
        userPrivateKey,
    }) => {
        return new PasswordOperationRequest({
            folderId,
            folderKey,
            name,
            owner,
            password,
            passwordId,
            url,
            username,
            userPrivateKey,
        });
    };

    static passwordReferenceRequest = ({ folderId, passwordId }) => {
        return new PasswordReferenceRequest({
            folderId,
            passwordId,
        });
    };

    static passwordSubscriptionRequest = ({
        folderId,
        onSubscriptionChanges,
        userId,
    }) => {
        return new PasswordSubscriptionRequest({
            folderId,
            onSubscriptionChanges,
            userId,
        });
    };
}
