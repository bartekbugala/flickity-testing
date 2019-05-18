/////// MUSTACHE
(function(){ 
  let carouselItem = document.getElementById('carousel-item').innerHTML;

Mustache.parse(carouselItem);

////

let listItems = '';

for(let i = 0; i < mySlides.length; i++){
  listItems += Mustache.render(carouselItem, mySlides[i]);
};

results.insertAdjacentHTML('beforeend', listItems);

})(); 