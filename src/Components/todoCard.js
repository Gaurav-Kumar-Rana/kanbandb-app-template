import React, { useRef, useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { makeStyles } from '@material-ui/core/styles';
import KanbanDBAction from '../dbOperations/kanbanDBActions';
import { KanbanDBConnectContext } from '../dbOperations/kanbanDBConnectContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    background: '#fff;',
    textAlign: 'left',
    marginBottom: '10px',
    borderRadius: '2px',
    cursor: 'move',
    position: 'relative',
    fontSize: '14px',
  },
  closeBtn: {
    position: 'absolute',
    top: '2px',
    right: '2px',
    cursor: 'pointer',
    fontSize: '14px',
  },
}));

function TodoCard(props) {
  const classes = useStyles();
  const cardRef = useRef(null);
  const KanbanDBConnect = useContext(KanbanDBConnectContext);
  const { cardData } = props;
  const drag = (ev) => {
    ev.dataTransfer.setData('text', ev.target.id);
  };
  const deleteToDo = (toDoId) => {
    let delElem = document.getElementById(toDoId);
    delElem.style.display = 'none';
    KanbanDBAction(KanbanDBConnect, 'deleteCardById', toDoId);
  };
  return (
    <Paper id={cardData.id} className={'todo-card ' + classes.paper} draggable="true" onDragStart={drag} ref={cardRef}>
      <span>{cardData.name}</span>
      <HighlightOffIcon
        className={classes.closeBtn}
        onClick={() => {
          deleteToDo(cardData.id);
        }}
      />
    </Paper>
  );
}

export default TodoCard;
