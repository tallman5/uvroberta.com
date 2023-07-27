import React, { useEffect, useState } from 'react'
import { Icon, KnownIcon, isBrowser, useMedia } from '@tallman/strong-strap';
import IsAuthenticated from './isAuhthenticated';
import NotAuthenticated from './notAuthenticated';
import { Link } from 'gatsby';

const AccountDropdown = () => {
    const alignMenu = useMedia(['(min-width: 767px)'], [' dropdown-menu-end'], '')
    const [dropdownVisible, setDropdownVisible] = useState(false)

    useEffect(() => {
        const windowClicked = () => {
            if (dropdownVisible)
                setDropdownVisible(false)
        }
        if (isBrowser) {
            window.addEventListener("click", windowClicked);
            return () => { window.removeEventListener("click", windowClicked); };
        }
    }, [dropdownVisible])

    return (
        <div className="dropdown">
            <button type="button" className={(dropdownVisible) ? 'btn dropdown-toggle show' : 'btn dropdown-toggle'}
                onClick={(e) => { e.stopPropagation(); setDropdownVisible(!dropdownVisible); }}>
                <Icon knownIcon={KnownIcon.PersonCircle} width={'16px'} fill={'currentcolor'} />&nbsp;&nbsp;{'guest'}
            </button>
            <div data-bs-popper={(dropdownVisible) ? "static" : ''} className={(dropdownVisible) ? 'dropdown-menu show' + alignMenu : 'dropdown-menu' + alignMenu}>
                <IsAuthenticated>
                    <Link to='/my/logout/' className='dropdown-item'>Sign Out</Link>
                </IsAuthenticated>
                <NotAuthenticated>
                    <Link to='/my/login/' className='dropdown-item'>Sign In</Link>
                </NotAuthenticated>
            </div>
        </div>
    )
}

export default AccountDropdown