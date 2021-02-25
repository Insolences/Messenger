import React, { useState,useRef } from "react";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./SearchPanel.style";

const SearchPanel = ({ handleSearch,handleClearSearch,onKeyPress }) => {
  const classes = useStyles();
  const searchValue = useRef("");

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search user"
        inputRef={searchValue}
        onKeyPress={(event)=>onKeyPress(event,searchValue.current.value)}
        onChange={(event)=>handleClearSearch(event,searchValue.current.value)}
      />
      <IconButton
        type="button"
        className={classes.iconButton}
        aria-label="search"
        onClick={(event) => handleSearch(event,searchValue.current.value)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchPanel;
