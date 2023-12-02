import { Box } from '@mui/material';
import { FC } from 'react';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import RouterContent from '@/components/RouterContent';

const App: FC = () => {
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
