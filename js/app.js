'use strict'
var productDisplay = document.getElementById('products');
var firstProduct = document.getElementById('image-one');
var secondProduct = document.getElementById('image-two');
var thirdProduct = document.getElementById('image-three');
var list = document.getElementById('results');

var totalVotes = 0;
var totalImages = []; 

var imgNums = []
var productArray = [firstProduct, secondProduct, thirdProduct];

function getImgNums(){
    for (var i = 0; i<Product.busProducts.length; i ++){
        imgNums.push(i);
        console.log(imgNums);
    }
}

function shuffle(array){
    var i = 0;
    var j = 0;
    var h = 0;

    for (i=array.length -1; i>0; i-=1){
        j = Math.floor(Math.random() * (i+1));
        h = array[i];
        array[i] = array[j];
        array[j] = h;
    }
    console.log(array);

    return imgNums;
}


Product.busProducts = [];

function Product (filepath, productName){
    this.filepath = filepath;
    this.productName = productName;
    this.clickTotal = 0;
    this.displayedTotal = 0;
    Product.busProducts.push(this);
}


new Product('assets/chair.jpg', 'chair');
new Product('assets/banana.jpg', 'banana');
new Product('assets/boots.jpg', 'boots');
new Product('assets/breakfast.jpg', 'breakfast');
new Product('assets/tauntaun.jpg', 'tauntaum');
new Product('assets/unicorn.jpg', 'unicorn');
new Product('assets/usb.gif', 'usb');
new Product('assets/water-can.jpg', 'water-can');
new Product('assets/wine-glass.jpg', 'wine-glass');

getImgNums();
//shuffle(imgNums);


function getProducts() {
    for (var i = 0; i< productArray.length; i++){
        productArray[i].src =  Product.busProducts[imgNums[i]].filepath;
        productArray[i].alt = Product.busProducts[imgNums[i]].productName;
    
        console.log('filepath: ' + Product.busProducts[imgNums[i]].filepath+
        'product name: ' + Product.busProducts[imgNums[i]].productName);

        Product.busProducts[imgNums[i]].displayedTotal+=1;

        console.log('count: ' + Product.busProducts[imgNums[i]].displayedTotal);
    }
    console.log('_____________');
}

    function clickHandler(event) {

        if (!event){
            shuffle(imgNums);
            console.log('beginning');
            getProducts();
        }

        else{
        var imgName = event.target.alt;
        console.log('alt: ' + imgName);
        // for (var i = 0; i<Product.busProducts.length; i++){
        //     if(Product.busProducts[i].productName===imgName){
        //         Product.busProducts[i].clickTotal++;
        //         console.log(Product.busProducts[i].clickTotal++);
        //         break;
        //     }
        // }


        var itemOne = imgNums.shift();
        var itemTwo = imgNums.shift();
        var itemThree = imgNums.shift();
        console.log('new ' + imgNums);
        shuffle(imgNums);
        console.log('shuffled ' + imgNums);
        imgNums.push(itemOne);
        imgNums.push(itemTwo);
        imgNums.push(itemThree);

        getProducts();

        totalVotes += 1;
        console.log('total clicks' + totalVotes);
    
        // if (totalVotes === 5){
        //     productDisplay.removeEventListener('click', clickHandler);
        //     getResults();
        // }
    }
    }

clickHandler();
productDisplay.addEventListener('click', clickHandler);



// function getVotes () {
//     productDisplay.addEventListener('click', clickHandler);
// }

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



// //instantiate produts
// new Product('assets/bag.jpg', 'bag');
// new Product('assets/chair.jpg', 'chair');
// new Product('assets/banana.jpg', 'banana');
// new Product('assets/boots.jpg', 'boots');
// new Product('assets/bubblegum.jpg', 'bubble');
// new Product('assets/breakfast.jpg', 'breakfast');
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



