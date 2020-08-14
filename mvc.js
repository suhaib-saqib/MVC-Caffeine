class Model{
	constructor(){
		this.drinks = [
		{name: 'monster', caffeine: 150},
		{name: 'coffee', caffeine: 95},
		{name: 'americano', caffeine: 77},
		{name: 'nos', caffeine: 260},
		{name: 'energy', caffeine: 200},
		];
	}
	
	calculateRemaining(nm, amt){
		var drink = this.drinks.find(o => o.name === nm);
		var caffeineConsumed = drink.caffeine * amt;s
		if (caffeineConsumed >= 500){
			return 0;
		}
		var caffeineRemaining = 500 - caffeineConsumed;
		var drinksLeft = Math.floor(caffeineRemaining / drink.caffeine);
		alert("You can drink " + drinksLeft + " more drinks");
		return drinksLeft;
	}
}

class View{
	constructor() {
		this.app = this.getElement('#root');
		
		this.form = document.createElement('form');
		
		var inp = document.createElement('SELECT');
		inp.setAttribute('id', 'drinkSelect');

		document.body.appendChild(inp);

		
		var op1 = document.createElement('option');
		op1.setAttribute('value', 'monster');
		var op1text = document.createTextNode('Monster Ultra Sunrise');
		op1.appendChild(op1text);
		document.getElementById('drinkSelect').appendChild(op1);
		
		var op2 = document.createElement('option');
		op2.setAttribute('value', 'coffee');
		var op2text = document.createTextNode('Black Coffee');
		op2.appendChild(op2text);
		document.getElementById('drinkSelect').appendChild(op2);
		
		var op3 = document.createElement('option');
		op3.setAttribute('value', 'americano');
		var op3text = document.createTextNode('Americano');
		op3.appendChild(op3text);
		document.getElementById('drinkSelect').appendChild(op3);
		
		var op4 = document.createElement('option');
		op4.setAttribute('value', 'nos');
		var op4text = document.createTextNode('Sugar Free NOS');
		op4.appendChild(op4text);
		document.getElementById('drinkSelect').appendChild(op4);
		
		var op5 = document.createElement('option');
		op5.setAttribute('value', 'energy');
		var op5text = document.createTextNode('5 Hour Energy');
		op5.appendChild(op5text);
		document.getElementById('drinkSelect').appendChild(op5);
		
		this.input = document.createElement('input');
		this.input.type = 'text';
		this.input.placeholder = 'How many have you had?';
		this.input.name = 'amount';
		
		this.submitButton = document.createElement('button');
		this.submitButton.textContent = 'Submit';
		
		this.form.append(inp, this.input, this.submitButton);

		this.app.append(this.form);
	}
	
	_resetInput() {
		this.input.value = '';
	}
	
	CreateElement(tag, className){
		const element = document.createElement(tag);
		if(className) element.classList.add(className)
			
		return element;
	}
	
	getElement(selector){
		const element = document.querySelector(selector);
		
		return element;
	}
	
	get _drinkChoice() {
		return inp.value;
	}
	
	get _amount() {
		return this.input.value;
	}
	
	bindSubmit(handler){
		this.form.addEventListener('submit', event => {
			event.preventDefault();
			
			var drnk = document.getElementById('drinkSelect').value;
			var amnt = this.input.value;
			
			if(!isNaN(amnt)){
				if (amnt >= 0){
					handler(drnk, amnt);
					this._resetInput();
				} else if (amnt < 0) {
					alert ('You can not drink a negative amount of drinks!');
				} else{
					alert('Please select a drink and input the amount you drank.');
				}
			} else {
				alert("Please input an integer value of 0 or more!");
			}
		})
	}
}

class Controller {
	constructor(model, view){
		this.model = model;
		this.view = view;
		
		this.view.bindSubmit(this.handleSubmit);
	}
	
	handleSubmit = (drinkName, amount) => {
		this.model.calculateRemaining(drinkName,amount);
	}
}

const app = new Controller(new Model(), new View());