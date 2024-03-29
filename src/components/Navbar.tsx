import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import logoGift from '@/assets/img/logo-gift.png';
import BackButton from '@/components/BackButton';
import { useAuth } from '@/contexts/AuthContext';
import appRoutes from '@/routes';
import { Paths } from '@/types/enums';

const loggedInMenuItems = appRoutes.filter(
  (page) =>
    page.key === Paths.Home ||
    page.key === Paths.MyLists ||
    page.key === Paths.NewList
);

const loggedOutMenuItems = appRoutes.filter(
  (page) =>
    page.key === Paths.Home ||
    page.key === Paths.Login ||
    page.key === Paths.Register
);

const APP_NAME = "Pas l'choix";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const navMenuItems = user.isLoggedIn ? loggedInMenuItems : loggedOutMenuItems;

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleCloseUserMenu = () => setAnchorElUser(null);

  const logout = () => {
    setUser({ isLoggedIn: false, username: '' });
    localStorage.removeItem('token');
    navigate(Paths.Home);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.dark' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            component={NavLink}
            to={Paths.Home}
            color="inherit"
            underline="none"
            variant="button"
            sx={{
              display: { xs: 'none', md: 'flex' },
              color: 'secondary.main',
            }}
          >
            <MenuItem onClick={handleCloseNavMenu}>
              <img
                src={logoGift}
                alt="logo gift"
                style={{ width: '30px', marginRight: '16px' }}
              />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  fontFamily: 'Gloria Hallelujah, cursive',
                  fontWeight: 700,
                  letterSpacing: 5,
                  color: 'inherit',
                  textDecoration: 'none',
                  textTransform: 'capitalize',
                }}
              >
                {APP_NAME}
              </Typography>
            </MenuItem>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <BackButton />
          </Box>

          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Gloria Hallelujah, cursive',
              fontWeight: 700,
              letterSpacing: 5,
              color: 'secondary.main',
              textDecoration: 'none',
              alignItems: 'center',
            }}
          >
            {APP_NAME}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navMenuItems.slice(1).map((page) => (
              <Link
                key={page.key}
                component={NavLink}
                to={page.path}
                color="inherit"
                underline="none"
                variant="button"
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" sx={{ letterSpacing: 2 }}>
                    {page.title}
                  </Typography>
                </MenuItem>
              </Link>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              keepMounted
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {navMenuItems.map((page) => (
                <Link
                  key={page.key}
                  component={NavLink}
                  to={page.path}
                  color="inherit"
                  underline="none"
                  variant="button"
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography>{page.title}</Typography>
                  </MenuItem>
                </Link>
              ))}
              {user.isLoggedIn && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography onClick={logout} color="error">
                    Déconnexion
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>

          {user.isLoggedIn && (
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 2 }}>
                <Avatar
                  alt="profile image"
                  src="https://source.unsplash.com/random/40×40"
                  sx={{ backgroundColor: 'primary.light' }}
                />
              </IconButton>
              <Menu
                sx={{ mt: '2.8rem' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={logout} color="error">
                    Déconnexion
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
