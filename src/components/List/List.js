import React,{useContext, useState, useEffect} from 'react'
// TEST ABOVE
import { Paper, CssBaseline } from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import Title from "./Title"
import Card from "./Card"
import InputContainer from "../Input/InputContainer"
import { Droppable, Draggable } from 'react-beautiful-dnd'
import storeApi from '../../utils/storeApi';

const useStyle = makeStyles((theme)=>({
    root: {
        minWidth: '300px',
        backgroundColor:'EBECF0',
        marginLeft: theme.spacing(1),
    },
    cardContainer: {
        marginTop: theme.spacing(4)
    }
}));
export default function List({ list, index}) {




    const classes = useStyle();
    const {handleDelete, userToken } = useContext(storeApi)
    // const deleteCard = (card) => {
    //     console.log(card.currentTarget)
        
    // }
   

    // const handleDelete = async (id) => {
    //     const userToken = localStorage.getItem("token")
    //     const result = await deleteCard(userToken, id)
    //     console.log(result)
    //     // const newState = {
    //     //   listIds:[...data.listIds,newList.id],
    //     //   lists:{
    //     //     ...data.lists,
    //     //     [newList.id]:newList
    //     //   }
    //     // }
    //     // setData(newState);
    //   }

    


// BELOW IS ORIGINAL WORKING CODE

return (
    <Draggable draggableId={list.id} index={index}>
        {(provided) => (
             <div {...provided.draggableProps} ref={provided.innerRef}>
             <Paper className={classes.root} {...provided.dragHandleProps}>
                 <CssBaseline />
                 <Title title={list.title} listId={list.id} />
                 <Droppable droppableId={list.id}>
                     {(provided) => (
                         <div
                         ref={provided.innerRef} {...provided.droppableProps} 
                         className={classes.cardContainer} >
                              {list.cards.map((card, index)=> (
                         <Card key={card.id} card={card} index={index} deleteCard={(cardId) => handleDelete(list.id, cardId)} />
                          ))}
                          {provided.placeholder}
                         </div>
                     )}
                 </Droppable>
                 <InputContainer listId={list.id} type="card" />
             </Paper>
         </div>
        )}
    </Draggable>
)
}
