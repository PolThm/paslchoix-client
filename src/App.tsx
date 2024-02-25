import { Box, Snackbar, Typography } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import RouterContent from '@/components/RouterContent';
import { AuthContext } from '@/contexts/AuthContext';
import { useFetchUser } from '@/queries/user';
import { UserAuth } from '@/types/interfaces';
// import ReloadPrompt from '@/components/ReloadPrompt';

const App: FC = () => {
  const [user, setUser] = useState<UserAuth>({
    isLoggedIn: false,
    username: '',
  });
  const [isWelcomeSnackbarOpen, setIsWelcomeSnackbarOpen] = useState(false);
  const authValue = useMemo(() => ({ user, setUser }), [user]);

  useEffect(() => {
    if (user.username) setIsWelcomeSnackbarOpen(true);
  }, [user]);

  const { data: userData } = useFetchUser(localStorage.getItem('token') || '');

  useEffect(() => {
    if (userData?.isLoggedIn) {
      setUser({ isLoggedIn: true, username: userData.username });
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
              {` ${user.username}`}
            </Typography>
          </Typography>
        }
      />
    </AuthContext.Provider>
  );
};

export default App;
