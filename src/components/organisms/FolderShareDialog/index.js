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
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Atoms
import Button from '../../atoms/Button/index.js';
import ButtonLink from '../../atoms/ButtonLink/index.js';
import ButtonWrapper from '../../atoms/Dialog/DialogButtonWrapper.js';
import Dialog from '../../atoms/Dialog/Dialog.js';
import Input from '../../atoms/Input/index.js';
import InputLabel from '../../atoms/InputLabel/index.js';
import InputWrapper from '../../atoms/Dialog/DialogInputWrapper.js';
import Title from '../../atoms/Title/index.js';
// Molecules
import FolderShareNotice from '../../molecules/FolderShareNotice/index.js';
// Hooks
import useDialogConfirmation from '../../../hooks/useDialogConfirmation/index.js';
import useTranslation from '../../../hooks/useTranslation/index.js';
// Own libs
import { shareFolder, removeEmail } from '../../../libs/folders.js';
// Context
import withUser from '../../../providers/WithUser.js';

const FolderShareDialog = ({
    closeDialog,
    folderId,
    folderName,
    folderKey,
    sharedWith = [],
    user,
    userPrivateKey,
}) => {
    const { t } = useTranslation();
    const [state, setState] = useState({ email: '', error: '' });

    const shareWith = async (email) => {
        if (state.email.length < 1 || state.error.length !== 0) return;

        if (user.email.toLowerCase() === email.toLowerCase()) return;

        const result = await shareFolder(
            folderName,
            folderId,
            folderKey,
            email,
            sharedWith,
            userPrivateKey
        );

        if (result === false)
            setState({
                email: email,
                error: t('folderShareDialog.This email does not exist'),
            });
        else {
            setState({ email: '', error: '' });
        }
    };

    const unshare = async (email) => {
        await removeEmail(folderId, email, sharedWith);
    };

    const onChangeHandler = (e) => {
        let email = e.target.value;
        let error = '';

        if (sharedWith.includes(email))
            error = t(
                'folderShareDialog.This folder has been already shared with this email'
            );

        if (user.email.toLowerCase() === email.toLowerCase())
            error = t(
                'folderShareDialog.Is not possible to share a folder with your own user'
            );

        setState({ email, error });
    };

    useDialogConfirmation(
        closeDialog,
        () => {
            shareWith(state.email);
            return false;
        },
        state.name
    );

    return (
        <Dialog onClose={() => closeDialog()}>
            <Title marginBottom="20px">
                {t('folderShareDialog.Share Folder')}
            </Title>
            <InputWrapper>
                <InputLabel htmlFor="email">
                    {t('folderShareDialog.Add people by typing their email')}
                </InputLabel>
                <Input
                    autoComplete="off"
                    autoFocus
                    value={state.email}
                    id="email"
                    type="text"
                    placeholder={t('folderShareDialog.Email')}
                    onChange={onChangeHandler}
                />
                {state.error.length > 0 && (
                    <span style={{ color: 'red' }}>{state.error}</span>
                )}
            </InputWrapper>

            {state.email.length > 0 && (
                <FolderShareNotice email={state.email} />
            )}

            {state.email.length === 0 && (
                <div>
                    <Title marginTop="20px">
                        {t(
                            'folderShareDialog.People with access to this folder'
                        )}
                    </Title>
                    {sharedWith.map((email, index) => {
                        return (
                            <p key={index}>
                                {email}
                                <ButtonLink onClick={() => unshare(email)}>
                                    {t('common.Remove')}
                                </ButtonLink>
                            </p>
                        );
                    })}

                    {sharedWith.length === 0 && (
                        <p>
                            {t(
                                'folderShareDialog.This folder has not been shared with anyone'
                            )}
                        </p>
                    )}
                </div>
            )}

            <ButtonWrapper>
                <Button
                    label={t('common.Close')}
                    onClick={() => closeDialog()}
                    color="black"
                    backgroundColor="white"
                />
                {state.email.length > 0 && state.error.length === 0 && (
                    <Button
                        label={t('common.Share')}
                        onClick={() => shareWith(state.email)}
                        color="black"
                        backgroundColor="white"
                    />
                )}
            </ButtonWrapper>
        </Dialog>
    );
};

FolderShareDialog.displayName = 'FolderShareDialog';
FolderShareDialog.propTypes = {
    closeDialog: PropTypes.func,
    folderId: PropTypes.string.isRequired,
    folderKey: PropTypes.string,
    folderName: PropTypes.string.isRequired,
    sharedWith: PropTypes.arrayOf(PropTypes.string),
    user: PropTypes.object,
    userPrivateKey: PropTypes.object,
};

export default withUser(FolderShareDialog);
