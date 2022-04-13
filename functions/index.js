const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

const getTeamsFromDatabase = (res) => {
    let teams = [];
    return db.collection('teams').get().then(
        snapshot => {
            snapshot.forEach(team => {
                teams.push({
                    id: team.id,
                    name: team.get('name'),
                    manager: team.get('manager'),
                    year_est: team.get('year_est'),
                    wins: team.get('wins'),
                    losses: team.get('losses'),
                    draws: team.get('draws'),
                    points: team.get('points')
                });
              });
            res.status(200).json(teams);
        },
        error => {
            res.status(error.code).json({
                message: `Error: ${error.message}`
            });
        }
    );
};

const getTeamsFromDatabasebyName = (res, name) => {
    let teams = [];
    return db.collection('teams').where('name', '==', name).get().then(
        snapshot => {
            snapshot.forEach(team => {
                teams.push({
                    id: team.id,
                    name: team.get('name'),
                    manager: team.get('manager'),
                    year_est: team.get('year_est'),
                    wins: team.get('wins'),
                    losses: team.get('losses'),
                    draws: team.get('draws'),
                    points: team.get('points')
                });
              });
            res.status(200).json(teams);
        },
        error => {
            res.status(error.code).json({
                message: `Error: ${error.message}`
            });
        }
    );
};

exports.addTeam = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'POST') {
            return res.status(401).json({
                message: 'Not allowed'
            })
        }

        const name = req.query.name;
        const manager = req.query.manager;
        const year_est = req.query.year_est;
        const wins = req.query.wins;
        const losses = req.query.losses;
        const draws = req.query.draws;
        const points = req.query.points;

        db.collection('teams').add({ name, manager, year_est, wins, losses, draws, points });
        
        getTeamsFromDatabase(res);
    });
});

exports.deleteTeam = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
      if(req.method !== 'DELETE') {
        return res.status(401).json({
          message: 'Not allowed'
        })
      }
      const id = req.query.id;
      db.collection('teams').doc(id).delete();
      getTeamsFromDatabase(res);
    });
  });

exports.updateTeam = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'PUT') {
            return res.status(401).json({
                message: 'Not allowed'
            })
        }
        const id = req.query.id;
        const name = req.query.name;
        const manager = req.query.manager;
        const year_est = req.query.year_est;
        const wins = req.query.wins;
        const losses = req.query.losses;
        const draws = req.query.draws;
        const points = req.query.points;

        db.collection('teams').doc(id).set({ name, manager, year_est, wins, losses, draws, points });
        
        getTeamsFromDatabase(res);
    });
});

exports.getTeamsByName = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'GET') {
            return res.status(404).json({
                message: 'Not allowed'
            })
        }
        getTeamsFromDatabasebyName(res, req.query.name);
    });
});

exports.getTeams = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'GET') {
            return res.status(404).json({
                message: 'Not allowed'
            })
        }
        getTeamsFromDatabase(res);
    });
});

const getFixturesFromDatabase = (res) => {
    let fixtures = [];
    return db.collection('fixtures').get().then(
        snapshot => {
            snapshot.forEach(fixture => {
                fixtures.push({
                    id: fixture.id,
                    homeTeam: fixture.get('homeTeam'),
                    awayTeam: fixture.get('awayTeam'),
                    homeScore: fixture.get('homeScore'),
                    awayScore: fixture.get('awayScore'),
                });
              });
            res.status(200).json(fixtures);
        },
        error => {
            res.status(error.code).json({
                message: `Error: ${error.message}`
            });
        }
    );
};

exports.addFixture = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'POST') {
            return res.status(401).json({
                message: 'Not allowed'
            })
        }

        const homeTeam = req.query.homeTeam;
        const awayTeam = req.query.awayTeam;
        const homeScore = req.query.homeScore;
        const awayScore = req.query.awayScore;

        db.collection('fixtures').add({ homeTeam, awayTeam, homeScore, awayScore });
        
        getFixturesFromDatabase(res);
    });
});

exports.deleteFixture = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
      if(req.method !== 'DELETE') {
        return res.status(401).json({
          message: 'Not allowed'
        })
      }
      const id = req.query.id;
      db.collection('fixtures').doc(id).delete();
      getFixturesFromDatabase(res);
    });
  });

exports.getFixtures = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'GET') {
            return res.status(404).json({
                message: 'Not allowed'
            })
        }
        getFixturesFromDatabase(res);
    });
});

exports.updateFixture = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'PUT') {
            return res.status(404).json({
                message: 'Not allowed'
            })
        }
        const id = req.query.id;
        const homeTeam = req.query.homeTeam;
        const awayTeam = req.query.awayTeam;
        const homeScore = req.query.homeScore;
        const awayScore = req.query.awayScore;

        db.collection('fixtures').doc(id).set({ homeTeam, awayTeam, homeScore, awayScore });
        
        getTeamsFromDatabase(res);
    });
});
