import { useEffect, useState } from 'react';
import './App.css';
import hole from './assets/hole.png';
import mole from './assets/mole.png';

export const App = () => {
  const [moles, setMoles] = useState<boolean[]>(new Array(9).fill(false));

  const [score, setScore] = useState(0);

  const handleOnclick = (index: number) => {
    if (!moles[index]) {
      return;
    }

    setScore((prev) => prev + 1);

    setMoleVisibility(index, false);

    // setMoles((prev) => prev.map((el, ind) => (ind === index ? false : el)));
  };

  const setMoleVisibility = (index: number, isVisible: boolean) => {
    setMoles((prev) => {
      const newMoles = [...prev];

      newMoles[index] = isVisible;

      return newMoles;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);

      setMoleVisibility(randomIndex, true);

      setTimeout(() => {
        setMoleVisibility(randomIndex, false);
      }, 1000);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [moles]);

  return (
    <>
      <h1 className='score'>Score: {score}</h1>
      <div className='grid'>
        {moles.map((isMole, index) => (
          <img
            src={isMole ? mole : hole}
            onClick={() => handleOnclick(index)}
          />
        ))}
      </div>
    </>
  );
};
