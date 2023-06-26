import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [toDo, setToDo] = useState([
    { id: 1, title: 'create a to-do list app using react.js', status: true },
    { id: 2, title: 'Get A Job', status: false },
  ]);

  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const addTask = () => {
    if (newTask) {
      const num = toDo.length + 1;
      const newEntry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    const newTaskList = toDo.filter((task) => task.id !== id);
    setToDo(newTaskList);
  };

  const markDone = (id) => {
    const updatedTasks = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(updatedTasks);
  };

  const cancelUpdate = () => {
    setUpdateData('');
  };

  const changeTask = (e) => {
    const newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };

  const updateTask = () => {
    const filteredTasks = toDo.filter((task) => task.id !== updateData.id);
    const updatedTasks = [...filteredTasks, updateData];
    setToDo(updatedTasks);
    setUpdateData('');
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
    setDraggedTaskId(id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, id) => {
    e.preventDefault();
    const dropTargetId = id;
    if (draggedTaskId !== dropTargetId) {
      const tasks = [...toDo];
      const draggedTask = tasks.find((task) => task.id === draggedTaskId);
      const dropTargetTask = tasks.find((task) => task.id === dropTargetId);
      const draggedTaskIndex = tasks.indexOf(draggedTask);
      const dropTargetTaskIndex = tasks.indexOf(dropTargetTask);

      // Swap the positions of dragged task and drop target task
      tasks[draggedTaskIndex] = dropTargetTask;
      tasks[dropTargetTaskIndex] = draggedTask;
      setToDo(tasks);
    }
  };

  return (
    <div className="container App">
      <br />
      <br />
      <h2>To Do App</h2>
      <br />
      <br />
      {updateData && updateData ? (
        <>
          <div className="row">
            <div className="col-5">
              <input
                value={updateData.title}
                onChange={(e) => changeTask(e)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-4">
              <button onClick={updateTask} className="btn btn-lg btn-warning mr-20">
                Update
              </button>
              <button onClick={cancelUpdate} className="btn btn-lg btn-danger mr-20">
                Cancel
              </button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <>
          <div className="row">
            <div className="col-4">
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-5">
              <button onClick={addTask} className="btn btn-lg btn-success mr-20">
                New Task
              </button>
            </div>
          </div>
          <br />
        </>
      )}
      <div className="empty-text">{toDo && toDo.length ? '' : 'Add New Tasks In The Input Field'}</div>
      {toDo &&
        toDo.map((task, index) => (
          <div
            key={task.id}
            className="col taskBg"
            draggable={true}
            onDragStart={(e) => handleDragStart(e, task.id)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, task.id)}
          >
            <div className={task.status ? 'done' : ''}>
              <span className="taskNumber">{index + 1}</span>
              <span className="taskText">{task.title}</span>
            </div>
            <div className="iconsWrap">
              <span title="Done / Not Done " onClick={() => markDone(task.id)}>
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>
              {!task.status && (
                <span
                  title="Modify"
                  onClick={() =>
                    setUpdateData({
                      id: task.id,
                      title: task.title,
                      status: task.status ? true : false,
                    })
                  }
                >
                  <FontAwesomeIcon icon={faPen} />
                </span>
              )}
              <span title="Delete" onClick={() => deleteTask(task.id)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </span>
            </div>
          </div>
        ))}
      <p>All rights reserved to Yahya Saadaoui</p>
    </div>
  );
}

export default App;
