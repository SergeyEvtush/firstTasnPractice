"use strict";

const selectCar = document.querySelector('#cars');
const information = document.querySelector('.information');

 const getData = (url) => {
	return fetch(url)
		.then(data => data.json())
		.catch(errorData => console.log(errorData))
};
const createOption = ({model, brand}) => {
	return `<option value="${model}">${brand}</option>`
};
const makeOPtions = (carsArray, parent) => {
	carsArray.forEach(elem => {
		parent.insertAdjacentHTML('beforeend', createOption(elem));
	});
};
const makeInformationDiv = (modell,carsArray,inpValue) => {
	const car = carsArray.find(el =>  modell === el.model);
	if (inpValue) {
		return `
	<h2>Тачка ${car.brand} ${car.model}</h2>
	<h2>Цена: ${car.price}$</h2>`
	} else { 
		return `<h2>Выбери тачку</h2>`
	}
	
 }


getData('cars.json')
	.then(data => {
		makeOPtions(data.cars, selectCar);
	});
	
	selectCar.addEventListener('change', (e) => { 
		e.preventDefault();
		information.innerHTML = '';
		getData('cars.json').then(data => {
			information.insertAdjacentHTML('afterbegin', makeInformationDiv(selectCar.value, data.cars, selectCar.value));
		});
		 
	});