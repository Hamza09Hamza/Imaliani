// components/withAuth.js
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/login');
      }
    }, [user, router]);

    if (!user) {
      return <p>Loading...</p>; // You can replace this with a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
