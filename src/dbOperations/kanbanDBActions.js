export default function KanbanDBAction(KanbanDBConnect, actionName, actionData = null, callBack = null) {
  if (KanbanDBConnect) {
    switch (actionName) {
      case 'initialize':
        break;
      case 'addCard':
        KanbanDBConnect.then(function (db) {
          db.addCard(actionData);
        }).catch((err) => console.error(err.message));
        break;
      case 'getCardsByStatusCodes':
        KanbanDBConnect.then(function (db) {
          db.getCardsByStatusCodes(actionData)
            .then((dbCards) => {
              if (callBack) callBack(dbCards);
            })
            .catch((err) => console.error(err.message));
        });
        break;
      case 'updateCardById':
        KanbanDBConnect.then(function (db) {
          db.updateCardById(actionData.id, actionData.cardData);
        }).catch((err) => console.error(err.message));
        break;
      case 'deleteCardById':
        KanbanDBConnect.then(function (db) {
          db.deleteCardById(actionData);
        }).catch((err) => console.error(err.message));
        break;
      default:
        console.log(`No Action found for : ${actionName}`);
        break;
    }
  } else {
    console.log(`No DB Found`);
  }
}
