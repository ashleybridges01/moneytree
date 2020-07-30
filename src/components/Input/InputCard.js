import React, { useState, useContext } from 'react';
import { Paper, InputBase, Button, IconButton, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
import ClearIcon from "@material-ui/icons/Clear"
import { makeStyles, fade} from '@material-ui/core/styles'
import storeApi from '../../utils/storeApi';


const useStyle = makeStyles((theme) => ({
    card:{
        width: '280px',
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
    const{addMoreCard, addMoreList} = useContext(storeApi)
    const [title, setTitle] = useState('')
    const handleOnChange = (e) =>{
        setTitle(e.target.value);
    };
    const [amount, setAmount] = useState('')
    const handleMoneyChange = (e) =>{
        setAmount(e.target.value);
    }
    // const trafficLight = useState('')
    
    const handleBtnConfirm = () => {
        if (type === 'card') {
            addMoreCard(title, listId, amount);
            setTitle('');
            setOpen(false);
          //  console.log(trafficLight)
        } else {
            addMoreList(title);
            setTitle('');
            setOpen(false);
        }
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
                <Paper className={classes.card}>
                <InputBase 
                    onChange={handleMoneyChange}
                    multiline 
                    onBlur ={() => setOpen(false)}
                    fullWidth 
                    inputProps={{
                        classes: classes.input,
                    }}
                    value={amount}
                    placeholder={ 'amount'}
                    />
                </Paper>
                <FormControl>
                <InputLabel id="label">Priority of expense</InputLabel>
                <Select labelId="label" id="select">
                    <MenuItem value= "0" >Critical Expense</MenuItem>
                    <MenuItem value="1">Important expense</MenuItem>
                    <MenuItem value="2">Luxury</MenuItem>
                </Select>
                </FormControl>
            
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