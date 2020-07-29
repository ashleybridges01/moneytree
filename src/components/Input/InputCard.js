import React, { useState, useContext } from 'react';
import { Paper, InputBase, Button, IconButton } from '@material-ui/core';
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
    const handleBtnConfirm = () => {
        if (type === 'card') {
            addMoreCard(title, listId, amount);
            setTitle('');
            setOpen(false);
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
                {/* <FormControl className={classes.margin}>
                    <InputLabel htmlFor="demo-customized-textbox">Title</InputLabel>
                    <BootstrapInput id="demo-customized-textbox" value={title} />
                </FormControl> */}
                {/* <FormControl className={classes.margin}>
                    <InputLabel htmlFor="demo-customized-textbox">Amount</InputLabel>
                    <BootstrapInput id="demo-customized-textbox" value={amount} />
                </FormControl> */}
                {/* <FormControl className={classes.margin}>
                <InputLabel id="demo-customized-select-label">Priority of expense</InputLabel>
                    <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={expense}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                    >
                    <MenuItem value="">
                     <em>None</em>
                    </MenuItem>
                    <MenuItem value={0}>Priority expense</MenuItem>
                    <MenuItem value={1}>Medium expense</MenuItem>
                    <MenuItem value={2}>Luxury</MenuItem>
                    <MenuItem value={3}>Income</MenuItem>
                    </Select>
                </FormControl> */}
                
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