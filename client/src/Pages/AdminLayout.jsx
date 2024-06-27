import React from 'react';
import { NavLink, Outlet,Navigate} from 'react-router-dom';
import { UseAuth } from '../store/auth';

const AdminLayout = () => {
    const { user, isLoading,isLoggedIn } = UseAuth();

    if (isLoading) {
        return <h6>Loading...</h6>;
      }
    

      if (!isLoggedIn || !user || !user.isAdmin) {
        return <Navigate to="/" />;
      }


    return (
        <div className="admin-layout">
            <div className="sidebar">
                <NavLink to='/home'>  <h3 className='logo' >admin panel</h3></NavLink>

                <ul className='nav'>
                    <li><NavLink to="/admin_panel/users">Users</NavLink></li>
                    <li><NavLink to="/admin_panel/address">UsersAddress</NavLink></li>
                    <li><NavLink to="/admin_panel/orders">orders</NavLink></li>
                    <li><NavLink to="/admin_panel/oildata">oilData</NavLink></li>
                    <li><NavLink to="/admin_panel/graindata">grainData</NavLink></li>
                    <li><NavLink to="/admin_panel/fruitdata">FruitData</NavLink></li>
                    <li><NavLink to="/logout">LogOut</NavLink></li>
                </ul>
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
