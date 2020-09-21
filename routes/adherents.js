const express = require('express');
const router = express.Router();
const adherentsCtrl = require('../controllers/adherents');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/', auth, multer, adherentsCtrl.createProject);
router.put('/:id', adherentsCtrl.allowIfLoggedin, adherentsCtrl.grantAccess('readAny', 'adherent'), adherentsCtrl.modifyProject);
router.delete('/:id', adherentsCtrl.allowIfLoggedin, adherentsCtrl.grantAccess('readAny', 'adherent'),adherentsCtrl.deleteProject);
router.get('/', adherentsCtrl.allowIfLoggedin,adherentsCtrl.grantAccess('readAny', 'adherent'), adherentsCtrl.getAllProjet);
router.get('/:id', adherentsCtrl.allowIfLoggedin, adherentsCtrl.grantAccess('readOwn', 'adherent'),adherentsCtrl.getOneProject);



module.exports = router;