Moralis.initialize("");
Moralis.serverURL = '';

init = async()=>{
    window.web3 = await Moralis.Web3.enable();
}

login = async() => {
    try {
        const user = await Moralis.Web3.authenticate();
    } catch(error) {
        const code = error.code;

    }
}
logout = async () => {
    await Moralis.User.logOut();
}

signUp = async (email, password) => {
    const user = new Moralis.User();
    user.set('username', email);
    user.set('email', email);
    user.set('password', password);
    try {
        await user.signUp();
    } catch (error) {
        const code = error.code;
        const message = error.message;
    }
};


init();