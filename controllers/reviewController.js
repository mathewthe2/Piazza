const $ = require('cheerio');
const Nightmare = require('nightmare');
const translate = require('@k3rn31p4nic/google-translate-api');
const url = 'https://www.tripadvisor.com/Hotel_Review-g294217-d302173-Reviews-or20-Regal_Airport_Hotel-Hong_Kong.html';
//const url = 'https://en.tripadvisor.com.hk/Hotel_Review-g294217-d1210756-Reviews-Hyatt_Regency_Hong_Kong_Tsim_Sha_Tsui-Hong_Kong.html';
// Defining all methods and business logic for routes

const getDianPingReviews = async() => {
	const nightmare = Nightmare();
	return nightmare
		.goto('http://www.dianping.com/shop/23501292')
		.evaluate(() => document.querySelector('body').outerHTML)
		.then(html => console.log(html));
}

const getReviews = async() => {
	const nightmare = Nightmare();
	return nightmare
		.goto(url)
		.click('#filters_detail_language_filterLang_ALL') //show all languages
		.wait(() => document.getElementById('filters_detail_language_filterLang_ALL').getAttribute('checked') !== null)
		.click('.ulBlueLinks') // show all description of comments
		.wait(() => document.querySelector('.ulBlueLinks').innerHTML !== 'More')
		.evaluate(() => document.querySelector('body').outerHTML)
		.then(html => $('.review-container', html));
}

const translateReview = async(text) => {
	translate(text, { to: 'en' }).then(res => {
		if (res.from.language.iso === 'en') {
			return ''
		} else {
			return res.text;
		}
	  }).catch(err => {
		console.error(err);
	  });
}

module.exports = {
	findDianPingReviews: function(req, res) {
		getDianPingReviews();
		return res.json({
			length: 0,
			reviews: {}
		});
	},
	findAll: function(req, res) {
		getReviews().then(reviews=>{
			const reviewObjects = reviews.toArray().map(r=>{
				$(r).find('.ulBlueLinks').remove() // remove show less
				$(r).find('.userLoc').remove(); // remove location
				$(r).find('.badgetext').remove(); //remove contributions
	
				let rating = '';
				['bubble_10', 
				'bubble_20', 
				'bubble_30', 
				'bubble_40', 
				'bubble_50'].forEach(ratingClassName=>{
					if ($('.ui_bubble_rating', r).hasClass(ratingClassName)){
						rating = ratingClassName.slice(-2);
					}
				})
				return {
					source: 'TripAdvisor',
					author: $('.member_info', r).text().trim(),
					avatar: $('.ui_avatar', r).children('img').attr('src'),
					rating: rating,
					date: $('.ratingDate', r).attr('title'),
					title: $('.noQuotes', r).text(),
					description: $('.entry', r).text(),
				}
			});
			return res.json({
				length: reviews.length,
				reviews: reviewObjects
			});
		});
	},
};