let elem = document.querySelector('.main-carousel');
let flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true,
  hash: true,
});

let progressBar = document.querySelector('.progress-bar');
let btnStart = document.querySelector('.btn');

// vanilla JS
flkty.on( 'scroll', function( progress ) {
  progress = Math.max( 0, Math.min( 1, progress ) );
  progressBar.style.width = progress * 100 + '%';
});



flkty.on( 'change', function( index ) {
  console.log('Flickity change ' + index );
  if (markerFlag === true) {
  mymap.setView([mySlides[index].lat, mySlides[index].lng], 5);
  }
});

// element argument can be a selector string
//   for an individual element


btnStart.addEventListener( 'click', function( event ) {
  // filter for button clicks
  if ( !matchesSelector( event.target, '.btn' ) ) {
    return;
  }
  let selector = event.target.getAttribute('data-selector');
  flkty.selectCell( selector );
});