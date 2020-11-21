import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import KanbanDBAction from './dbOperations/kanbanDBActions';
import StatusColumn from './Components/statusColumn';
import AddNote from './Components/addNote';
import { KanbanDBConnectContext } from './dbOperations/kanbanDBConnectContext';

import KanbanDB from 'kanbandb';
// const InstanceId = Math.random() * 100;
const InstanceId = 'adp';
const KanbanDBConnect = KanbanDB.connect(`${InstanceId}`);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
  },
  appContainer: {
    padding: '20px 20px 50px 20px',
    maxWidth: '1024px',
    background: '#EDF3F8',
  },
}));

function App() {
  const classes = useStyles();

  let [userAction, setUserAction] = useState('Started');

  const kanbanBoardData = [
    { title: 'To-Do', status: 'TODO' },
    { title: 'In Progress', status: 'IN_PROGRESS' },
    { title: 'Done', status: 'DONE' },
  ];

  useEffect(() => {
    console.log(userAction);
    setUserAction('Updated');
  }, [userAction]);

  const getColumn = () => {
    let tempkanbanBoardData = [];
    kanbanBoardData.map((data, index) => {
      tempkanbanBoardData.push(<StatusColumn colData={data} key={index} />);
      return null;
    });
    return tempkanbanBoardData;
  };

  const addToDo = (textBoxRef) => {
    if (textBoxRef.current.value) {
      KanbanDBAction(KanbanDBConnect, 'addCard', { name: textBoxRef.current.value, status: 'TODO' });
      textBoxRef.current.value = '';
      setUserAction('Added');
    }
  };

  return (
    <KanbanDBConnectContext.Provider value={KanbanDBConnect}>
      <div className={'App ' + classes.root}>
        <h3>KanbanDB App</h3>
        <Grid container className={'app-container ' + classes.appContainer}>
          {getColumn()}
        </Grid>
        <AddNote addToDoAction={addToDo} />
      </div>
    </KanbanDBConnectContext.Provider>
  );
}

export default App;
