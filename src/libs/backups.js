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

// Domain
import domain from '../domain/index.js';
// Own libs
import { saveFile } from './fileSystem.js';

export const importBackup = async ({ backupData }) => {
    const backupImportResult = await domain.useCases.backups[
        'import_backup_use_case'
    ].execute({
        backupData,
    });
    return backupImportResult;
};

export const downloadBackup = async () => {
    const backupData = await domain.useCases.backups[
        'get_backup_use_case'
    ].execute();
    saveFile(_getBackupFileName(), backupData);
};

const _getBackupFileName = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const backupFileName = `backup_${year}-${month}-${day}_${hour}-${minute}-${second}.json`;
    return backupFileName;
};
