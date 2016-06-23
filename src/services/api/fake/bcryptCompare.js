import bcrypt from 'bcrypt';

export default (plaintextPassword, hashedPassword) => {
  if (!plaintextPassword || !hashedPassword) return Promise.reject();

  return new Promise((resolve, reject) => {
    bcrypt.compare(plaintextPassword, hashedPassword, (err, res) => (
      err ? reject(err) : resolve(res)
    ));
  });
};
