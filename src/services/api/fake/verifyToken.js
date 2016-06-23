import jwt from 'jsonwebtoken';
const secret = 'secret';

export default token => {
  if (!token) return Promise.reject();

  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => (
       err ? reject(err) : resolve(decoded)
    ));
  });
};
