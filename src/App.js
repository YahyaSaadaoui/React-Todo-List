import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faCircleCheck , faPen , faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './App.css';
function App() {
  // tasks :
  const [toDo, setToDo] = useState([{ "id": 1, "title": "create a to-do list app using react.js", "status": true },
                                    { "id": 2, "title": "Get A Job", "status": false }
  ]);
  // temporary tasks
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');
  // function add tasks :
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask('');
     }
  }
  // function delete tasks :
  const deleteTask = (id) => {
    let newTask = toDo.filter(task => task.id !== id);
    setToDo(newTask);
  }
  // function mark task as done 
  const markDone = (id) => {
    let newTask = toDo.map(task => {
      if (task.id === id) {
        return ({...task,status:!task.status})
      } return task;
    })
    setToDo(newTask);
  }
  // function to cancel update
  const cancelUpdate = () => {
    setUpdateData('');
  }
  // function change task for update :
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title:e.target.value,
      status:updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }
  // function to update task 
  const updateTask = () => {
    let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
    let updateObject = [...filterRecords, updateData];
    setToDo(updateObject);
    setUpdateData('');
  }
  return (
    <div className="container App">
      <br /><br />
      <h2>To Do App</h2>
      <br /><br />
      {updateData && updateData ?
        (
          <>
            {/* form to update task  */}
            <div className='row'>
              <div className='col-5'>
                <input value={updateData && updateData.title} onChange={(e) => changeTask(e)} className='form-control form-control-lg' />
              </div>
              <div className='col-4'>
                <button onClick={updateTask} className='btn btn-lg btn-warning mr-20'>Update</button>
                <button onClick={cancelUpdate} className='btn btn-lg btn-danger mr-20'>Cancel</button>
              </div>
            </div><br />
          </>
        ) :
        (
          <>
            {/* form to add task */}
            <div className='row'>
              <div className='col-4'>
                <input value={newTask} onChange={(e => setNewTask(e.target.value))} className='form-control form-control-lg' />
              </div>
              <div className='col-5'>
                <button onClick={addTask} className='btn btn-lg btn-success mr-20'>New Task</button>
              </div>
            </div><br />
          </>
        )
      }
      <div className='empty-text'>
      {toDo && toDo.length ? '' : 'Add New Taskes In The Input Field'}
      </div> {toDo && toDo
        .sort((a,b)=>a.id > b.id ? 1 : -1 )
        .map((task, index) =>{
        return(
          <React.Fragment key={task.id}>
            <div className='col taskBg'>
               <div className={task.status ? 'done' : ''}>
                <span className='taskNumber'>{index + 1}</span>
                <span className='taskText'>{task.title}</span>
              </div>
              <div className="iconsWrap">
                <span title='Done / Not Done ' onClick={(e)=>markDone(task.id)}>
                  <FontAwesomeIcon icon={faCircleCheck}/>
                </span>
                {task.status ? null : (
                  <span title='Modify'
                    onClick={
                      () => setUpdateData({
                        id : task.id,
                        title: task.title,
                        status : task.status ? true : false
                      })
                    }
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </span>
                )}

                <span title='Delete' onClick={()=> deleteTask(task.id)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </span>
              </div>
            </div>
        </React.Fragment>
        )
      })
      }
      <p>all right are reserved to | Yahya Saadaoui</p>
    </div>
  );
}

export default App;
