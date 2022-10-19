import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import BookableList from './pages/bookablelist/BookableList';
import Booking from './pages/booking/Booking';
import SearchBooking from './pages/searchBooking/SearchBooking';

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
          <Route path="/search-booking" element={<SearchBooking />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Router;
