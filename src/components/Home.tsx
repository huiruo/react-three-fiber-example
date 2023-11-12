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
      <p>Welcome to the home page!</p>

      <div>
        <button onClick={() => onNavigateTo('about')}>Go to About</button>
      </div>
      <div>
        <button onClick={() => onNavigateTo('relationshipPlanet')}>Go to RelationshipPlanet</button>
      </div>
      <div>
        <button onClick={() => onNavigateTo('demo1')}>Go to demo1</button>
      </div>
      <div>
        <button onClick={() => onNavigateTo('demo2')}>Go to demo2</button>
      </div>
    </div>
  );
};

export default Home;
