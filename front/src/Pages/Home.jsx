import useAuth from '../shared/hooks/useAuth';
import Login from '../Components/user/Login';
import Stamp from '../Components/Tasks/Stamp';

export default function Home() {
  const { signIn } = useAuth();

  return (
    <div>
      <Login onSubmit={signIn} />
      <Stamp color={'green'} text="DONE" />
      <Stamp color={'red'} text="ALARM" />
    </div>
  );
}
