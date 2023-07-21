const {Router} = require('express');
const router = Router();
const { getTenant, getTenantById, createTenant, deleteTenant, updateTenant} = require("../controllers/inquilino.controller");

router.get('/tenant', getTenant)
router.get('/tenant/:id', getTenantById)
router.post('/tenant', createTenant)
router.delete('/tenant/:id', deleteTenant)
router.put('/tenant' , updateTenant)

module.exports = router;