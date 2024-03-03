const db = require("./db");

const register = async (username, passwd) => {
    await db.connect(async () => {
        try
        {
            const insertQuery = 'INSERT INTO users (username,passwd) VALUES (?,?)';
            const [rows, fields] = await db.promise().query(insertQuery, [username, passwd])
            .then( row => {
                console.log("Veritabanına kayıt başarıyla tamamlandı!")
            })
            .catch();
        }
        catch(err)
        {
            console.log("HATA : " + err)
        }  
    })
}

module.exports = register