import {React,useState,useRef} from 'react';
import useStyle from "./CreateGroup.style.js"
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import CreateIcon from '@material-ui/icons/Create';
import {IconButton,Tooltip,Grid} from '@material-ui/core';
import ListApp from '../ListApp/ListApp.jsx';
import { TextField } from '@material-ui/core';

const CreateGroup = ({closeFunc, allUsers, sendGroup, setMsgShow, setCreateGroup, setOpenIcons}) => {

	const classes = useStyle()
	const groupName = useRef('');
  	const [checked, setChecked] = useState([]);
  	const [error, setError] = useState([]);

  	const handleToggle = (value) => () => {
    	const currentIndex = checked.indexOf(value);
    	const newChecked = [...checked];

		if (currentIndex === -1) {
		newChecked.push(value);
		} else {
		newChecked.splice(currentIndex, 1);
		}

    	setChecked(newChecked);
    };
	const handleCreate = (event) => {
		event.preventDefault()
		if(checked.length < 2){
			setError("Для создания группы нужно выбрать минимум 2 пользователя")
			return false
		}
		if(groupName.current.value.length===0){
			setError("Вы не ввели название группы")
			return false
		}
		setError("")
		sendGroup(groupName.current.value, checked)
		setMsgShow(true)
		setCreateGroup(false)
		setOpenIcons(null)
	}
	return (
		<div className={classes.CreateGroup}>
			<HighlightOffIcon className={classes.close} onClick={closeFunc}/>
			<h3>Создать группу</h3>
			<Grid container className={classes.row}>
				<TextField
				variant="outlined"
				margin="normal"
				required
				id="login"
				label="Название группы"
				name="Название группы"
				autoFocus
				helperText={error}
				className={classes.group__name}
				inputRef={groupName}
				></TextField>
				<Tooltip title="Создать" placement="left">
                    <IconButton
                      onClick={handleCreate}
                    >
                      <CreateIcon />
                    </IconButton>
                </Tooltip>
			</Grid>
			<List dense className={classes.root}>
				{allUsers.map((user) => {
					const labelId = `checkbox-list-secondary-label-${user.id}`;
					return (
					<ListItem key={user.id} button onClick={handleToggle(user.id)}> 
						<ListItemAvatar>
						<Avatar
							src={user.img}
						/>
						</ListItemAvatar>
						<ListItemText id={labelId} primary={user.nickname} />
						<ListItemSecondaryAction>
						<Checkbox
							edge="end"
							onChange={handleToggle(user.id)}
							checked={checked.indexOf(user.id) !== -1}
							inputProps={{ 'aria-labelledby': labelId }}
						/>
						</ListItemSecondaryAction>
					</ListItem>
					);
				})}
			</List>
		</div>
	);
}

export default CreateGroup;
