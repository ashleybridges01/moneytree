import React from 'react';
import { Paper } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { Draggable } from 'react-beautiful-dnd';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import List from "./List"



const useStyle = makeStyles((theme) => ({
    card: {
        padding:theme.spacing(1,1,1,2),
        margin:theme.spacing(1,5,1,1),
    },
}));



export default function Card({ card, index, deleteCard }) {
    const classes = useStyle();

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div ref={provided.innerRef} 
                {...provided.dragHandleProps}
                {...provided.draggableProps}>
                    <Paper className={classes.card}>
                        {card.title} - ${card.amount} 
                        <DeleteForeverIcon title={card.title} onClick={() => deleteCard(card.id)} />
                        {/* <DeleteForeverIcon title={card.title} onClick={() => console.log(card)} /> */}
                    </Paper>
                 </div>
            )}
        </Draggable>
    )
}