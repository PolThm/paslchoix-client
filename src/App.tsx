import { Box, Snackbar, Typography } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import RouterContent from '@/components/RouterContent';
import { AuthContext } from '@/contexts/AuthContext';
import { useFetchUser } from '@/queries/user';
// import ReloadPrompt from '@/components/ReloadPrompt';

const App: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isWelcomeSnackbarOpen, setIsWelcomeSnackbarOpen] = useState(false);
  const authValue = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      username,
      setUsername,
    }),
    [isLoggedIn, username]
  );

  useEffect(() => {
    if (username) setIsWelcomeSnackbarOpen(true);
  }, [isLoggedIn, username]);

  const { data: userData } = useFetchUser(localStorage.getItem('token') || '');

  useEffect(() => {
    if (userData?.isLoggedIn) {
      setUsername(userData.username);
      setIsLoggedIn(true);
    }
  }, [userData]);

  return (
    <AuthContext.Provider value={authValue}>
      <Box
        display="flex"
        flexDirection="column"
        height="100vh" // dvh fallback
        sx={{ height: '100dvh' }}
      >
        <Navbar />
        <RouterContent />
        <Footer />
        {/* <ReloadPrompt /> // TODO: Fix PWA auto update */}
      </Box>
      <Snackbar
        open={isWelcomeSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsWelcomeSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        message={
          <Typography variant="body1" align="center">
            Bienvenue
            <Typography
              variant="body1"
              component="span"
              sx={{ fontWeight: 'bold', display: 'inline' }}
            >
              {` ${username}`}
            </Typography>
          </Typography>
        }
      />
    </AuthContext.Provider>
  );
};

export default App;
