import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Tabs, Tab, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useTheme } from '@mui/material/styles';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

//cart section
import { useCart } from "./context/cartContext" //diff folder so use (./) not src (../) 

export default function HeaderTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const paths = ['/', '/disenadores', '/patrocinadores'];//, '/colecciones', '/eventos', '/revista'
  const labels = ['Innova Shop', 'Diseñadores', 'Patrocinadores' ]; //'Colecciones', 'Eventos', 'Revista Digital'

  const currentTab = paths.indexOf(location.pathname) === -1 ? 0 : paths.indexOf(location.pathname);
  const [value, setValue] = useState(currentTab);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(paths[newValue]);
    handleMenuClose();
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        setIsAdmin(userSnap.exists() && userSnap.data().isAdmin);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate('/');
  };

  //cart icon and counter
  const { cart } = useCart();

 return (

  //visual in mobile
  <div className="w-screen bg-white shadow-md pt-6 ">
    {isMobile ? (
      <div className="flex justify-between items-center px-4 py-2 w-full">
        <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          {labels.map((label, index) => (
            <MenuItem key={label} onClick={(e) => handleChange(e, index)}>
              {label}
            </MenuItem>
          ))}
        </Menu>

        <div className="flex items-center gap-2">
          {/* Cart icon */}
        <div className="relative">
          <IconButton component={Link} data-cy="cart-link" to="/cart" color="primary"> {/* data-cy ---for testing */}
            🛒
            {cart?.items?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                {cart.items.reduce((acc, item) => acc + item.cantidad, 0)}
              </span>
            )}
          </IconButton>
        </div>

          {user && isAdmin && (
            <IconButton component={Link} to="/admin/add-product" color="primary">
              <AdminPanelSettingsIcon />
            </IconButton>
          )}
          {!user ? (
            <IconButton component={Link} to="/admin" color="primary">
              <AccountCircleIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleLogout} color="primary">
              <LogoutIcon />
            </IconButton>
          )}
        </div>
      </div>
    ) : ( 
      
      //visual to webpage
      <div className="flex justify-between items-center px-8 py-3 w-full">
        <Tabs value={value} onChange={handleChange} centered>
          {labels.map((label, index) => (
            <Tab 
            key={label} 
            label={label} 
            sx={{fontFamily: 'Playfair Display, serif',
              fontWeight: 600,
              fontSize: '1.25rem', 
              textTransform: 'none'
            }}
            />
          ))}
        </Tabs>

        <div className="flex items-center gap-4">

            {/* Cart icon */}
        <div className="relative py-3">
          <IconButton component={Link} to="/cart" color="primary" data-cy="cart-link"> 
            🛒
            {cart?.items?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                {cart.items.reduce((acc, item) => acc + item.cantidad, 0)}
              </span>
            )}
          </IconButton>
        </div>

          {user && isAdmin && (
            <IconButton component={Link} to="/admin/add-product" color="primary">
              <AdminPanelSettingsIcon />
            </IconButton>
          )}
          {!user ? (
            <IconButton component={Link} to="/admin" color="primary">
              <AccountCircleIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleLogout} color="primary">
              <LogoutIcon />
            </IconButton>
          )}
        </div>
      </div>
    )}
  </div>
);

}
