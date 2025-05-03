import { useState, useEffect } from 'react';

const useDarkMode = (): readonly [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
] => {
  const [dark, setDark] = useState<boolean>(() =>
    typeof localStorage !== 'undefined'
      ? JSON.parse(localStorage.getItem('dark') || 'false')
      : false,
  );

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    localStorage.setItem('dark', JSON.stringify(dark));
  }, [dark]);

  return [dark, setDark] as const;
};

export default useDarkMode;
