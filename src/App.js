import React, {useState, useEffect} from 'react';
// import {v4 as uuid } from 'uuid';
import './App.css';
import List from "./components/List/List";
// import store from './utils/store';
import StoreApi from "./utils/storeApi"
import {makeStyles} from "@material-ui/core/styles"
import InputContainer from './components/Input/InputContainer'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Login from "./Login"
import {viewList, createList, createCard} from './utils/APIUtils'
import Dashboard from './Dashboard'

const useStyle = makeStyles((theme) =>({
  root:{
    display: 'flex',
    height: "100vh",
    background: '#BAC964',
    width: '100%',
    overflowY: 'auto'

  }
}))
export default function App() {
  const [data, setData] = useState(null);
  // const [user, setUser] = useState(null)                         // This line to be used in production
  const [user, setUser] = useState({
    email: "Ash2", 
    userToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTU5OTE1NzQsInN1YiI6IjU2YWRmZjQ3LTg4OGEtNDEwZC1iYjZiLTU2NGNmMzgzN2NjOCIsImVtYWlsIjoiQXNoMiJ9.b5D3-7ZKX5AlkzO6AH_5Imkc4AlDZ9eJc4a3hbIhbPk"})

  useEffect(() => {
    if(user){
      viewList(user.userToken)
        .then(setData)
    }
  }, [user])


  const classes = useStyle();
  const addMoreCard = async (title, listId) => {
    const newCard = await createCard(listId, title, null, null, null, null, null, user.userToken)

    const list = data.lists[listId];
    list.cards = [...list.cards,newCard]

    const newState= {
      ...data,
      lists:{
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
  };

  const addMoreList = async (title) => {

    const newList = await createList(title, user.userToken)
    const newState = {
      listIds:[...data.listIds,newList.id],
      lists:{
        ...data.lists,
        [newList.id]:newList
      }
    }
    setData(newState);
  }
  const updateListTitle = (title, listId) => {
    const list = data.lists[listId];
    list.title = title;

    const newState = {
      ...data,
      lists:{
        ...data.lists,
        [listId]:list
      }
    }
    setData(newState);
  }
  const onDragEnd = (result) => {
    const {destination,source,draggableId, type} = result;

    if (!destination) {
      return;
    }
    if (type === "list") {
      const newListId = data.listIds;
      newListId.splice(source.index,1);
      newListId.splice(destination.index,0, draggableId)
      return;
    }

    const sourceList = data.lists[source.droppableId];
    const destinationList = data.lists[destination.droppableId]
    const draggingCard = sourceList.cards.filter(
      (card) => card.id === draggableId)[0];

    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index,1)
      destinationList.cards.splice(destination.index,0, draggingCard);
      const newState ={
        ...data,
        lists:{
          ...data.lists,
          [sourceList.id]:destinationList,
        },
      };
      setData(newState);
    } else {
      sourceList.cards.splice(source.index,1);
      destinationList.cards.splice(destination.index,0,draggingCard);

      const newState = {
        ...data,
        lists:{
          ...data.lists,
          [sourceList.id]:sourceList,
          [destinationList.id]:destinationList,
        },
      };
      setData(newState);
    }
  }

   
  return (
    <>
    {user ? (
      <StoreApi.Provider value={{addMoreCard, addMoreList, updateListTitle, userToken: user.userToken}}>
        <button onClick={() => setUser(null)}>Logout</button>
        <Dashboard />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="app" type="list" direction="horizontal">
            {(provided) => (
              <div className={classes.root} 
              ref={provided.innerRef}
              {...provided.droppableProps}
              >
              {data && data.listIds.map((listId, index) => {
                const list = data.lists[listId];
                return <List list={list} key={listId} index={index} />
                })}
                <InputContainer type="list" />
                {provided.placeholder}
                </div>
            )}
          </Droppable>
        </DragDropContext>
      </StoreApi.Provider>
    ) : (
      <Login onAuthentication={ (userObject) => setUser(userObject)} />
    )}
      
    </>
)}



