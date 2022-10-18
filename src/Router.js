import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import BookableList from './pages/bookablelist/BookableList';
import Booking from './pages/booking/Booking';
import BookingList from './pages/bookinglist/BookingList';

import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';

const Router = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookableList />} />
          <Route path="/booking/:info" element={<Booking />} />
          <Route path="/booking-list" element={<BookingList />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Router;
