import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { registerSW } from 'virtual:pwa-register';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import RouterContent from '@/components/RouterContent';

const App: FC = () => {
  useEffect(() => {
    const updateSW = registerSW({
      onNeedRefresh() {
        if (
          window.confirm(
            "Une nouvelle version est disponible. Voulez-vous recharger pour l'utiliser ?"
          )
        ) {
          window.location.reload();
        }
      },
    });

    return () => {
      updateSW();
    };
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh" // dvh fallback
      sx={{ height: '100dvh' }}
    >
      <Navbar />
      <RouterContent />
      <Footer />
    </Box>
  );
};

export default App;
