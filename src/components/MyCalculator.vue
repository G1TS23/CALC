<template>
  <div class="global">
    
    <div class="menu" :class="{'hidden' : !toggle}">
      <div class="close" @click="toggleMenu()">
        <i class="fa-solid fa-xmark"></i>
      </div>

      <h1>Paramètres</h1>
      <div class="params">
        <h3>Light Mode</h3>
        <div class="toggle-container" @click="toggleDarkMode()" :class="{ 'white' : !darkMode }">
          <div class="toggle-button" :class="{ 'right' : !darkMode }"></div>
        </div>
      </div>
    </div>
    
    <div class="calculator" @click="toggleMenuCalc()" :class="{ 'show' : toggle, 'dark-mode' : darkMode, 'light-mode' : !darkMode }">
      <div class="toggle" @click.stop="toggleMenu()" :class="{'iconCalc' : toggle}">
        <i class="fa-solid fa-list-ul"></i>
      </div>
       
      <div class="screen">
        <div class="history">{{ history[history.length - 4] }}</div>
        <div class="history">{{ history[history.length - 3] }}</div>
        <div class="history">{{ history[history.length - 2] }}</div>
        <div class="history">{{ history[history.length - 1] }}</div>
        <div class="active">{{ output }}</div>
      </div>
      <div class="keyboard">
          <div class="first row">
              <div class="round light cancel" @click="supr()"><span v-show="output === '0'">AC</span><i v-show="output !== '0'"  class="fa-solid fa-delete-left"></i></div>
              
              <div class="round light inverse" @click="inverse()"><i class="fa-solid fa-plus-minus"></i></div>
              <div class="round light percent" @click="percent()"><i class="fa-solid fa-percent"></i></div>
              <div class="round turquoise divided" @click="divide()"><i class="fa-solid fa-divide"></i></div>
          </div>
          <div class="second row">
              <div class="round dark seven" @click="concat('7')">7</div>
              <div class="round dark height" @click="concat('8')">8</div>
              <div class="round dark nine" @click="concat('9')">9</div>
              <div class="round turquoise multiply" @click="multiply()"><i class="fa-solid fa-xmark"></i></div>
          </div>
          <div class="third row">
              <div class="round dark four" @click="concat('4')">4</div>
              <div class="round dark five" @click="concat('5')">5</div>
              <div class="round dark six" @click="concat('6')">6</div>
              <div class="round turquoise minus" @click="minus()"><i class="fa-solid fa-minus"></i></div>
          </div>
          <div class="fourth row">
              <div class="round dark one" @click="concat('1')">1</div>
              <div class="round dark two" @click="concat('2')">2</div>
              <div class="round dark three" @click="concat('3')">3</div>
              <div class="round turquoise plus" @click="plus()"> <i class="fa-solid fa-plus"></i></div>
          </div>
          <div class="fifth row">
              <div class="round dark zero" @click="concat('0')">0</div>
              <div class="round dark coma" @click="concat('.')">.</div>
              <div class="round turquoise equal" @click="equals()"><i class="fa-solid fa-equals"></i></div>
          </div>
      </div>
    </div>
  </div>

