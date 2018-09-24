'use strict'
var productDisplay = document.getElementById('products');
var firstProduct = document.getElementById('image-one');
var secondProduct = document.getElementById('image-two');
var thirdProduct = document.getElementById('image-three');
var list = document.getElementsByTagName('list');

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
}

//instantiate produts
new Product('assets/bag.jpg', 'bag');
new Product('assets/chair.jpg', 'chair');
new Product('assets/banana.jpg', 'banana');
new Product('assets/boots.jpg', 'boots');
new Product('assets/bubblegum.jpg', 'bubble');
new Product('assets/breakfast.jpg', 'breakfast');
// new Product('assets/chair.jpg', 'chair');
// new Product('assets/cthulhu.jpg', 'cthulhu');
// new Product('assets/dog-duck.jpg', 'dog-duck');
// new Product('assets/dragon.jpg', 'dragon');
// new Product('assets/pen.jpg', 'pen');
// new Product('assets/pet-sweep.jpg', 'pet');
// new Product('assets/scissors.jpg', 'scissors');
// new Product('assets/shark.jpg', 'shark');
// new Product('assets/sweep.png', 'sweep  ');
// new Product('assets/tauntaun.jpg', 'tauntaum');
// new Product('assets/unicorn.jpg', 'unicorn');
// new Product('assets/usb.gif', 'usb');
// new Product('assets/water-can.jpg', 'water-can');
// new Product('assets/wine-glass.jpg', 'wine-glass');


productDisplay.addEventListener('click', clickHandler);


clickHandler();

