import bcrypt from 'bcrypt';
const saltRounds = 10;

export default password => {
  if (!password) return Promise.reject();

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => (
      err ? reject(err) : resolve(hash)
    ));
  });
};
