import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import { About } from './components/About';
import RelationshipPlanet from './components/RelationshipPlanet';
import { Demo1 } from './components/demo1';
import { Demo2 } from './components/demo2';
import { Demo3EventsInteraction } from './components/demo3_events_interaction';
import { LoadingModels } from './components/demo4_loadingModels';
import { LoadingTextures } from './components/demo5_LoadingTextures';
import { ReactRnd } from './components/demo6-reactRnd';
import { SelectArea } from './components/demo7-selectArea';
import { RichTextExample } from './components/demo8-RichTextExample';
import { MonacoEditor } from './components/demo9-monaco-editor';
import { GlideDataGrid } from './components/demo10-glide-data-grid';
import { GlideDataGrid2 } from './components/demo11-glideDataGrid2';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes> {/* 这里使用 Routes 替代 Switch */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/relationshipPlanet" element={<RelationshipPlanet />} />
        <Route path="/demo1" element={<Demo1 />} />
        <Route path="/demo2" element={<Demo2 />} />
        <Route path="/demo3_events_interaction" element={<Demo3EventsInteraction />} />
        <Route path="/demo4_loadingModels" element={<LoadingModels />} />
        <Route path="/demo5_loadingTextures" element={<LoadingTextures />} />
        <Route path="/demo6_reactRnd" element={<ReactRnd />} />
        <Route path="/demo7-selectArea" element={<SelectArea />} />
        <Route path="/demo8-RichTextExample" element={<RichTextExample />} />
        <Route path="/demo9-monaco-editor" element={<MonacoEditor />} />
        <Route path="/demo10-glideDataGrid" element={<GlideDataGrid />} />
        <Route path="/demo11-glideDataGrid2" element={<GlideDataGrid2 />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
