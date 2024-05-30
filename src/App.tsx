import React, {useEffect} from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { AppRoot } from '@xelene/tgui';
import { Habits } from "./pages/Habits/Habits";
import { CreateHabit } from "./pages/CreateHabit/CreateHabit";
import { getUser } from "./slices/user/actions";
import {useAppDispatch} from "./hooks/hooks";

const App = () => {
  window.Telegram?.WebApp.expand();

  const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(getUser());
    }, [dispatch]);

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