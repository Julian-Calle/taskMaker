import useAuth from '../shared/hooks/useAuth';
import Login from '../Components/user/Login';
import LogOut from '../Components/user/LogOut';

export default function Home() {
  const { signIn } = useAuth();

  return (
    <div>
      <Login onSubmit={signIn} />
      <LogOut />
    </div>
  );
}
