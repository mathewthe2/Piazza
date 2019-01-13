const translate = require('@k3rn31p4nic/google-translate-api');

module.exports = {
	translate: function(req, res) {
		translate(req.body.text, { to: 'en' }).then(resp => {
			return res.json(resp);
		  }).catch(err => {
			console.error(err);
		  });
	},
};