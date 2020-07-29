import React, {useState, useContext} from 'react'
import {Typography, InputBase} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import storeApi from '../../utils/storeApi';

const useStyle = makeStyles((theme)=>({
    editableTitleContainer: {
        margin: theme.spacing(1),
        display: 'flex',
    },
    editableTitle:{
        flexGrow: 1,
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    input:{
        margin: theme.spacing(1),
        "&:focus":{
            background: '#F7FBE1'
        }
    }
}));

export default function Title({title, listId}) {
    const [open,setOpen] = useState(false)
    const [newTitle, setNewTitle] = useState(title);
    const classes = useStyle();
    const {updateListTitle} = useContext(storeApi)
    const handleOnChange = (e) => {
        setNewTitle(e.target.value);
    };

    const handleOnBlur = () => {
        updateListTitle(newTitle, listId)
        setOpen(false);
    }
    return (
        <div>
            {open ? (
                <div>
                    <InputBase 
                    onChange={handleOnChange}
                    autoFocus
                    value={newTitle}
                    inputProps={{
                        className: classes.input,
                    }} 
                    fullWidth
                    onBlur={handleOnBlur}
                    />
                </div>
            ) : (
                <div className={classes.editableTitleContainer}>
                    <Typography onClick={() => setOpen(!open)} className={classes.editableTitle}>{title}</Typography>
                    <DeleteForeverIcon />
                </div>
            )}
        </div>
    );
}