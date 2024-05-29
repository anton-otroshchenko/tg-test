import React, {useEffect} from 'react';
import {Route, Routes, HashRouter} from 'react-router-dom';
import { AppRoot } from '@xelene/tgui';
import { Habits } from "./pages/Habits/Habits";
import {CreateHabit} from "./pages/CreateHabit/CreateHabit";

// Debug Component
const App = () => {
  window.Telegram?.WebApp.expand();

    useEffect(() => {
        // Initialize Telegram Web App
        const tg = window.Telegram?.WebApp;

        if (tg) {
            // Expand the Web App
            tg.expand();

            // Set the default theme to light with a valid hex color
            tg.themeParams = {
                ...tg.themeParams,
                bg_color: '#ffffff', // Set a valid hex color
                secondary_bg_color: '#f0f0f0', // Example secondary background color
                text_color: '#000000' // Example text color
            };

            // Inject global styles to override tgui default styles
            const style = document.createElement('style');
            style.textContent = `
                :root {
                    --tgui--background-color: #ffffff;
                    --tgui--text-color: #000000;
                    --tgui--secondary-background-color: #f0f0f0;
                }
            `;
            document.head.append(style);

            // Optionally log the theme to verify
            console.log('Current theme:', tg.themeParams);
        }
    }, []);

  return (
      <AppRoot style={{ background: '#fff' }}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Habits />} />
            <Route path="/create-habit" element={<CreateHabit />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </HashRouter>
      </AppRoot>
  );
};

export { App };