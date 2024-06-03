import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AppRoot } from '@xelene/tgui';
import { Habits } from "./pages/Habits/Habits";
import { CreateHabit } from "./pages/CreateHabit/CreateHabit";
import { getUser } from './store/userSlice';
import { store } from './store/store';
import { useAppSelector } from './hooks';

// Debug Component
const App = () => {
  window.Telegram?.WebApp.expand();

  useEffect(() => {
    store.dispatch(getUser());
  }, []);
  const user = useAppSelector(state => state.user);
  console.log(user);
  return (
    <AppRoot style={{ background: '#fff' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Habits />} />
          <Route path="/create-habit" element={<CreateHabit />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </AppRoot>
  );
};

export { App };