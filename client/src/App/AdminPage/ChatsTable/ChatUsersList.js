import React from "react";
import Button from "@material-ui/core/Button";

export default ({ user, handleDelete }) => {
  return (
    <tr>
      <td scope="row">{user.id}</td>
      <td scope="row" data-label="nickname">
        {user.nickname}
      </td>
      <td scope="row" data-label="email">
        {user.email}
      </td>
      <td>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          onClick={() => handleDelete(user.id)}
        >
          DELETE USER
        </Button>
      </td>
    </tr>
  );
};
