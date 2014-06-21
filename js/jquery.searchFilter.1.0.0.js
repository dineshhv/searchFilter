/*****************************************************
*													 *
*	Author: Dinesh Vadivel							 *
*	Plugin: jquery.dropList.1.0.0.js				 *
*	Date:	20-06-2013								 *
*													 *
*													 *
*													 *
*													 *
*													 *
*													 *
*****************************************************/

(function($){
   var SearchFilter = function(element, options)
   {
       var elem = $(element);
       var obj = this;
       var rand;
       // Merge options with defaults
       var settings = $.extend({
       	  text		: "Search",
          speed		: 200,
        
          type		: "dropdown",
          advanced	: false,
          autofill	: true,
          selected	: "",
          availableTags : [
						      "address",
						      "neighbourhood",
						      "installationType",
						      "adultCount",
						      "childrenCount",
						      "meterType",
						    ]
       }, options || {});
       
       var matched, browser;
       jQuery.uaMatch = function( ua ) {
	   ua = ua.toLowerCase();
	   var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];

		    return {
		        browser: match[ 1 ] || "",
		        version: match[ 2 ] || "0"
		    };
		};

		matched = jQuery.uaMatch( navigator.userAgent );
		browser = {};
		
		if ( matched.browser ) {
		    browser[ matched.browser ] = true;
		    browser.version = matched.version;
		}
		
		// Chrome is Webkit, but Webkit is also Safari.
		if ( browser.chrome ) {
		    browser.webkit = true;
		} else if ( browser.webkit ) {
		    browser.safari = true;
		}
		
		jQuery.browser = browser;
		
       GenerateUI(elem, settings, matched.browser);

      
       
       
       // Public method
       this.addhighlight = function()
       {
           
       };
   };

   function GenerateUI(element, options, browser) 
   {
		console.log(options);
		ID=element.attr('id');
		var sze=0;
		rand1=Math.floor((Math.random()*9999999)+9999);

		      	$( "#"+ID).css({'border-width': '0px', 'outline': 'none'})
					.wrap('<div id="'+rand1+'" class="rare divclearable"></div>')
					.parent()
					.attr('class', $(this).attr('class') + ' divclearable')
					.append('<a class="clearlink" href="javascript:"></a>');
			   	$( "#"+ID).before('<div class="taglist" id="taglist"></div>');
				$('.clearlink')
					.attr('title', 'Click to clear this textbox')
					.click(function() {
						
						$(this).prev().val('').focus();
						$(this).siblings('#taglist').empty();
						$('#'+ID).css({left:10,width:280})

				});

		
		console.log(ID);
		parentID=element.parent().attr('id');
		console.log(parentID)
		var obj=[];
		width=$('#'+ID).width();

		if(options.autofill==true)
		{
			function split( val ) {
		      return val.split( /,\s*/ );
		    }
		    function extractLast( term ) {
		      return split( term ).pop();
		    }
		    $( "#"+ID)
		      // don't navigate away from the field on tab when selecting an item
		      .bind( "keydown", function( event ) {
		        if ( event.keyCode === $.ui.keyCode.TAB &&
		            $( this ).data( "ui-autocomplete" ).menu.active ) {
		          event.preventDefault();
		        }
		        if(event.keyCode === $.ui.keyCode.ENTER)
		        {
		        	var wwidth=0;
		        	obj.push({'data':$(this).val()});
		        	sze=obj.length;

		        	rand=Math.floor((Math.random()*9999999)+9999);
		        	tag='<div class="tags" id="'+rand+'" data-sidx='+sze+'><div class="labl">'+$(this).val()+'</div><div class="xmark">x</div></div>';
		        	$( "#"+ID).siblings('.taglist').append(tag);
		        	$( "#"+ID).val('');
		        	$('#'+ID).siblings('#taglist').children('.tags').each(function(value){
		        			thisid=$(this).attr('id')
		        			wwidth+=$('#'+thisid).outerWidth(true)+15;
		        			console.log($('#'+thisid).outerWidth(true))
		        			
		        		})
		        		//$('#'+ID).siblings('#taglist').css({width:wwidth});
		        	animat();
		        	$( "#"+parentID+' #taglist .xmark').click(function(){

						index=$(this).parent().data('sidx')-1;

						$(this).parent().remove();
						obj.splice(index, 1)
						animat();
					})	
		        }

		      })
		      .autocomplete({
		        minLength: 0,
		        source: function( request, response ) {
		          // delegate back to autocomplete, but extract the last term
		          response( $.ui.autocomplete.filter(
		            options.availableTags, extractLast( request.term ) ) );
		        },
		        focus: function() {
		          // prevent value inserted on focus
		          return false;
		        },
		        select: function( event, ui ) {
		          var terms = split( this.value );
		          // remove the current input
		          terms.pop();
		          // add the selected item
		          terms.push( ui.item.value );
		          // add placeholder to get the comma-and-space at the end
		          terms.push( "" );
		          this.value = terms.join( ": " );
		          return false;
		        }
		      });
		      	console.log($( "#"+parentID+' #taglist .xmark'))
				
		}
		
		function animat()
		{
			console.log(obj)
			if(obj.length>0)
		    {
		        		
		        		
		        		var totalwidth=$('#'+ID).siblings('#taglist').outerWidth()-50;
		        		$('#'+ID).siblings('#taglist').animate({"margin-left":'-'+totalwidth}, "slow");
		        		$('#'+ID).css({left:60});

		        		//fieldwidth=$('#'+ID).outerWidth( )-60;
		        		$('#'+ID).css({width:240});
		        		
		    }
		    else
		    {
		    			$(this).siblings('#taglist').empty();
						$('#'+ID).css({left:10,width:280})
		    }
		}
		
		
		
		
 };
  
  
   $.fn.searchFilter = function(options)
   {
       return this.each(function()
       {
           var element = $(this);
          
           // Return early if this element already has a plugin instance
           if (element.data('searchFilter')) return;

           // pass options to plugin constructor
           var searchFilter = new SearchFilter(this, options);
          
           // Store plugin object in this element's data
           element.data('searchFilter', searchFilter);
       });
   };
})(jQuery);