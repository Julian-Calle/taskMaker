import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import useAuth from '../../shared/hooks/useAuth';

export default function LogOut() {
  const { signOut } = useAuth();

  return <MeetingRoomIcon onClick={signOut} />;
}
