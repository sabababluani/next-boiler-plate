import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [dark, setDark] = useState(() =>
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
