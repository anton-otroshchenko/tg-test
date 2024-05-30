import React, {useEffect} from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { AppRoot } from '@xelene/tgui';
import { Habits } from "./pages/Habits/Habits";
import { CreateHabit } from "./pages/CreateHabit/CreateHabit";

const App = () => {
  window.Telegram?.WebApp.expand();

    useEffect(() => {
    }, []);

  return (
      <AppRoot style={{ background: '#fff' }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Habits />} />
            <Route path="/create-habit" element={<CreateHabit />} />
          </Routes>
        </BrowserRouter>
      </AppRoot>
  );
};

export { App };