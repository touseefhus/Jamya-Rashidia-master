import React, { useEffect } from 'react';
import './Navbar.css';

import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('lastVisitedPage', location.pathname);
  }, [location.pathname]);

  const logoutHandler = () => {
    logout();
  };

  return (
    <>
      <header>
        <nav>
          <ul>
            {user && (
              <div className='d-flex gap-4'>
                <li className='list-unstyled'>
                  <Link className='nav-link' to='/'>
                    Home
                  </Link>
                </li>
                <li className='list-unstyled'>
                  <Link className='nav-link' to='/Enroll'>
                    اندرج
                  </Link>
                </li>
                <li className='list-unstyled'>
                  <Link className='nav-link' to='/students'>
                    طلبہ کا ریکارڈ
                  </Link>
                </li>
                <li className='list-unstyled'>
                  <Link className='nav-link' to='/teachers'>
                    استاتذہ کاریکارڈ
                  </Link>
                </li>
                <li className='list-unstyled'>
                  <Link className='nav-link' to='/labhours'>
                    ملازمین کاریکارڈ
                  </Link>
                </li>
                <button
                  style={{ padding: '5px', color: ' rgba(91, 8, 136, 1)', border: 'none' }}
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </div>
            )}

            {!user && (
              <div className='d-flex gap-3'>
                <li className='list-unstyled'>
                  <Link className='nav-link' to='/signup'>
                    Signup
                  </Link>
                </li>
                <li className='list-unstyled'>
                  <Link className='nav-link' to='/login'>
                    Login
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
