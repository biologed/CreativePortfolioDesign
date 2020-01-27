$(document).ready(function() {
    /* ---------------------------------------------------------------------- */
    /*	Color + cookie.js
    /* ---------------------------------------------------------------------- */
    const getColor = Cookies.get('color');
    if(typeof getColor !== 'undefined' || getColor != null) {
        $('#content').attr('class' , getColor);
        $('#header').attr('class', 'container shadow-none position-relative ' + getColor);
    }

    /* ---------------------------------------------------------------------- */
    /*	Logo
    /* ---------------------------------------------------------------------- */

    const logo = $('.logo');
    $('.item:not(:first-child) a').click(function() {
        logo.fadeIn(600);
    });
    $('.item:first-child a').click(function() {
        logo.fadeOut(600);
    });

    $('.tab-portfolio').click(function () {
        setTimeout(function () {
            $('#portfolio-list').isotope({
                filter: '*',
                itemSelector: '.grid-item',
                layoutMode: 'fitRows'
            });
        },1200) //I don't know how fix it, because easytabs.js do not allow use animation complete event
    });

    /* ---------------------------------------------------------------------- */
    /*	Resume skill
    /* ---------------------------------------------------------------------- */

    $(".skill-name ul").each(function(index, e) {
        let ratNum = 7, rat;
        rat = $(e).attr("data-skill");
        while (ratNum > 0) {
            $(e).append("<li class=\"rounded-circle ml-1 d-inline-block\"></li>");
            ratNum--;
        }
        $(e).find("li").each(function(index, e) {
            if (index >= rat) return false;
            $(e).addClass('point');
        });
    });

    /* ---------------------------------------------------------------------- */
    /*	Social share
    /* ---------------------------------------------------------------------- */

    const socialContainer = $('.social-container');
    $('#share').click(function() {
        if ($(this).parent().hasClass('show')) {
            socialContainer.addClass('hide');
            socialContainer.removeClass('show');
        } else {
            socialContainer.addClass('show');
            socialContainer.removeClass('hide');
        }
    });

    /* ---------------------------------------------------------------------- */
    /*	Change color
    /* ---------------------------------------------------------------------- */

    //A Cookies constant use lib js.cookie.js

    const colorBox = $('.color-box');
    colorBox.children().not(':first').click(function() {
        let idBox = $(this).attr('id');
        console.log(idBox);
        if (idBox !== 'red') {
            $('#content').attr('class', idBox);
            $('#header').attr('class', 'container shadow-none position-relative ' + idBox);
            Cookies.set('color', idBox);
        } else {
            $('#content').removeAttr('class');
            $('#header').attr('class', 'container shadow-none position-relative');
            Cookies.remove('color');
        }
    });

    $('.setting-icon').click(function() {
        if ($(this).parent().hasClass('show')) {
            colorBox.addClass('hide');
            colorBox.removeClass('show');
        } else {
            colorBox.addClass('show');
            colorBox.removeClass('hide');
        }
    });

    /* ---------------------------------------------------------------------- */
    /*	Tabs Menu
    /* ---------------------------------------------------------------------- */

    $("#content").easytabs({
        animate: true,
        updateHash: false,
        transitionIn: 'slideDown',
        transitionOut: 'slideUp',
        animationSpeed: 600,
        tabs: ".item",
        tabActiveClass: 'active',
        collapsible: false
    });

    /* ---------------------------------------------------------------------- */
    /*	Cats Filter
    /* ---------------------------------------------------------------------- */

    // Copy categories to item classes
    $('.cats-filter a').click(function() {
        $('.cats-filter').find('a').removeClass('current');
        $(this).addClass('current');
    });

    /* ---------------------------------------------------------------------- */
    /*	Portfolio
    /* ---------------------------------------------------------------------- */

    const list = $('#portfolio-list');
    // Run Isotope
    list.isotope({
        filter: '*',
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });

    // Isotope Filter
    $('#portfolio-filter a').click(function() {
        let selector = $(this).attr('data-filter');
        list.isotope({
            filter: selector,
            itemSelector: '.grid-item',
            layoutMode: 'fitRows',
            animationOptions: {
                duration: 600,
                easing: 'linear',
                queue: false
            }
        });
    });

    // Magnific Popup Zoom Box
    list.magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
            titleSrc: function(item) {
                return item.el.attr('title');
            }
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't forget to change the duration also in CSS
            opener: function(element) {
                return element.find('img');
            }
        }
    });
});