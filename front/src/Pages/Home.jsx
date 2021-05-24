import useAuth from '../shared/hooks/useAuth';
import Login from '../Components/user/Login';

export default function Home() {
  const { signIn } = useAuth();

  return <Login onSubmit={signIn} />;
}
