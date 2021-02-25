'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
        login: "oleg",
        nickname: 'oleg',
        password: '$2b$10$OMDfI5a4Im8QPcIk/MArduvRW4MiLUEA9T.AMwvs9flau5pt2SM7G',
        email: 'oleg@oleg.oleg',
        is_admin: 1,
        is_blocked: 0,
        read_only: 0,
        createdAt: '2021-02-15 08:14:54',
        updatedAt: '2021-02-15 08:14:54'
      },{
        login: "alex",
        nickname: 'alex',
        password: '$2b$10$OMDfI5a4Im8QPcIk/MArduvRW4MiLUEA9T.AMwvs9flau5pt2SM7G',
        email: 'alex@alex.alex',
        is_admin: 1,
        is_blocked: 0,
        read_only: 0,
        createdAt: '2021-02-15 08:14:54',
        updatedAt: '2021-02-15 08:14:54'
      },{
        login: "evgen",
        nickname: 'evgen',
        password: '$2b$10$OMDfI5a4Im8QPcIk/MArduvRW4MiLUEA9T.AMwvs9flau5pt2SM7G',
        email: 'evgen@evgen.evgen',
        is_admin: 1,
        is_blocked: 0,
        read_only: 0,
        createdAt: '2021-02-15 08:14:54',
        updatedAt: '2021-02-15 08:14:54'
      }, {
        login: "pavel",
        nickname: 'pavel',
        password: '$2b$10$OMDfI5a4Im8QPcIk/MArduvRW4MiLUEA9T.AMwvs9flau5pt2SM7G',
        email: 'pavel@pavel.pavel',
        is_admin: 1,
        is_blocked: 0,
        read_only: 0,
        createdAt: '2021-02-15 08:14:54',
        updatedAt: '2021-02-15 08:14:54'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};