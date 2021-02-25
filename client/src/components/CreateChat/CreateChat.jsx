import React, {useState,useRef} from "react";
import useStyle from "./CreateChat.style.js";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import SearchPanel from "../SearchPanel/SearchPanel";
import ListApp from "../ListApp/ListApp";

const CreateChat = ({ closeFunc,savedUsers, allUsers, setAllUsers,sendChat,setCreateChat,setOpenIcons, setActive, setMsgShow,chats }) => {
  const classes = useStyle();
  const onKeyPress = (event,searchValue) => {
    if (event.which === 13) {
      handleSearch(event,searchValue);
    }
  };
  const handleSearch = (event,searchValue) => {
    event.preventDefault()
    setAllUsers(allUsers.filter((elem)=> (elem.nickname.indexOf(searchValue))!==-1))
  };
  const handleClearSearch = () => {
    setAllUsers(savedUsers)
  };

  return (
    <div className={classes.CreateChat}>
      <HighlightOffIcon className={classes.close} onClick={closeFunc} />
      <h3>Начать общение</h3>
      <SearchPanel handleSearch={handleSearch} handleClearSearch={handleClearSearch} onKeyPress={onKeyPress}/>
      <ListApp allUsers={allUsers} sendChat={sendChat} setCreateChat={setCreateChat} setOpenIcons={setOpenIcons} setActive={setActive} setMsgShow={setMsgShow} chats={chats}/>
    </div>
  );
};

export default CreateChat;
