import useAuth from '../shared/hooks/useAuth';
import Login from '../Components/user/Login';
import Completed from '../Components/Tasks/Completed';

export default function Home() {
  const { signIn } = useAuth();

  return (
    <div>
      <Login onSubmit={signIn} />
      <Completed></Completed>
    </div>
  );
}
