import { Container } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import appRoutes from '@/routes';

const RouterContent: FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={location.pathname}
        style={{ flex: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: '0px !important',
            pb: '48px !important',
            px: '16px !important',
            height: '100%',
            animation: 'fadein 2s ease',
          }}
        >
          <Routes location={location} key={location.pathname}>
            {appRoutes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </Container>
      </motion.main>
    </AnimatePresence>
  );
};

export default RouterContent;
