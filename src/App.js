import React, {useState, useEffect} from 'react';
import './App.css';
import List from "./components/List/List";
// import store from './utils/store';
import StoreApi from "./utils/storeApi"
import {makeStyles} from "@material-ui/core/styles"
import InputContainer from './components/Input/InputContainer'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Login from "./Login"
import {viewList, createList, createCard, deleteCard} from './utils/APIUtils'
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
    email: "Usario uno", 
    userToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTYwOTE4OTcsInN1YiI6ImM5YTQ3ZDYyLTYxZTktNDk1Yy04NWIzLTNjZWY2OTg2YTRiNyIsImVtYWlsIjoiVXNhcmlvIHVubyJ9.GeP8QzEg9V9QRWp-xs1hO3VcH3ybq9rx0PHCtyza66o"})

  localStorage.setItem("token", user.userToken)
  const storedToken = localStorage.getItem('token')

  useEffect(() => {
    if(user){
      viewList(user.userToken)
        .then(setData)
    }
  }, [user])






  const classes = useStyle();
  const addMoreCard = async (title, listId, amount, expense) => {
    const newCard = await createCard(listId, title, amount, expense, null, null, null, user.userToken)

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

console.log(data)
  const handleDelete = async (listId, cardId) => {
    const userToken = localStorage.getItem("token")
    const result = await deleteCard(userToken, cardId)

    const newData = {...data}
    newData.lists[listId].cards = data.lists[listId].cards.filter(card => card.id !== cardId)


    setData(newData)
    // NEED TO RERENDER AFTER BACKEND HAS DELETED CARD
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
      <StoreApi.Provider value={{addMoreCard, addMoreList, updateListTitle, handleDelete, userToken: user.userToken}}>
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



