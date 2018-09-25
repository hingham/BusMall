'use strict'
var productDisplay = document.getElementById('products');
var firstProduct = document.getElementById('image-one');
var secondProduct = document.getElementById('image-two');
var thirdProduct = document.getElementById('image-three');
var list = document.getElementById('results');

var totalVotes = 0;
var imgOne, imgTwo, imgThree, prevImgOne, prevImgTwo, prevImgThree;

function ranNum(){
    var randomNum = Math.floor(Math.random() * Product.busProducts.length);
    return randomNum;
}
function getProducts(){
    //generate a ranNum and display the image at that number
    imgOne = ranNum();
    imgTwo = ranNum();
    imgThree = ranNum();

    //check if two ranNums are the same
    while(imgOne===imgTwo){
         imgTwo = ranNum();
    }
    while(imgOne === imgThree || imgTwo ===imgThree){
        imgThree = ranNum();
    }

    firstProduct.src =  Product.busProducts[imgOne].filepath;
    firstProduct.alt = Product.busProducts[imgOne].productName;

    secondProduct.src =  Product.busProducts[imgTwo].filepath;
    secondProduct.alt = Product.busProducts[imgTwo].productName;

    thirdProduct.src =  Product.busProducts[imgThree].filepath;
    thirdProduct.alt = Product.busProducts[imgThree].productName;

}

Product.busProducts = [];

function Product (filepath, productName){
    this.filepath = filepath;
    this.productName = productName;
    this.clickTotal = 0;
    this.displayedTotal = 0;
    Product.busProducts.push(this);
}


//event handler to change images on click
    //event handler needs to keep track of what image was clicked
    //event handler needs to tally how many times the image was clicked
    //event handler needs to tally how many time the image was shonw
    //do not show image that is currently showing or was currently showing

function clickHandler(event) {
    if (!event){
        getProducts();
        Product.busProducts[imgOne].displayedTotal+=1;
        Product.busProducts[imgTwo].displayedTotal+=1;
        Product.busProducts[imgThree].displayedTotal+=1;
    }
  
    var target = event.target.alt;

    if(Product.busProducts[imgOne].productName === target){
    Product.busProducts[imgOne].clickTotal += 1;
    console.log('click total: ' + target + Product.busProducts[imgOne].clickTotal);
    }
    if(Product.busProducts[imgTwo].productName === target){
        Product.busProducts[imgTwo].clickTotal += 1;
        console.log('click total: ' + target + Product.busProducts[imgTwo].clickTotal);
    }
    if(Product.busProducts[imgThree].productName === target){
        Product.busProducts[imgThree].clickTotal += 1;
        console.log('click total: ' + target + Product.busProducts[imgThree].clickTotal);
    }

    prevImgOne = imgOne;
    prevImgTwo  = imgTwo;
    prevImgThree = imgThree;

    
    console.log('prev image #' + prevImgOne + prevImgTwo + prevImgThree);

    while(imgOne === prevImgOne || imgOne === prevImgTwo || imgOne === prevImgThree
        || imgTwo === prevImgOne || imgTwo === prevImgTwo || imgTwo === prevImgThree
        || imgThree === prevImgOne || imgThree === prevImgTwo || imgThree === prevImgThree){
        getProducts();
        }

    console.log('new img numbers' + imgOne + imgTwo + imgThree);

    //check which images were displayed and add a value to the variable to track times displayed
    Product.busProducts[imgOne].displayedTotal+=1;
    Product.busProducts[imgTwo].displayedTotal+=1;
    Product.busProducts[imgThree].displayedTotal+=1;
    

    totalVotes += 1;
    console.log('total clicks' + totalVotes);
    
    
    if (totalVotes === 25){
        productDisplay.removeEventListener('click', clickHandler);
        getResults();
    }

}

//instantiate produts
new Product('assets/bag.jpg', 'bag');
new Product('assets/chair.jpg', 'chair');
new Product('assets/banana.jpg', 'banana');
new Product('assets/boots.jpg', 'boots');
new Product('assets/bubblegum.jpg', 'bubble');
new Product('assets/breakfast.jpg', 'breakfast');
new Product('assets/chair.jpg', 'chair');
new Product('assets/cthulhu.jpg', 'cthulhu');
new Product('assets/dog-duck.jpg', 'dog-duck');
new Product('assets/dragon.jpg', 'dragon');
new Product('assets/pen.jpg', 'pen');
new Product('assets/pet-sweep.jpg', 'pet');
new Product('assets/scissors.jpg', 'scissors');
new Product('assets/shark.jpg', 'shark');
new Product('assets/sweep.png', 'sweep  ');
new Product('assets/tauntaun.jpg', 'tauntaum');
new Product('assets/unicorn.jpg', 'unicorn');
new Product('assets/usb.gif', 'usb');
new Product('assets/water-can.jpg', 'water-can');
new Product('assets/wine-glass.jpg', 'wine-glass');


function getVotes () {
    productDisplay.addEventListener('click', clickHandler);
}

function getResults() {
    productDisplay.setAttribute('class', 'hidden');

    for(var i = 0; i < Product.busProducts.length; i++){
        var percent = (Product.busProducts[i].clickTotal/Product.busProducts[i].displayedTotal) * 100;

        var displayedSummary = 'You viewed ' + Product.busProducts[i].productName + ' ' +
        Product.busProducts[i].displayedTotal + ' times.'
        var voteSummary = ' You clicked on ' + Product.busProducts[i].productName + ' ' +
        Product.busProducts[i].clickTotal + ' times.'  
        var precentSummary = ' You clicked ' + Product.busProducts[i].productName + ' ' + 
        percent + '% of the time when given the choice.';

        var newLi = document.createElement('li');
        var liText = document.createTextNode(displayedSummary + voteSummary + precentSummary);
        newLi.appendChild(liText)
        list.appendChild(newLi);
    }
}



getVotes();
clickHandler();


//display three products side by side--should be the same size
    //will need to edit photos
    //allow users to select favorite product
    //keep track of clicks
        //allow 25 clicks--(test with 5)

//track percentage of times an item was clicked when it was shown

//display three images by calling event?


//print the results for each image to the page. 