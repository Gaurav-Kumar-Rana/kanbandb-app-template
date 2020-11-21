import React, { useEffect, useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TodoCard from './todoCard';
import { KanbanDBConnectContext } from '../dbOperations/kanbanDBConnectContext';
import KanbanDBAction from '../dbOperations/kanbanDBActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    boxShadow: 'none',
    background: 'transparent',
  },
}));

function StatusColumn(props) {
  const classes = useStyles();
  const KanbanDBConnect = useContext(KanbanDBConnectContext);
  let [cardsData, getCardsData] = useState(null);

  useEffect(() => {
    KanbanDBAction(KanbanDBConnect, 'getCardsByStatusCodes', [props.colData.status], getCardsData);
  }, [props, KanbanDBConnect]);

  const drop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData('text');
    if (data && ['TODO', 'IN_PROGRESS', 'DONE'].includes(ev.target.id)) {
      ev.target.appendChild(document.getElementById(data));
      KanbanDBAction(KanbanDBConnect, 'updateCardById', { id: data, cardData: { status: ev.target.id } });
    }
  };

  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  return (
    <Grid item xs={4} className={'app-column'}>
      <h4>{props.colData.title}</h4>
      <Paper id={props.colData.status} className={classes.paper} onDrop={drop} onDragOver={allowDrop}>
        {cardsData &&
          cardsData.map((card, index) => {
            return <TodoCard key={index} cardData={card} />;
          })}
      </Paper>
    </Grid>
  );
}

export default StatusColumn;
