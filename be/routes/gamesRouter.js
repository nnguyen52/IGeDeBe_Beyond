const router = require('express').Router();
const gamesCtrl = require('../controllers/gamesCtrl');

router.post('/getPre500games', gamesCtrl.getPre500games);

router.post('/justReleasedGames', gamesCtrl.getJustReleasedGames);
router.post('/comingSoonGames', gamesCtrl.comingSoonGames);
router.post('/mostAnticipatedGames', gamesCtrl.mostAnticipatedGames);

router.post('/getGamesDetails/:id', gamesCtrl.getGamesDetails);

router.post('/getJustReleasedGamesPagination/:offset', gamesCtrl.getJustReleasedGamesPagination);
router.post(
  '/getMostAnticipatedGamesPagination/:offset',
  gamesCtrl.getMostAnticipatedGamesPagination
);
router.post(
  '/getJustComingSoonGamesPagination/:offset',
  gamesCtrl.getJustComingSoonGamesPagination
);

router.post('/searchGames/:query', gamesCtrl.searchGame);

module.exports = router;
