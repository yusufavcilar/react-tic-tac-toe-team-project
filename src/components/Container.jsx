import { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const Container = ({ children }) => {
  const { buttons } = useContext(GameContext);
  return (
    <div className='container'>
      <div className='innerContainer'>{children}</div>
    </div>
  );
};
export default Container;
