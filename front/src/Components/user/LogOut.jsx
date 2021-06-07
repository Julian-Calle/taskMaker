import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { useState } from 'react';
import useAuth from '../../shared/hooks/useAuth';
import Modal from '../modals/Modal';

export default function LogOut() {
  const { signOut } = useAuth();
  const [active, setActive] = useState(false);
  //Molaría un Modal solo de info n?
  return (
    <>
      <MeetingRoomIcon onClick={() => setActive(true)} />
      <Modal
        active={active}
        title={'¿Estás seguro que quieres cerrar sesión?'}
        btnName={'Cancelar'}
        actBtn={() => setActive(false)}
        secBtnName={'Cerrar sesión'}
        actSecBtn={true}
        secBtnAction={() => {
          setActive(false);
          signOut();
        }}
        closeAction={() => {
          setActive(false);
        }}
      />
    </>
  );
}
