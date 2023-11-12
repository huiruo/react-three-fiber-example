import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // 注意这里的导入

import Home from './components/Home';
import About from './components/About';
import RelationshipPlanet from './components/RelationshipPlanet';
import { Demo1 } from './components/demo1';
import { Demo2 } from './components/demo2';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes> {/* 这里使用 Routes 替代 Switch */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/relationshipPlanet" element={<RelationshipPlanet />} />
        <Route path="/demo1" element={<Demo1 />} />
        <Route path="/demo2" element={<Demo2 />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

