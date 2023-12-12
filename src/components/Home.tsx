import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const onNavigateTo = (name: string) => {
    navigate(name);
  };

  return (
    <div>
      <h2>Home</h2>

      <div>
        <button onClick={() => onNavigateTo('about')}>Go to About</button>
      </div>

      <div>
        <button onClick={() => onNavigateTo('relationshipPlanet')}>Go to Relationship Planet</button>
      </div>

      <div>
        <button onClick={() => onNavigateTo('demo1')}>Go to demo1</button>
      </div>

      <div>
        <button onClick={() => onNavigateTo('demo2')}>Go to demo2</button>
      </div>

      <div>
        <button onClick={() => onNavigateTo('demo3_events_interaction')}>Go to events interaction</button>
      </div>

      <div>
        <button onClick={() => onNavigateTo('demo4_loadingModels')}>Go to loading models</button>
      </div>

      <div>
        <button onClick={() => onNavigateTo('demo5_loadingTextures')}>Go to loading textures</button>
      </div>

      <div>
        <button onClick={() => onNavigateTo('demo6_reactRnd')}>Go to reactRnd</button>
      </div>

      <div>
        <button onClick={() => onNavigateTo('demo7-selectArea')}>Go to selectArea</button>
      </div>

      <div>
        <button onClick={() => onNavigateTo('demo8-RichTextExample')}>Go to slatjs01</button>
      </div>

      <div>
        <button onClick={() => onNavigateTo('demo9-monaco-editor')}>Go to monaco-editor</button>
      </div>
    </div>
  );
};

export default Home;
