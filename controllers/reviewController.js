const $ = require('cheerio');
const Nightmare = require('nightmare');
const translate = require('@k3rn31p4nic/google-translate-api');
const BASE_URL = 'http://en.tripadvisor.com.hk';
const url = 'https://en.tripadvisor.com.hk/Hotel_Review-g294217-d11772135-Reviews-Hilton_Garden_Inn_Hong_Kong_Mongkok-Hong_Kong.html';
//const url = 'https://en.tripadvisor.com.hk/Hotel_Review-g294217-d1210756-Reviews-Hyatt_Regency_Hong_Kong_Tsim_Sha_Tsui-Hong_Kong.html';
// Defining all methods and business logic for routes

const getDianPingReviews = async() => {
	const nightmare = Nightmare();
	return nightmare
		.goto('http://www.dianping.com/shop/23501292')
		.evaluate(() => document.querySelector('body').outerHTML)
		.then(html => console.log(html));
}

const getGoogleReviews = async() => {
	const googleUrl = 'https://www.google.com/travel/hotels/Tsim%20Sha%20Tsui/place/2012885808450641203/reviews?ap=YhQxNzI2Nzg3NDE4MDE2MjU1NzA5OQ&g2lb=4208993%2C4209588%2C4223281%2C4232068%2C4207631%2C4220469%2C4226113&hl=en&gl=hk&un=0&q=tsim%20sha%20tsui%20hotels&rp=OAJAAA&ictx=1&ved=0CEkQqOACKABqFwoTCOjc7tib9N8CFQAAAAAdAAAAABAB&hrf=CgUItgcQACIDSEtEKhYKBwjjDxABGBQSBwjjDxABGBUYASACsAEAmgEPEg1Uc2ltIFNoYSBUc3VpogEaCgkvbS8wMjB4XzESDVRzaW0gU2hhIFRzdWmSAQIgAQ&tcfs=EjQKCS9tLzAyMHhfMRINVHNpbSBTaGEgVHN1aRoYCgoyMDE5LTAxLTIwEgoyMDE5LTAxLTIxUgA';
	const nightmare = Nightmare();
	return nightmare
		.goto(googleUrl)
		.evaluate(() => document.querySelector('body').outerHTML)
		.then(html => console.log(html));
}

const getReviews = async() => {
	const nightmare = Nightmare();
	return nightmare
		.goto(url)
		.wait('#filters_detail_language_filterLang_ALL')
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
		getGoogleReviews()
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
				const response = $(r).find('.mgrRspnInline').remove(); // get response if exists
				const responseObject = $(response).html() === null ? null : 
					{
						author: $('.header', response).text().split(', responded')[0], //, responded to...
						date: $('.responseDate', response).attr('title'),
						description: $('.entry', response).text()
					}
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
					title: $('.title', r).text(),
					url: BASE_URL + $('.title', r).attr('href'),
					description: $('.entry', r).text(),
					response: responseObject
				}
			});
			return res.json({
				length: reviews.length,
				reviews: reviewObjects
			});
		});
	},
};