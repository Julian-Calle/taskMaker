import React, { useState } from 'react';
import { deleteTask, editTask } from '../../https/tasks';
import '../../css/tasks.css';
import Modal from '../modals/Modal';
import ButtonIcon from '../utils';
import EditForm from './EditForm';
import '../../css/deleteForm.css';


export default function TaskCard({ taksList,updateListOfTask }) {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  
  const defaultTaskValue = {
    task: '',
    checked: false,
    timeLimit: null,
    color: 'white',
    type: null,
    taskId: null,
  };
  
  const [taskSelected, setTaskSelected] = useState(defaultTaskValue);

async function updateTask(taskEdited){
  await editTask(taskEdited);
  updateListOfTask();

}

  const activeEditModal = (taskToSelect) => {
    setTaskSelected(taskToSelect);
    setEditModal(!editModal);
  
  };
  const activeDeleteModal = (selectedTask) => {
    setTaskSelected(selectedTask);
    setDeleteModal(true);
  };

  return (
    <div className="cardTaskContainer">
      <Modal active ={editModal}  title={"Editar TASK"} 
      body={<EditForm taskInfo={taskSelected} setTask={setTaskSelected} updateTask={updateTask}/>} 
      actBtn={true}  btnName="CANCELAR" btnAction={()=>setEditModal(!editModal)} closeAction={()=>setEditModal(!editModal) } 
      secBtnAction={()=>{console.log("second")}} ></Modal>
      {/* <Modal active ={editModal} actBtn={true} actSecBtn={true} title={"hola"} closeAction={()=>setEditModal(!editModal) } 
secBtnName="cancelar" btnName="OK" btnAction={()=>{console.log("fist")}} secBtnAction={()=>{console.log("second")}} body={<h2>hech_T</h2>} ></Modal> */}
      <Modal
        active={deleteModal}
        title={'Eliminar TASK'}
        body={
          <section className="deleteContainer">
            <h4>
              ¿Seguro que quiere <span style={{ color: 'red' }}>eliminar </span>
              la task?
            </h4>
          </section>
        }
        actBtn={true}
        btnName="ELIMINAR"
        btnAction={() => {
          deleteTask(taskSelected.id);
          setDeleteModal(!deleteModal);
        }}
        closeAction={() => setDeleteModal(!deleteModal)}
        secBtnAction={() => setDeleteModal(!deleteModal)}
        actSecBtn={true}
        secBtnName="CANCELAR"
      ></Modal>
      {taksList.map((task) => {
        const checkState = task.checked ? true : false;
        const taskLimitDate = new Date(task.timeLimit).toLocaleDateString();
        // console.log(taskLimitDate);
        return (
          <div key={task.id} className="cardTask">
            <div
              className="colorTask"
              style={{ backgroundColor: `${task.color}` }}
            >
              {task.color}
              {task.id}
            </div>
            <h3 className="timeLimit">{taskLimitDate}</h3>
            <p className="contentTask">{task.task}</p>
            <div className="actionTasks">
              <h3>{task.type}</h3>
              <ButtonIcon
                action={() => {
                  activeEditModal(task);
                }}
                icon="edit"
                cls="editIcon cardIcon"
              />
              <ButtonIcon
                action={() => {
                  activeDeleteModal(task);
                }}
                icon="trash"
                cls="deleteIcon cardIcon"
              />
              <ButtonIcon icon="user-plus" cls="shareIcon cardIcon" />
              <ButtonIcon icon="send" cls="sendIcon cardIcon" />
              <input
                className="checkIcon cardIcon"
                readOnly
                checked={checkState}
                type="checkbox"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
