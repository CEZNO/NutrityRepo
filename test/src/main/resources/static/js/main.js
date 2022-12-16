/**
* Template Name: Logis - v1.2.1
* Template URL: https://bootstrapmade.com/logis-bootstrap-logistics-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/


document.addEventListener('DOMContentLoaded', () => {
	"use strict";

	//food list 비동기화  



	/**
	 * Preloader
	 */
	const preloader = document.querySelector('#preloader');
	if (preloader) {
		window.addEventListener('load', () => {
			preloader.remove();
		});
	}

	/**
	 * Sticky header on scroll
	 */
	const selectHeader = document.querySelector('#header');
	if (selectHeader) {
		document.addEventListener('scroll', () => {
			window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
		});
	}

	/**
	 * Scroll top button
	 */
	const scrollTop = document.querySelector('.scroll-top');
	if (scrollTop) {
		const togglescrollTop = function() {
			window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
		}
		window.addEventListener('load', togglescrollTop);
		document.addEventListener('scroll', togglescrollTop);
		scrollTop.addEventListener('click', window.scrollTo({
			top: 0,
			behavior: 'smooth'
		}));
	}

	/**
	 * Mobile nav toggle
	 */
	const mobileNavShow = document.querySelector('.mobile-nav-show');
	const mobileNavHide = document.querySelector('.mobile-nav-hide');

	document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
		el.addEventListener('click', function(event) {
			event.preventDefault();
			mobileNavToogle();
		})
	});

	function mobileNavToogle() {
		document.querySelector('body').classList.toggle('mobile-nav-active');
		mobileNavShow.classList.toggle('d-none');
		mobileNavHide.classList.toggle('d-none');
	}

	/**
	 * Hide mobile nav on same-page/hash links
	 */
	document.querySelectorAll('#navbar a').forEach(navbarlink => {

		if (!navbarlink.hash) return;

		let section = document.querySelector(navbarlink.hash);
		if (!section) return;

		navbarlink.addEventListener('click', () => {
			if (document.querySelector('.mobile-nav-active')) {
				mobileNavToogle();
			}
		});

	});

	/**
	 * Toggle mobile nav dropdowns
	 */
	const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

	navDropdowns.forEach(el => {
		el.addEventListener('click', function(event) {
			if (document.querySelector('.mobile-nav-active')) {
				event.preventDefault();
				this.classList.toggle('active');
				this.nextElementSibling.classList.toggle('dropdown-active');

				let dropDownIndicator = this.querySelector('.dropdown-indicator');
				dropDownIndicator.classList.toggle('bi-chevron-up');
				dropDownIndicator.classList.toggle('bi-chevron-down');
			}
		})
	});

	/**
	 * Initiate pURE cOUNTER
	 */
	new PureCounter();

	/**
	 * Initiate glightbox
	 */
	const glightbox = GLightbox({
		selector: '.glightbox'
	});

	/**
	 * Init swiper slider with 1 slide at once in desktop view
	 */
	new Swiper('.slides-1', {
		speed: 600,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		},
		slidesPerView: 'auto',
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}
	});

	/**
	 * Animation on scroll function and init
	 */
	function aos_init() {
		AOS.init({
			duration: 1000,
			easing: 'ease-in-out',
			once: true,
			mirror: false
		});
	}
	window.addEventListener('load', () => {
		aos_init();
	});

	//  Result FoodLists Section
	$("#foodBtn").click(function() {
		if ($("#foodname").val() == "") {
			alert("음식 이름을 입력하세요")
			return;
		}
		$.ajax({
			type: "get",
			url: "/board/foodList?foodname=" + $("#foodname").val(),
		})
			.done(function(resp) {
				if (resp != null) {
					const listHeadr = ['음식 이름', '카테고리', '칼로리', '탄수화물', '단백질', '지방', '당', '나트륨', '트랜스<br>지방', '칼슘', '비타민C', '철분']
					var str = '';
					str += "<div class='container'>";
					str += "<div data-aos='fade-up' class='list-text-header row'>"
					str += "<div class='col-3'></div>"
					for (let i = 0; i < 11; i++) {
						str += "<div class='col'></div>"
					}
					str += "</div>" //list-text-header row
					str += "<div data-aos='fade-up' class='list-text-content'>";

					$.each(resp, function(key, val) {
						str += "<div class='row slide-up'>";
						str += "<div class='col-3'>" + Object.values(val)[1] + '</div> ';
						for (let i = 2; i < 13; i++) {
							str += "<div class='col'>" + Object.values(val)[i] + "</div>"
						}
						str += '</div>'; //row slide-up
					});
					str += '</div>'; //list-text-content

					str +=
						"<div data-aos='fade-up' data-aos-delay='100' class='link-sector'>";
					str += "<div class='row justify-content-end'>";
					str += "<div class='col-4'>";
					str += "<a href='#'>";
					str += '<h3>';
					str += '나만의 식단 만들기';
					str += "<i class='bi bi-arrow-right'></i>";
					str += '</h3>';
					str += '</a>';
					str += '</div>'; //col-4
					str += '</div>'; //row justify-content-end
					str += '</div>'; //link-sector

					str += "</div>" //container

					$('#foodlists').html(str);

					let j = 0;
					$('.list-text-header.row > div').each(function(index, item) {
						if (j < listHeadr.length) {
							$(this).append(listHeadr[j])
							j++
						} else {
							j = 0;
						}
					})
					if ($('#foodlists').css('display') == 'none') {
						$('#foodlists').show();
					}
				}
			})
			.fail(function(e) {
				alert("error" + e)
			})
	})

	//	var checkbox = $("input[name=fcode]:checkbox");

	var foodArr = new Array();
	$("#selectFoodBtn").click(function() {

		if ($("#SelectFoodname").val() == "") {
			alert("음식 이름을 입력하세요")
			return;
		}//if

		$.ajax({
			type: "get",
			url: "/board/foodList?foodname=" + $("#SelectFoodname").val(),
		})//ajax

		.done(function(resp) {
			if (resp != null) {
				var str = "<div class='container'  style='text-align: center;'>";
					str += "<table class='table table-hover'>"
					str += "<thead> <tr>"
					str += "<th><input type='checkbox'></th>"
					str += "<th>음식 이름</th>"
					str += "<th>카테고리</th> "
					str += "<th>Made By</th> "
					str += "</tr>"
					str += "</thead>"
					str += "</tbody>"
				$.each(resp, function(key, val) {
					str += "<tr>"
					str += "<td><input type='checkbox' class='chckbox' value= '" + val.foodcode + "' name='fcode'></td>"
					str += "<td>" + val.foodname + "</td> "
					str += "<td>" + val.category + "</td> "
					str += "<td>" + val.madeby + "</td> "
					str += "</tr>"
				})//each
					str += "</tbody>"
					str += "</table>"
				
				$("#selectFood").html(str)
				if ($("#selectFood").css("display") == "none") {
						$("#selectFood").show();
				}//display
			}//resp
			
			$("input[name=fcode]:checkbox").click(function() {
				if ($("input[name=fcode]:checkbox").is(":checked")) {
					foodArr.push($(this).val())
				}//isChecked
			})//.click
			console.log(foodArr)
		})//done
		.fail(function(e) {
			alert("error" + e)
		})//fail
	})//selectFoodBtn
//	console.log(foodArr)
//	function food_check() {
//
//		for (var i = 0; i < select.fname.length; i++) {
//
//			if (checked[i].checked == true) {
//
//				chkList += checked[i].value + "";
//
//			}
//
//		}


//		self.close();

//	}

});
