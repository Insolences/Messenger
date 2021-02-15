const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");
const adminLayer = require("../service/adminLayer");

class AdminController {
    async findUsers(req, res) {

        const { token } = req.headers;
        const { is_admin } = jwt.verify(token, secret);

        if (!is_admin) {

            return res.status(403).json({ message: "У вас нет доступа" });

        }else{
            try{
                let allUsers = await adminLayer.allUsers();
                if(allUsers.length===0){
                    return res.status(400).json({message: 'Список пользователей пустой'});
                }

                return res.json(allUsers);
                }catch(e) {
                console.log(e);
            }   
        }   
    }

    async updateUsers(req, res) {
        const { token } = req.headers;
        const { is_admin } = jwt.verify(token, secret);
        const objUsers = req.body;

        if (!is_admin) {
            return res.status(403).json({ message: "У вас нет доступа" });

        }else{
            try{
                for(let i = 0; i<objUsers.length; i++){
                    console.log(typeof(objUsers[i].id));
                    await adminLayer.updateUsers(objUsers[i].id, objUsers[i].login, objUsers[i].nickname, objUsers[i].email, objUsers[i].is_admin,
                        objUsers[i].is_blocked, objUsers[i].read_only);
                }

                return res.status(200).json({message: "Пользователь обновлен"});
            }catch(e) {
                console.log(e);
            }    
        }   
    }
    async getAllChats(req, res){
        const { token } = req.headers;
        const { is_admin } = jwt.verify(token, secret);

        if (!is_admin) {
            return res.status(403).json({ message: "У вас нет доступа" });

        }else{
            try{
                let getAllChats = await adminLayer.getAllChats();
                console.log(getAllChats);
                if(getAllChats.length===0){
                    return res.status(400).json({message: 'Список чатов пустой'});
                }

                return res.json(getAllChats);
                }catch(e) {
                console.log(e);
            }   
        };   
    };

}

module.exports = new AdminController();
