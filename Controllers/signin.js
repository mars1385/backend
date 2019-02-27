const handelSignIn = ( db , bcrypt) => (req ,res) =>{

    const {email , password} = req.body;

    if (!email || ! password){
        return res.status(400).json('unable to register');
    }

    db.select('*').from('login')
    .where('email' , '=' , email)
    .then(data => {
        const isValid = bcrypt.compareSync(password , data[0].hash );
        if(isValid){
            return db.select('*').from('users')
            .where('email' , '=' , email)
            .then(user => {
                res.json(user[0]);
            })
            .catch(error => res.status(400).json('unable to get user'));
        }
        else{
            res.json('email or password is wrong');
        }
    })
    .catch(error => res.status(400).json('email or password is wrong'));

}

module.exports = {
    handelSignIn 
}