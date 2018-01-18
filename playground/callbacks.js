var getUser = (id, callback) => {
  console.log('Getting the user..');
  var user = {
    id,
    name: 'Matteo'
  };

  setTimeout(() => {
    callback(user);
  }, 3000)
};

getUser(1, (user) => {
  console.log(user);
})
