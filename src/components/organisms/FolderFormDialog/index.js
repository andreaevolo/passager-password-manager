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

// Third party dependencies
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
// Atoms
import Dialog from '../../atoms/Dialog/Dialog.js';
import Title from '../../atoms/Title/index.js';
import Input from '../../atoms/Input/index.js';
import InputWrapper from '../../atoms/Dialog/DialogInputWrapper.js';
import Button from '../../atoms/Button/index.js';
import ButtonWrapper from '../../atoms/Dialog/DialogButtonWrapper.js';
// Hooks
import useDialogConfirmation from '../../../hooks/useDialogConfirmation/index.js';
import useTranslation from '../../../hooks/useTranslation/index.js';

const FolderFormDialog = ({ defaultName = '', onSave, closeDialog }) => {
    const { t } = useTranslation();
    const [state, setState] = useState({ name: defaultName, error: '' });

    const onSaveHandler = useCallback(
        (name) => {
            if (name.length === 0) {
                setState({
                    ...state,
                    error: t('folderFormDialog.Folder name is required'),
                });
                return false;
            }

            onSave({ name });
            return true;
        },
        [state, onSave, t]
    );

    const onChangeHandler = (e) => {
        let name = e.target.value;
        let error = '';
        if (name.length === 0) {
            error = t('folderFormDialog.Folder name is required');
        }
        setState({ name, error });
    };

    useDialogConfirmation(closeDialog, onSaveHandler, state.name);

    return (
        <Dialog onClose={() => closeDialog()}>
            <Title marginBottom="20px">
                {!defaultName && t('folderFormDialog.New Folder')}
                {defaultName && t('folderFormDialog.Edit Folder')}
            </Title>
            <InputWrapper>
                <Input
                    autoFocus
                    defaultValue={state.name}
                    type="text"
                    placeholder={t('folderFormDialog.New folder name')}
                    onChange={onChangeHandler}
                />
                {state.error.length > 0 && (
                    <span style={{ color: 'red' }}>{state.error}</span>
                )}
            </InputWrapper>

            <ButtonWrapper>
                <Button
                    label={t('common.Cancel')}
                    onClick={() => closeDialog()}
                    color="black"
                    backgroundColor="white"
                />
                <Button
                    label={t('common.Save')}
                    onClick={() => {
                        if (onSaveHandler(state.name)) closeDialog();
                    }}
                    color="black"
                    backgroundColor="white"
                />
            </ButtonWrapper>
        </Dialog>
    );
};

FolderFormDialog.displayName = 'FolderFormDialog';
FolderFormDialog.propTypes = {
    onSave: PropTypes.func,
    closeDialog: PropTypes.func,
    defaultName: PropTypes.string,
};

export default FolderFormDialog;
