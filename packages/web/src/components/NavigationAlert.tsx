import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const NavigationAlert = () => {
  const { state } = useLocation();

  useEffect(() => {
    if (state?.message) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [state]);

  return (
    state?.message && (
      <div className="alert success">
        <div>{state.message}</div>
      </div>
    )
  );
};
