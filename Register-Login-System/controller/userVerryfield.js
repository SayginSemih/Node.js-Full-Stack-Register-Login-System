const db = require("./db");
const userVerryfield = (username, passwd, repasswd) => {
    let errors = [];
    if (username.length < 5)
    {
        errors.push({ message: "Kullanıcı adı en az 5 karakter uzunluğunda olmalıdır!"});
    }
    if (passwd != repasswd)
    {
        errors.push({ message: "Şifreler aynı olmalıdır!"});
    }
    if (passwd.length < 6)
    {
        errors.push({ message: "Şifreler en az 6 karakter içermelidir!"});
    }
    return errors
}

module.exports = userVerryfield