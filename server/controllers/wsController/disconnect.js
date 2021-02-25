module.exports = disconnect = (socketId, senderUsers, recieverUsers) => {
  const deleteSocket = senderUsers.splice(
    senderUsers.findIndex((elem) => elem[socketId]),
    1
  );
  const id = deleteSocket[0][socketId].id;
  recieverUsers[id].splice(
    recieverUsers[id].findIndex((elem) => elem === socketId),
    1
  );

  return { senderUsers, recieverUsers };
};
