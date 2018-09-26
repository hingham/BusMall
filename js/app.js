'use strict'
var productDisplay = document.getElementById('products');
var firstProduct = document.getElementById('image-one');
var secondProduct = document.getElementById('image-two');
var thirdProduct = document.getElementById('image-three');
var list = document.getElementById('results');


var totalVotes = 0;
var colorArray = [];
var imgNums = []
var productArray = [firstProduct, secondProduct, thirdProduct];
var label = [];
var clickData = [];
var clickPercents = [];
Product.busProducts = [];

function getImgNums(){
    for (var i = 0; i<Product.busProducts.length; i ++){
        imgNums.push(i);
    }
}

function shuffle(array){
    var i = 0;
    var j = 0;
    var holder = 0;

    for (i=array.length -1; i>=0; i-=1){
        j = Math.floor(Math.random() * (i+1));
        holder = array[i];
        array[i] = array[j];
        array[j] = holder;
    }
    return imgNums;
}

function Product (filepath, productName){
    this.filepath = filepath;
    this.productName = productName;
    this.clickTotal = 0;
    this.displayedTotal = 0;
    Product.busProducts.push(this);
}

function getColors () {
    var colorR=[];
    var colorG=[];
    var colorB = [];
    for (var i = 0; i< Product.busProducts.length; i++){
    colorR.push(Math.floor(i * Math.random() * Math.random()* 200))+10;
    colorG.push(Math.ceil(Math.random()* 80)+50);
    colorB.push(Math.floor(50 * Math.random() )+100);
    }

    for (var i = 0; i< Product.busProducts.length; i++){
    colorArray.push('rgba('+colorR[i]+', '+colorG[i]+', '+colorB[i]+', 0.8)');
    }
    return colorArray;
}


function getProducts() {
    for (var i = 0; i< productArray.length; i++){
        productArray[i].src =  Product.busProducts[imgNums[i]].filepath;
        productArray[i].alt = Product.busProducts[imgNums[i]].productName;
        Product.busProducts[imgNums[i]].displayedTotal+=1;

    }
}


function getResults(){
    document.getElementById("products").setAttribute("class", "hidden");
    getLabels();
    getClickData();
    getClickPercents();
    getChart();
    listResults();
}

function getVotes () {
    productDisplay.addEventListener('click', clickHandler);
}

//This function calls getResults
function clickHandler(event) {
    if (!event){
        shuffle(imgNums);
        getProducts();
    }

    else{
    var imgName = event.target.alt;
    for (var i = 0; i<Product.busProducts.length; i++){
        if(Product.busProducts[i].productName===imgName){
            Product.busProducts[i].clickTotal++;
            break;
        }
    }

    var itemOne = imgNums.shift();
    var itemTwo = imgNums.shift();
    var itemThree = imgNums.shift();
    shuffle(imgNums);
    imgNums.push(itemOne);
    imgNums.push(itemTwo);
    imgNums.push(itemThree);

    getProducts();
    totalVotes += 1;

    //actives function that creates chart once max number of clicks reached
    if (totalVotes === 10){
        productDisplay.removeEventListener('click', clickHandler);
        getResults();//chart

        localStorage.setItem("productKey", JSON.stringify(Product.busProducts));
        }
    }
}

function getLabels(){
    for (var i = 0; i< Product.busProducts.length; i++){
        label.push(Product.busProducts[i].productName);
    }
}

function getClickData(){
    for (var i = 0; i< Product.busProducts.length; i++){
        clickData.push(Product.busProducts[i].clickTotal);
    }
}

function getClickPercents(){
    for (var i = 0; i< Product.busProducts.length; i++){
        var percent = 
        Product.busProducts[i].clickTotal/Product.busProducts[i].displayedTotal;
        clickPercents.push(Math.floor(percent * 100));
    }
}



function getChart (){
    var ctx = document.getElementById("chart").getContext('2d');
    document.getElementById("chart").removeAttribute('class', 'hidden');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
        labels: label,
        datasets : [{
            label: 'Votes Per Product ',
            data:  clickData, 
             backgroundColor: colorArray,
        }]
        },
        options: {
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                }],
                yAxes:
                 [{
                    ticks: {
                        max: 8,
                        min: 0,
                        stepSize: 1
                    }
                }]
            }
        }
    });


    var ctx = document.getElementById("percent-chart").getContext('2d');
    document.getElementById("percent-chart").removeAttribute('class', 'hidden');
    var myPercentChart = new Chart(ctx, {
        type: 'bar',
        data: {
        labels: label,
        datasets : [{
            label: 'Votes Per Products When Displayed (%)',
            data:  clickPercents, 
             backgroundColor: colorArray,
             }]
        },
        options: {
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                }],
                yAxes: 
                    [{
                    ticks: {
                        max: 100,
                        min: 0,
                        stepSize: 25
                    }
                }]
            }
        }
    });
}

function checkLocalStorage(){
    var mallProducts = localStorage.getItem("productKey");
    if(!mallProducts) {
        getProductIntances();
        localStorage.setItem("productKey", JSON.stringify(Product.busProducts));
    }
    else{
        Product.busProducts=JSON.parse(mallProducts);
        console.log(mallProducts);
    }
}



function getProductIntances () {
    new Product('assets/bag.jpg', 'bag');
    new Product('assets/chair.jpg', 'chair');
    new Product('assets/banana.jpg', 'banana');
    new Product('assets/boots.jpg', 'boots');
    new Product('assets/bubblegum.jpg', 'bubble');
    new Product('assets/breakfast.jpg', 'breakfast');
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
}


function listResults() {
    productDisplay.setAttribute('class', 'hidden');

    for(var i = 0; i < Product.busProducts.length; i++){

        var summary = Product.busProducts[i].productName + ': ' +
        Product.busProducts[i].displayedTotal + ' views, ' + Product.busProducts[i].clickTotal + ' votes';

        var newLi = document.createElement('li');
        var liText = document.createTextNode(summary);
        newLi.appendChild(liText)
        list.appendChild(newLi);
    }
}


checkLocalStorage();
getImgNums();
getColors();
clickHandler();
getVotes();
















