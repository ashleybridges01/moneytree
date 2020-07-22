import React, { useState, useContext } from 'react';
import { Paper, InputBase, Button, IconButton } from '@material-ui/core';
import ClearIcon from "@material-ui/icons/Clear"
import { makeStyles, fade} from '@material-ui/core/styles'
import storeApi from '../../utils/storeApi';

const useStyle = makeStyles((theme) => ({
    card:{
        margin:theme.spacing(0,1,1,1),
        paddingBottom: theme.spacing(4),
    },
    input: {
        margin: theme.spacing(1),
    },
    btnConfirm: {
        background: '#5AAC44',
        color: '#fff',
        "&:hover":{
            background: fade("#5AAC44", 0.75),
        }
    },
    confirm: {
        margin: theme.spacing(0,1,1,1),
    },
}))

export default function InputCard({ setOpen, listId, type }) {
    const classes = useStyle();
    const{addMoreCard} = useContext(storeApi)
    const [title, setTitle] = useState('')
    const handleOnChange = (e) =>{
        setTitle(e.target.value);
    };
    const handleBtnConfirm = () => {
        addMoreCard(title, listId);
        setTitle('');
        setOpen(false);
    }

    const handleBlur = () => {
        setOpen(false);
        setTitle('');
    }

    return (
        <div>
            <div>
                <Paper className={classes.card}>
                    <InputBase 
                    onChange={handleOnChange}
                    multiline 
                    onBlur ={() => setOpen(false)}
                    fullWidth 
                    inputProps={{
                        classes: classes.input,
                    }}
                    value={title}
                    placeholder={ type === 'card' ? 'Enter a title for this card..' : 'Enter list title..'}
                    />

                </Paper>
            </div>
            <div className={classes.confirm}>
                <Button className={classes.btnConfirm} onClick= {handleBtnConfirm}>
                    {type === 'card' ? 'Add Card' : 'Add List'}
                </Button>
                <IconButton onClick={()=> setOpen(false)}>
                    <ClearIcon />
                </IconButton>
            </div>
        </div>
    )
}