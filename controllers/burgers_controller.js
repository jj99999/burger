var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

var dateNow = Date.now();

router.get('/', function (req, res) {
	res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
	burger.all(function (data) {
		var burgObject = { burgers: data };
		console.log(burgObject);
		res.render('index', burgObject);
	});
});

router.post('/burgers/create', function (req, res) {
	burger.create(['burger_name'], [req.body.name], function () {
		res.redirect('/burgers');
	});
});

router.put('/burgers/update/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	console.log('condition', condition);

	burger.update({ devoured: req.body.devoured }, condition, function () {
		res.redirect('/burgers');
	});
});

router.delete('/burgers/delete/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	burger.delete(condition, function () {
		res.redirect('/burgers');
	});
});

module.exports = router;
