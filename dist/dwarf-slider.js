/**
 * Created by Creative User on 2/12/2016.
 */
$.fn.DwarfSlider = function( options ) {

    // Defining our default settings
    var settings = $.extend({
        interval     : 3000,
        navigation   : true,
        pagination   : true,
        showLoader: true,
        progressBar    : true,
        slidezIndexMax: 500
    }, options);

    return this.each( function() {

            var self = this;

            this.onload = function(){

                console.log("Loaded --");
                console.log( this );
                console.log( $(self).children("li").first()[0].offsetHeight );
                console.log("Loaded --");

            }

            self.totalElements = $(self).children("li").length;
            self.allElements = $(self).children("li");
            self.initialHeight = $(self).children("li").first()[0].offsetHeight;
            $(self).addClass("dwarf-slider");
            $(self).height(self.initialHeight);
            $(self).children("li").height(self.initialHeight);

            self.currentIndex = 0;
            self.prevIndex = 0;
            self.sliderProgress = 0;

            for(var a=0; a < self.totalElements; a++ ){
                //console.log( this.allElements[a] );
            }


            $(window).resize(function(){
                //console.log( $(self).children("li").first()[0].innerHeight() );
            });

            // Pagination
            if( settings.pagination ){

                var $pagination = $('<div />');
                self.pagination = $pagination;
                self.pagination.addClass("dwarf-slider-pagination");

                for(var el=0; el < self.totalElements; el++){
                    var $loader = $('<div />', { 'data-slide': el });
                    self.loader = $loader;
                    self.loader.addClass("page-nav");
                    jQuery.data( self.loader, "id", "elsdasd");
                    self.loader.on( "click", function(e){

                        clearInterval( self.runSlider );

                        $(self.allElements[self.currentIndex]).velocity({
                            translateX: "100%",
                            rotateZ: "90deg"
                        }).fadeOut(300);

                        $(self.allElements[$(this).data("slide")]).fadeIn(50).velocity({
                            translateX: "0px",
                            rotateZ: "0deg"
                        });

                        self.sliderProgressOnClick = ( $(this).data("slide") ) / self.totalElements;
                        $(self.status).animate({"width": (self.sliderProgressOnClick * 100) + "%"}, 200);

                        $(self.pagination).children(".page-nav").removeClass("active");
                        $(this).addClass("active");

                        self.runSlider = setInterval( moveSlider , settings.interval);

                    } );
                    self.pagination.append(self.loader);
                }
                $(self).append(self.pagination);
            }

            // ProgressBar
            if( settings.progressBar ){

                var $progressBar = $('<div />');
                self.progressBar = $progressBar;
                self.progressBar.addClass("slider-progress");

                var $status = $('<div />');
                self.status = $status;
                self.status.addClass("status");

                self.progressBar.append(self.status);

                $(self).append(self.progressBar);
            }
            // ProgressBar


            // Navigation ( prev / next buttons )
            if( settings.navigation ){

                function goPrev(){
                    clearInterval( self.runSlider );
                    self.currentIndex--;
                    if ( self.currentIndex < 0) {
                        self.currentIndex = (self.totalElements - 1);
                    }

                    $(self.pagination).children(".page-nav").removeClass("active");
                    $(self.pagination).children(".page-nav").eq(self.currentIndex).addClass("active");

                    $(self.allElements[self.prevIndex]).velocity({
                        translateX: "100%",
                        rotateZ: "90deg"
                    }).fadeOut(300);

                    $(self.allElements[self.currentIndex]).fadeIn(50).velocity({
                        translateX: "0px",
                        rotateZ: "0deg"
                    });

                    self.sliderProgress = ( self.currentIndex ) / self.totalElements;
                    $(self.status).animate({"width": (self.sliderProgress * 100) + "%"}, 200);

                    self.prevIndex = self.currentIndex;
                    self.runSlider = setInterval( moveSlider , settings.interval);
                }

                function goNext(){
                    clearInterval( self.runSlider );
                    self.currentIndex++;
                    if ( self.currentIndex >= self.totalElements) {
                        self.currentIndex = 0;
                    }

                    $(self.pagination).children(".page-nav").removeClass("active");
                    $(self.pagination).children(".page-nav").eq(self.currentIndex).addClass("active");

                    $(self.allElements[self.prevIndex]).velocity({
                        translateX: "100%",
                        rotateZ: "90deg"
                    }).fadeOut(300);

                    $(self.allElements[self.currentIndex]).fadeIn(50).velocity({
                        translateX: "0px",
                        rotateZ: "0deg"
                    });

                    self.sliderProgress = ( self.currentIndex ) / self.totalElements;
                    $(self.status).animate({"width": (self.sliderProgress * 100) + "%"}, 200);

                    self.prevIndex = self.currentIndex;
                    self.runSlider = setInterval( moveSlider , settings.interval);
                }

                var $prevNav = $('<div />');
                self.prevNav = $prevNav;
                self.prevNav.addClass("slide-left-nav");
                self.prevNav.on('click', function(e){
                    goPrev();
                });

                var $nexttNav = $('<div />');
                self.nexttNav = $nexttNav;
                self.nexttNav.addClass("slide-right-nav");
                self.nexttNav.on('click', function(e){
                    goNext();
                });

                $(self).append(self.prevNav);
                $(self).append(self.nexttNav);
            }
            // Navigation ( prev / next buttons )

            self.runSlider = setInterval( moveSlider , settings.interval);

            function moveSlider(){

                self.currentIndex++;
                if ( self.currentIndex >= self.totalElements) {
                    self.currentIndex = 0;
                }

                $(self.pagination).children(".page-nav").removeClass("active");
                $(self.pagination).children(".page-nav").eq(self.currentIndex).addClass("active");

                $(self.allElements[self.prevIndex]).velocity({
                    translateX: "100%",
                    rotateZ: "90deg"
                }).fadeOut(300);

                $(self.allElements[self.currentIndex]).fadeIn(50).velocity({
                    translateX: "0px",
                    rotateZ: "0deg"
                });

                self.sliderProgress = ( self.currentIndex ) / self.totalElements;
                $(self.status).animate({"width": (self.sliderProgress * 100) + "%"}, 200);

                self.prevIndex = self.currentIndex;

                console.log( self.currentIndex );

                /*console.log("Called Slider timer Start");
                 console.log(self.sliderProgress);
                 console.log(self);
                 console.log("Called Slider timer end");*/

            }




    });

}
