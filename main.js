let pelaajanNimi = "Tuomas";
let leveys = 3;
let korkeus = 3;
let pelaajaX = 1;
let pelaajaY = 1;
let pisteet = 0;
let vuoroLaskuri = 0;	//Kolikot sekoitetaan 5 siirron välein

//Kolikkojen sijainnit. neg luku tarkoitttaa ettäpoimittu. Y, X. Kolmas luku kolikon arvo
let kolikot = [
	[0, 0, 1],
	[0, 1, 1],
	[0, 2, 2]
];

let nimiTiedot = document.querySelector('#nimiTiedot');
nimiTiedot.addEventListener('click', vaihdaNimi);
nimiTiedot.innerHTML = "Name: " + pelaajanNimi;

let peliAlue = document.querySelector('#peliAlue');

let btnUp = document.querySelector('#btnUp');
btnUp.addEventListener('click', siirryYlos);
let btnDown = document.querySelector('#btnDown');
btnDown.addEventListener('click', siirryAlas);
let btnLeft = document.querySelector('#btnLeft');
btnLeft.addEventListener('click', siirryVasen);
let btnRight = document.querySelector('#btnRight');
btnRight.addEventListener('click', siirryOikea);

let btnChange = document.querySelector('#btnChange');
btnChange.addEventListener('click', muutaKokoa);

window.addEventListener('keydown', kasitteleKeydown);

sekoitaKolikot();
piirraAlue();

function kasitteleKeydown(e) {
	switch(e.key) {
		case "ArrowUp":
			siirryYlos();
			break;
		case "ArrowDown":
			siirryAlas();
			break;
		case "ArrowLeft":
			siirryVasen();
			break;
		case "ArrowRight":
			siirryOikea();
			break;
		default:
			break;
	}
}

//Muuttaa pelialueen koon
function muutaKokoa() {
	//Korkeus ja leveys on väärinpäin
	korkeus = document.getElementById('inLeveys').value;
	leveys = document.getElementById('inKorkeus').value;

	if (korkeus < 2 || leveys < 2) {
		alert("Invalid values!");

		korkeus = 3;
		leveys = 3;
	}
	
	pisteet = 0;
	vuoroLaskuri = 0;

	let pisteLaskuri = document.querySelector('#pisteTiedot');
	pisteLaskuri.innerHTML = "Score: " + pisteet;

	kolikot = [
		[0, 0, 1],
		[0, 1, 1],
		[0, 2, 2]
	];

	sekoitaKolikot();
	piirraAlue();
}

function siirryYlos() {
	if (pelaajaX > 0) {
		pelaajaX--;
		tarkistaKolikot();
		sekoitaKolikot();
		piirraAlue();
	}
}

function siirryAlas() {
	if (pelaajaX < (leveys - 1)) {
		pelaajaX++;
		tarkistaKolikot();
		sekoitaKolikot();
		piirraAlue();
	}
}

function siirryVasen() {
	if (pelaajaY > 0) {
		pelaajaY--;
		tarkistaKolikot();
		sekoitaKolikot();
		piirraAlue();
	}
}

function siirryOikea() {
	if (pelaajaY < (korkeus - 1)) {
		pelaajaY++;
		tarkistaKolikot();
		sekoitaKolikot();
		piirraAlue();
	}
}

//Paluattaa true jos ruutu on tyhjä, muuten false
function onkoTyhja(x, y) {
	//console.log(x + " " + y + " - " + pelaajaX + " " + pelaajaY);

	if (pelaajaX == y && pelaajaY == x) {
		return false;
	}

	for (var i = 0; i < kolikot.length; i++) {
		if(kolikot[i][0] == y && kolikot[i][1] == x) {
			return false;
		}
	}

	return true;
}

//Arpoo uudet paikat kolikoille
function sekoitaKolikot() {
	vuoroLaskuri--;

	if (vuoroLaskuri < 1) {
		for (var i = 0; i < kolikot.length; i++) {
			if(kolikot[i][0] >= 0) {
				let uusiX = Math.floor(Math.random() * korkeus);
				let uusiY = Math.floor(Math.random() * leveys);

				if (onkoTyhja(uusiX, uusiY)) {
					kolikot[i][0] = uusiY;
					kolikot[i][1] = uusiX;
				}
			} 
		}

		vuoroLaskuri = 5;
	}
}

function vaihdaNimi() {
	let uusiNimi = prompt("Please enter your name", pelaajanNimi);

	if (uusiNimi.length > 1) {
		pelaajanNimi = uusiNimi;
	} else {
		alert("Name must be at least 2 characters long!");
	}
	
	nimiTiedot.innerHTML = "Name: " + pelaajanNimi;
}

//Tarkistaa osuuko pelaaja kolikkoon
function tarkistaKolikot() {
	for (var i = 0; i < kolikot.length; i++) {
		if (kolikot[i][0] == pelaajaX && kolikot[i][1] == pelaajaY) {
			kolikot[i][0] = -1;
			pisteet += 50 * kolikot[i][2];
			
			let pisteLaskuri = document.querySelector('#pisteTiedot');
			pisteLaskuri.innerHTML = "Score: " + pisteet;

			piirraAlue();
		}
	}
}

function piirraKolikot() {
	for (var i = 0; i < kolikot.length; i++) {
		if (kolikot[i][0] > -1) {
			let kolikonSijainti = "x" + kolikot[i][0].toString() + "y" + kolikot[i][1].toString();
			console.log(kolikonSijainti);
			let ruutu = document.querySelector("#" + kolikonSijainti);
				
			ruutu.style.backgroundImage = "url(img/coin.png)";
			ruutu.style.backgroundRepeat = "no-repeat";
			ruutu.style.backgroundSize = "contain";
			if (kolikot[i][2] == 2) {
				ruutu.style.backgroundColor = "red";
			}
		}
	}
}

//Piirtää pelilaudan
function piirraAlue() {
	let peliLauta = "";

	for (var x = 0; x < leveys; x++) {
		peliLauta += "<div class=\"row flex-nowrap peliRuutuRivi\">";
		for (var y = 0; y < korkeus; y++) {
			let ruutuID = "x" + x.toString() + "y" + y.toString();

			peliLauta += "<div class=\"col peliRuutu\" id=\""+ ruutuID +"\">";

			peliLauta += "</div>";
		}
		peliLauta += "</div>";
	}

	peliAlue.innerHTML = peliLauta;

	piirraKolikot();

	let pelaajanSijainti = "x" + pelaajaX.toString() + "y" + pelaajaY.toString();
	let pelaajanRuutu = document.querySelector('#' + pelaajanSijainti);
	console.log(pelaajanSijainti);

	pelaajanRuutu.style.backgroundImage = "url(img/player.png)";
	pelaajanRuutu.style.backgroundRepeat = "no-repeat";
	pelaajanRuutu.style.backgroundSize = "contain";
}
