import { Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import './App.css';

const Home = React.lazy(() => import('./pages/Home'));
const Stripe = React.lazy(() => import('./pages/Stripe'));

function App() {
  return (
    <Suspense fallback="loading">
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/stripe' element={<Stripe />} />
      </Routes>
    </Suspense>
  );
}

export default App;
