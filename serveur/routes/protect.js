const passport = require ('passport');
const express = require ('express') ;
const router = express.Router();

//router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
   // res.send('Route protégée');
 
//});

//module.exports = router ;



const { protectedRoute } = require('../middlewares/jwt');

router.get('/protected', protectedRoute, (req, res) => {
  return res.status(200).json({ message: 'You have accessed the protected route' });
});

module.exports = router;





