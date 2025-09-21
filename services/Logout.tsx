import {useSignOut} from 'react-auth-kit';

const Logout = () => {
  const signOut = useSignOut();
  return () => {
    signOut();
    window.location.href = '/';
  };
};

export default Logout;
