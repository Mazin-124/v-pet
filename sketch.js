//Create variables here
var dog,happyDog;
var database;
var foodS,foodStock;
var fedTime,lastFed;
var foodObj;
var feed;
var addFood;
function preload()
{
	//load images here
  sadDog = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(600, 500);
  database = firebase.database();

  dog = createSprite(250,300,50,50)
  dog.addImage("dog1",sadDog)
  dog.addImage("dog2",happyDog);
  dog.scale=0.2

  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  feed=createButton("Feed the Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
}


function draw() {  
  background("green")
  
  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
   
    dog.changeImage("dog2",happyDog);
  }
  
  textSize(20)
  fill("white")
  stroke(2)
  text("Note:Press UP_ARROW Key To Feed Drago Milk!",40,30)
  text("Food:"+foodS,40,100)
  drawSprites();

  fill(255,255,254)
  textSize(15)
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM",150,50)
  }
  else if(lastFed === 0){
    text("Last Feed : 12 AM",150,30)
  }
  else{
    text("Last Feed : "+lastFed+ "AM" ,  150,50)
  }
  
}

//Function to read value from DB
function readStock(data){
  foodS = data.val();
}
//Functions to write values from DB
function writeStock(x){
  if(x<=0){
    x = 0
  }
  else{
    x= x-1
  }
  database.ref('/').update({food:x})
}

function feedDog(){
  dog.addImage(happyDog)
  console.log(hour())
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}