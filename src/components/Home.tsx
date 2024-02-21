import React from 'react';
import { useNavigate } from 'react-router-dom';

const routers = [
  "about",
  "relationshipPlanet",
  "demo1",
  "demo2",
  "demo3_events_interaction",
  "demo4_loadingModels",
  "demo5_loadingTextures",
  "demo6_reactRnd",
  "demo7-selectArea",
  "demo8-RichTextExample",
  "demo9-monaco-editor",
  "demo10-glideDataGrid",
  "demo11-glideDataGrid2",
  "demo11-glideDataGrid3",
  "demo12-glideDataGrid-append-row",
]

const Home: React.FC = () => {
  const navigate = useNavigate();

  const onNavigateTo = (name: string) => {
    navigate(name);
  };

  return (
    <div>
      <h2>Home</h2>

      {
        routers.map((router) => {
          return <div key={router}>
            <button onClick={() => onNavigateTo(router)}>Go to {router}</button>
          </div>
        })
      }
    </div>
  );
};

export default Home;
