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

// Organisms
import ProfileOptionsLeftPanel from '../../organisms/ProfileOptionsLeftPanel/index.js';
import UserDetailsRightPanel from '../../organisms/UserDetailsRightPanel/index.js';
// Own libs
import { logout } from '../../../libs/auth.js';
// Templates
import LoggedWithLeftPanel from '../../templates/LoggedWithLeftPanel/index.js';

const PageProfile = () => {
    const leftPanel = <ProfileOptionsLeftPanel selectedItem="profile" />;
    return (
        <LoggedWithLeftPanel signOut={logout} leftPanelContent={leftPanel}>
            <UserDetailsRightPanel />
        </LoggedWithLeftPanel>
    );
};

PageProfile.displayName = 'PageProfile';

export default PageProfile;
