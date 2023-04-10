import { useEffect, useState } from 'react';

export const LoadingAlert: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!showLoading) {
    return null;
  }

  return (
    <div className="alert info">
      <div>Loading</div>
    </div>
  );
};
