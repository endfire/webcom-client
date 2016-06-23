import jwt from 'jsonwebtoken';
const secret = 'secret';

export default id => (
  new Promise((resolve, reject) => {
    jwt.sign(id, secret, { algorithm: 'HS256' }, (err, token) => (
      err ? reject(err) : resolve(token)
    ));
  })
);
