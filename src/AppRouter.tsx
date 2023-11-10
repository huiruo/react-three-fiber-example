// src/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // 注意这里的导入

import Home from './components/Home';
import About from './components/About';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes> {/* 这里使用 Routes 替代 Switch */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

