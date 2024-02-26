import { Box, Snackbar, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import RouterContent from '@/components/RouterContent';
import { useAuth } from '@/contexts/AuthContext';
import { useFetchUser } from '@/queries/user';
// import ReloadPrompt from '@/components/ReloadPrompt';

const App: FC = () => {
  const { setUser } = useAuth();
  const { data: userData } = useFetchUser(localStorage.getItem('token') || '');

  const [isWelcomeSnackbarOpen, setIsWelcomeSnackbarOpen] = useState(false);

  useEffect(() => {
    if (userData?.isLoggedIn) {
      setUser(userData);
      setIsWelcomeSnackbarOpen(true);
    }
  }, [setUser, userData]);

  return (
    <>
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
              {` ${userData?.username}`}
            </Typography>
          </Typography>
        }
      />
    </>
  );
};

export default App;
