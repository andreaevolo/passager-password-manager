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
import styled from 'styled-components';

const Input = styled.input`
    border: 1px solid black;
    border-radius: 5px;
    font-size: 16px;
    height: 25px;
    padding: 5px;
    width: 100%;

    &::placeholder {
        font-size: 16px;
    }
`;
const AtomInput = (props) => {
    return <Input {...props} />;
};

AtomInput.displayName = 'AtomInput';

export default AtomInput;
