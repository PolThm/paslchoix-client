import { Paper } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import appRoutes from '@/routes';

const RouterContent: FC = () => {
  const location = useLocation();

  return (
    <Paper
      elevation={3}
      sx={{ p: 2, flex: 1, borderRadius: 'unset' }}
      style={{ animation: 'fadein 2s ease' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          style={{ height: '100%' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
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
        </motion.main>
      </AnimatePresence>
    </Paper>
  );
};

export default RouterContent;
