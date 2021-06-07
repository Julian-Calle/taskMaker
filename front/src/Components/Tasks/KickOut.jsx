import { useEffect, useState } from 'react';
import { kickOutUser } from '../../https/tasks';
import Modal from '../modals/Modal';

export default function KickOut() {
  const selectId = 10;
  useEffect(() => {
    const load = async () => {};
    load();
  }, [selectId]);
  const [active, setActive] = useState(false);
  return (
    <>
      <button onClick={() => setActive(true)}>kickOutButton</button>
      <Modal
        active={active}
        title={'Patada voladora'}
        closeAction={() => setActive(false)}
        btnName={'Cancelar'}
        actBtn={() => setActive(false)}
        secBtnName={'Echar'}
        secBtnAction={() => kickOutUser(selectId)}
        body={<select></select>}
      >
        kickOut
      </Modal>
    </>
  );
}
