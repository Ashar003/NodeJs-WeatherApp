var getUser = (id, callback) => {
    var user = {
        id: id,
        name: 'Akash'
    };

    setTimeout(() => {
        callback(user);
    },9999);

};

getUser(34, (userObject) => console.log(userObject));
