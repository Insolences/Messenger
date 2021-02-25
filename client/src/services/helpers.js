import { refactorUser } from "../App/DashboardPage/DashboardPage";

const newUsers = [];

export const updateUsers = (users)=>{
    let arr = users;
        return (function newArr(){
            newUsers = arr
            return refactorUser(newUsers)
        })()
}

