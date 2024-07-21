const express = require('express');
const router = express.Router();
const bankAccountController = require('../controllers/bankAccountController');
// const auth = require('../middlewares/auth');

router.post('/', bankAccountController.createBankAccount);
router.get('/personal', bankAccountController.getPersonal);
router.get('/', bankAccountController.getInitial);
router.get('/receivers', bankAccountController.getReceivers);
router.get('/receiverslocal', bankAccountController.getReceiversLocal);
router.get('/receiversforeign', bankAccountController.getReceiversForeign);
router.put('/', bankAccountController.updateSender);
router.delete('/:id', bankAccountController.deleteReceiver);

module.exports = router;
