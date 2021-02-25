import React from "react";
import Button from "@material-ui/core/Button";

export default ({ chat, openGroupUsers, handleChange }) => {
  return (
    <tr>
      <td scope="row" data-label="id">
        {chat.id}
      </td>
      <td scope="row" data-label="title">
        {/* {chat.title} */}
        <input
          type="text"
          name="title"
          value={chat.title}
          onChange={(event) => handleChange(event, chat.id)}
        />
      </td>
      <td scope="row" data-label="owner_id">
        {chat.owner_id}
      </td>
      <td scope="row" data-label="created At">
        {chat.createdAt}
      </td>
      <td>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={() => openGroupUsers(chat.id)}
        >
          MORE INFO
        </Button>
      </td>
    </tr>
  );
};
