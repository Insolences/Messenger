const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");
const adminLayer = require("../service/adminLayer");

class AdminController {
    async allUsers(req, res) {

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
                objUsers.sortUser.map((el)=>{
                    adminLayer.updateUsers(el.id, el.is_admin, el.is_blocked, el.read_only)
                })

                return res.status(200).json({message: "Пользователь обновлен"});
            }catch(e) {
                console.log(e);
            }    
        };   
    }

    async getAllChats(req, res){
        const { token } = req.headers;
        const { is_admin } = jwt.verify(token, secret);

        if (!is_admin) {
            return res.status(403).json({ message: "У вас нет доступа" });

        }else{
            try{
                let getAllChats = await adminLayer.getAllChats();
                const addd = getAllChats[0].reduce((acc, item) => {

                    const resolt = getAllChats[1][0].filter((elem) => elem.chat_id === item.dataValues.id)
                    acc.push({...item, users: resolt})
                    return acc
                }, [])

                if(getAllChats.length===0){
                    return res.status(400).json({message: 'Список чатов пустой'});
                }

                return res.json(addd);
                }catch(e) {
                console.log(e);
            }   
        };   
    };

    async deleteUserOfChat(req, res){
        const { token } = req.headers;
        const { is_admin } = jwt.verify(token, secret);
        const { chat_id, user_id} = req.body;

        if (!is_admin) {
            return res.status(403).json({ message: "У вас нет доступа" });

        }else{
            try{

                let delUserChat = await adminLayer.deleteUsersOfChats(chat_id, user_id);

                return res.json(delUserChat);
                }catch(e) {
                console.log(e);
            }   
        };

    }


}

module.exports = new AdminController();
