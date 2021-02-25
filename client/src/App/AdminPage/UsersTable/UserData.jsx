import React, { useState, useEffect } from "react";
import componentStyle from "./UsersTable.module.scss";

export default ({ user, handleChange }) => {
  // const handelTestChange = (e) =>{
  //   const target = e.target;
  //   const name = target.name;
  //   setUserInfo({[name] : e.target.value})
  //   console.log('name: ', name)
  // }

  return (
    <tr>
      <td scope="row">{user.id}</td>
      <td scope="row" data-label="login">
        {user.login}
      </td>
      <td scope="row" data-label="nickname">
        <input
          type="text"
          name="nickname"
          value={user.nickname}
          onChange={(event) => handleChange(event, user.id)}
        />
      </td>
      <td scope="row" data-label="is_admin">
        <input
          type="checkbox"
          name="is_admin"
          checked={user.is_admin}
          className={componentStyle.checkbox}
          onChange={(event) => handleChange(event, user.id)}
        />
      </td>
      <td scope="row" data-label="read_only">
        <input
          type="checkbox"
          name="read_only"
          className={componentStyle.checkbox}
          checked={user.read_only}
          onChange={(event) => handleChange(event, user.id)}
        />
      </td>
      <td scope="row" data-label="is_blocked">
        <input
          type="checkbox"
          name="is_blocked"
          className={componentStyle.checkbox}
          checked={user.is_blocked}
          onChange={(event) => handleChange(event, user.id)}
        />
      </td>
      <td scope="row" data-label="email">
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={(event) => handleChange(event, user.id)}
        />
      </td>
    </tr>
  );
};