<!-- Just for test purpose
    <div class="control">
      <p>Decimal : {{ decimal }}</p>
      <p>Output : {{ output }}</p>
      <p>History : {{ history }}</p>
      <p>Toggle : {{ toggle }}</p>
      <p>Visibility Menu : {{ visibilityMenu }}</p>
      <p>Visibility Calc : {{ visibilityCalc }}</p>
      <p>Temp : {{ temp }}</p>
      <p>Is Plus : {{ isPlus }}</p>
      <p>Is Minus : {{ isMinus }}</p>
      <p>Is Multiply : {{ isMultiply }}</p>
      <p>Is Divide : {{ isDivide }}</p>
      <p>Reset : {{ reset }}</p>
      <p>Is Calculate : {{ isCalculate }}</p>
    </div> -->
  
  </template>
  
  <script>

  export default {
    data(){
      return{
        output: "0",
        history: [],
        toggle: false,
        temp: 0.0,
        isPlus: false,
        isMinus: false,
        isMultiply: false,
        isDivide: false,
        isPercent: false,
        reset: true,
        isCalculate: false,
        darkMode: true,
        decimal: false
      }
    },created(){
      window.addEventListener('keydown', this.keyPress);
    },
    methods:{
      keyPress(event){
          console.log(event);
          switch(event.key){
            case "0" : 
              this.concat("0");
              break;
            case "1" : 
              this.concat("1");
              break;
            case "2" : 
              this.concat("2");
              break;
            case "3" : 
              this.concat("3");
              break;
            case "4" : 
              this.concat("4");
              break;
            case "5" : 
              this.concat("5");
              break;
            case "6" : 
              this.concat("6");
              break;
            case "7" : 
              this.concat("7");
              break;
            case "8" : 
              this.concat("8");
              break;
            case "9" : 
              this.concat("9");
              break;
            case "." :
              this.concat(".");
              break;
            case "Backspace" :
              this.supr();
              break;
            case "*" :
              this.multiply();
              break;
            case "-" :
              this.minus();
              break;
            case "+" :
              this.plus();
              break;
            case "/" :
              this.divide();
              break;
            case "=" :
              this.equals();
              break;
            case "Enter" :
              this.equals();
              break;
            
          }
      },
      concat(input){
        if(!this.toggle && ((input === "." && !this.decimal) || input !== ".")){

          if(this.output === "0" && input !== "."){
            this.output = "";
          }
          if(this.reset && input !== "."){ 
            this.output = "";
          }

          if (input === ".") {this.decimal = true;}
          this.output += input;
          this.reset = false;
          this.equal = true;
      }
      },
      calculate(){

        if(this.isPercent && !this.isPlus && !this.isDivide && !this.isMinus && !this.isMultiply){

          //const trueOutput = this.output.slice(0, this.output - 1);

          const result = this.temp / 100;
          this.countDecimals(result) > 5 ? 
            this.output = result.toFixed(5).toString() : 
            this.output = result.toString();
          
            this.isPercent = false;
            return;
        }

        if(this.isPercent){

          const trueOutput = this.output.slice(0, this.output - 1);
          console.log("🚀 ~ calculate ~ trueOutput:", trueOutput)
          
          this.output = (this.temp / 100) * parseFloat(trueOutput);

        }

        if (this.isPlus && !this.isDivide && !this.isMinus && !this.isMultiply) {
          this.history[this.history.length - 1] = "+" + this.history[this.history.length - 1];

          const result = this.temp + parseFloat(this.output);
          console.log(this.temp + " + " + parseFloat(this.output) + " = " + result);

          this.countDecimals(result) > 5 ? 
            this.output = result.toFixed(5).toString() : 
            this.output = result.toString();
          
          this.isCalculate = true;
        }
        if (this.isMinus && !this.isPlus && !this.isDivide && !this.isMultiply){
          this.history[this.history.length - 1] = "-" + this.history[this.history.length - 1];

          const result = this.temp - parseFloat(this.output);
          console.log(this.temp + " - " + parseFloat(this.output) + " = " + result);

          this.countDecimals(result) > 5 ? 
            this.output = result.toFixed(5).toString() : 
            this.output = result.toString();

            this.isCalculate = true;
        }
        if (this.isMultiply && !this.isDivide && !this.isPlus && !this.isMinus){
          this.history[this.history.length - 1] = "×" + this.history[this.history.length - 1];

          const result = this.temp * parseFloat(this.output);
          console.log(this.temp + " × " + parseFloat(this.output) + " = " + result);


          this.countDecimals(result) > 5 ? 
            this.output = result.toFixed(5).toString() : 
            this.output = result.toString();

          this.isCalculate = true;
        }
        if (this.isDivide && !this.isMultiply && !this.isPlus && !this.isMinus){
          this.history[this.history.length - 1] = "÷" + this.history[this.history.length - 1];

          const result = this.temp / parseFloat(this.output);
          console.log(this.temp + " ÷ " + parseFloat(this.output) + " = " + result);

          this.countDecimals(result) > 5 ? 
            this.output = result.toFixed(5).toString() : 
            this.output = result.toString();

          this.isCalculate = true;
        }
      },
      countDecimals(value){
        if((value % 1) !==0 )
        {
          return value.toString().split(".")[1].toString().length;
        } else return 0;
      },
      supr(){
        if(!this.toggle){
        this.output = this.output.slice(0, this.output.length - 1);
        if(this.output === ""){ 
          this.output = "0";
          this.history = [];
          this.temp = 0.0;
          this.reset = true;
          this.isPlus = false;
          this.isMinus = false;
          this.isMultiply = false;
          this.isDivide = false;
          this.isCalculate = false;
          this.decimal = false;
          this.isPercent = false;
        }
      }

      },
      plus(){
      
        if(this.output !== "0"){
          if((this.isDivide || this.isMultiply || this.isMinus)) {
            this.isPlus = true;
          } else {
            this.temp = parseFloat(this.output);
            this.history.push(this.temp);
          }

          this.calculate();

          this.reset = true;
          this.isPlus = true;
          this.isMinus = false;
          this.isMultiply = false;
          this.isDivide = false;
          this.decimal = false;
        }
        
      },
      minus(){

        if(this.output !== "0"){

            if(this.isDivide || this.isMultiply || this.isPlus) {
              this.isMinus = true;
            } else {
              this.temp = parseFloat(this.output);
              this.history.push(this.temp);
            }

            this.calculate();

            
            this.reset = true;
            this.isPlus = false;
            this.isMinus = true;
            this.isMultiply = false;
            this.isDivide = false;
            this.decimal = false;
          }
      },
      multiply(){

        if(this.output !== "0"){

          if(this.isDivide || this.isPlus || this.isMinus) {
            this.isMultiply = true;
          } else {
            this.temp = parseFloat(this.output);
            this.history.push(this.temp);
          } 

          this.calculate();

          this.reset = true;
          this.isPlus = false;
          this.isMinus = false;
          this.isMultiply = true;
          this.isDivide = false;
          this.decimal = false;
        }

      
      },
      divide(){

        if(this.output !== "0"){

          if(this.isPlus || this.isMultiply || this.isMinus) {
            this.isDivide = true;
            
          } else {
            this.temp = parseFloat(this.output);
            this.history.push(this.temp);
          }    

          this.calculate();

          this.reset = true;
          this.isPlus = false;
          this.isMinus = false;
          this.isMultiply = false;
          this.isDivide = true;
          this.decimal = false;
        }

  
      },percent(){
        this.concat("%");

        this.temp = parseFloat(this.output.slice(0, this.output.length - 1));
        //this.history.push(this.temp);
        
        this.calculate();
        this.isPercent = true;

      },
      equals(){
        if(this.isPercent){
          this.history.push(this.temp + "%");
          this.calculate();
        } else {
        this.history.push(parseFloat(this.output));
        this.calculate();
        this.reset = true;
        this.isPlus = false;
        this.isMinus = false;
        this.isMultiply = false;
        this.isDivide = false;
        this.decimal = false;
        }
      },
      inverse(){
        if(!this.toggle && this.output !== "0"){
          this.reset = false;
          if(this.history.length > 0){this.history.push(parseFloat(this.output));}
          parseFloat(this.output) < 0 ? this.output = this.output.slice(1, this.output.length) : this.output = "-" + this.output;
        }
      },
      toggleMenu(){
        console.log("toggleMenu");
        this.toggle = !this.toggle;
        
        
      },
      toggleMenuCalc(){
        console.log("toggleMenuCalc");

        if(this.toggle){
          this.toggle = false;
        }
      },
      toggleDarkMode(){
        this.darkMode = !this.darkMode;
        this.$emit('toggleDarkMode');
      }
    }
  }
  
  </script>
  
  <style scoped>

  .global{
    display: flex;
    width: 300px;
    height: 600px;
    border-radius: 15px;
    overflow: hidden;
    padding: 0;
    font-family: "Poppins", sans-serif;

  }

  .menu{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;
    width: 210px;
    height: 600px;
    padding: 10px 10px;
    background-color: rgb(47, 79, 79);

    transform: translateX(0px);
    color: white;
    font-size: 1rem;
    transition: all .35s ease-in-out;
   
  }

  .hidden{
    transform: translateX(-200px);
  }

  .close{
    color: turquoise;
    cursor: pointer;
    z-index: 100;
    font-size: 2rem;
    transition: all .35s ease-in-out;
  }

  .toggle{
    position: absolute;
    top: 15px;
    left: 20px;
    color: turquoise;
    cursor: pointer;
    z-index: 100;
    font-size: 2rem;
    transition: all .35s ease-in-out;
    z-index: 200;
  }

  .dark-mode{
    --bgColor: black;
    --txtColor: white;
    --outputColor: white;
  }

  .light-mode{
    --bgColor: white;
    --txtColor: white;
    --outputColor: black;
  }
  
  .calculator{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    width: 300px;
    height: 600px;
    margin: 0;
    background-color: var(--bgColor);
    color: var(--txtColor);
    font-weight: 500;
    font-style: normal;
    font-size: 1.8rem;
    transform: translateX(-200px);
    transition: all .35s ease-in-out;
  }

  .show{
    transform: translateX(0px);
    filter: brightness(30%);
    cursor: default;
  }

  .iconCalc{
    transform: translateX(0);
    opacity: 0;
    cursor: default;
  }
  
  .screen{
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items:end;
    justify-content: flex-end;
    margin: 5px 15px;
  }
  
  .active{
    font-weight: 300;
    font-size: 4rem;
    color: var(--outputColor);
    overflow-x: scroll;
    white-space: nowrap;
  }
  
  .history{
    font-size: 2rem;
    color: grey;
  }
  
  .keyboard{
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  
  }
  
  .row{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    padding: 5px 10px;
    gap: 1rem;
  
  }
  .round{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 60px;
    height: 60px;
    border-radius: 70px;
    cursor: pointer;
  
  }
  
  .fifth{
    grid-template-columns: 2fr 1fr 1fr;
  }
  
  .zero{
    width: 135px;
  }
  
  .light{
    background-color: rgb(128, 128, 128);
    &:active{
        background-color: rgb(158, 158, 158);
    }
  }
  
  .dark{
    background-color: rgb(77, 77, 77);
    &:active{
        background-color: rgb(107, 107, 107);
    }
  }
  
  .turquoise{

    color: black;
    background-color: rgb(64, 224, 208);
    &:active{
        background-color: rgb(94, 254, 238);
        color: white;
    }
  }

  .control{
    color: black;
  }

.toggle-container{
  display: flex;
	align-items: center;
	justify-content: center;
	background-color: black;
	width:35px;
	height: 25px;
	border-radius: 25px;
	cursor: pointer;
	padding-left: 5px;
	padding-right: 5px;
	overflow: hidden;
	transition: all .2s ease-in-out;
}

.toggle-button{
  display: flex;
	align-items: center;
	justify-content: center;
	background-color: white;
	width: 21px;
	height: 21px;
	border-radius: 25px;
	margin-right: 5px;
	transition: all .2s ease-in-out;
	transform: translateX(-7px);
  color: black;
}

.white{
  background-color: white;
}

.right{
	transform: translateX(12px);
  background-color: rgb(47, 79, 79);
  color: white;
}

.params{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
}
  </style>