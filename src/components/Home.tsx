import React from 'react';
import { useNavigate } from 'react-router-dom';  // 注意这里的导入

const Home: React.FC = () => {
  const navigate = useNavigate();

  const navigateToAbout = () => {
    navigate('/about');
  };

  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to the home page!</p>
      
      <button onClick={navigateToAbout}>Go to About</button>
    </div>
  );
};

export default Home;

