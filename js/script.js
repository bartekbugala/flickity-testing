var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true,
  hash: true,
});

var progressBar = document.querySelector('.progress-bar');
var btnStart = document.querySelector('.btn');

// vanilla JS
flkty.on( 'scroll', function( progress ) {
  progress = Math.max( 0, Math.min( 1, progress ) );
  progressBar.style.width = progress * 100 + '%';
});

// element argument can be a selector string
//   for an individual element
var flkty = new Flickity( '.main-carousel', {
  // options
});



btnStart.addEventListener( 'click', function( event ) {
  // filter for button clicks
  if ( !matchesSelector( event.target, '.btn' ) ) {
    return;
  }
  var selector = event.target.getAttribute('data-selector');
  flkty.selectCell( selector );
});


/////// MUSTACHE

var carouselItem = document.getElementById('carousel-item').innerHTML;

Mustache.parse(carouselItem);

var listItems = '';

for(var i = 0; i < mySlides.length; i++){
  console.log(mySlides);
  listItems += Mustache.render(carouselItem, mySlides[i]);
};

var fullSlideList = Mustache.render(carouselItem, {listItems});

results.insertAdjacentHTML('beforeend', fullSlideList);