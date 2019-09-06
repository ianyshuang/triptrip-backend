const express = require('express')
const router = express.Router()
const siteController = require('../controllers/siteController')
const passport = require('passport')

const authencitcated = passport.authenticate('jwt', { session: false })

router.get('/popular', siteController.getPopularSites)
router.get('/:id', siteController.getSite)
  
router.patch(':id/collect', authencitcated, siteController.toggleCollectingSite)
router.patch('/:id/comment', authencitcated, siteController.handleSiteComment)
router.patch('/:id/:commentId/reply', authencitcated, siteController.handleSiteReply)

module.exports = router
