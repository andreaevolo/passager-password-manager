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

import { FoldersRequestsFactory } from '../Requests/factory.js';

export class EditFolderUseCase {
    /**
     * CTOR
     * @param {EditFolderService} service Service to execute the use case
     */
    constructor({ service }) {
        this._service = service;
    }

    /**
     * Executes the use case to edit a folder
     * @param {String} id Folder id
     * @param {String} name Folder name
     * @returns {DocumentReference} Reference to the edited folder
     */
    async execute({ id, name }) {
        const folderOperationRequest =
            FoldersRequestsFactory.folderOperationRequest({
                id,
                name,
            });
        const result = await this._service.execute({ folderOperationRequest });
        return result;
    }
}
