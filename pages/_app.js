import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from "../firebase";
import Login from './login';
import Loading from '@/components/Loading';

export default function App({ Component, pageProps }) {

  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />
  if (!user) return <Login />

  return <Component {...pageProps} />
}
