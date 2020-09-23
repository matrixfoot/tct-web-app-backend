const express = require('express');
const router = express.Router();
const affilesCtrl = require('../controllers/affiles');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/', auth, multer, affilesCtrl.createAdherent);
router.put('/:id', affilesCtrl.allowIfLoggedin, affilesCtrl.grantAccess('readAny', 'adherent'), affilesCtrl.modifyAdherent);
router.delete('/:id', affilesCtrl.allowIfLoggedin, affilesCtrl.grantAccess('readAny', 'adherent'),affilesCtrl.deleteAdherent);
router.get('/', affilesCtrl.allowIfLoggedin,affilesCtrl.grantAccess('readAny', 'adherent'), affilesCtrl.getAllAffiles);
router.get('/:id', affilesCtrl.allowIfLoggedin, affilesCtrl.grantAccess('readOwn', 'adherent'),affilesCtrl.getOneAdherent);



module.exports = router;