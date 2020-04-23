window.onload = loadWeapons();
const test = document.getElementById('compare');

function loadWeapons() {
	let xhr = new XMLHttpRequest();

	xhr.open("GET", "../data/weapons.json", true);

	xhr.onload = function () {
		if (this.status == 200) {
			const weapons = JSON.parse(this.responseText);
			// const weaponTypes = Object.entries(weapons);
			console.log(weapons);
			// console.log(weaponTypes);
			displayWeapons(weapons);
			// const weaponList = weapons.oneHand;
			// console.log(weaponList);
			// oneHand.innerHTML += outputHtml(weaponList);

			document.querySelectorAll(".show_stats").forEach(toggleStats);
			document.querySelectorAll(".add").forEach(addFamed);
		}
	};

	xhr.send();
}

function displayWeapons(weapons) {
	weaponTypes = Object.entries(weapons);
	for (let i = 0; i < weaponTypes.length; i++) {
		let weaponSection = document.getElementById(weaponTypes[i][0]);
		let weaponList = weaponTypes[i][1];
		// console.log(weaponSection);
		// console.log(weaponList);
		weaponSection.innerHTML += outputHtml(weaponList);
	}
}
const outputHtml = (weaponList) => {
	const html = weaponList
		.map(
			(weapon) =>
				`
                    <div class="weapon">
                        <div class="row">
                            <p class="col-1">
                                <input type="checkbox" />
                            </p>
                            <p class="col-3">${weapon.name} 
                                <button type="button" class="toggle"><i class="fa fa-chevron-right show_stats rotateRight"></i></button>
                            </p>
                            <p class="col-2">${unarmoredDmg(weapon)}</p>
                            <p class="col-2">${armorDmg(weapon)}</p>
                            <p class="col-2">${ignoreArmorDmg(weapon)}</p>
                            <p class="col-2">${armorDmg(weapon) + ignoreArmorDmg(weapon)}</p>
                        </div>
                        <div class="wpn-stats slideUp">
                            <div class="row">
                                <h6 class="col-2">Min Dmg</h6>
                                <h6 class="col-2">Max Dmg</h6>
                                <h6 class="col-2">Ignore Armor %</h6>
                                <h6 class="col-2">Armor Dmg %</h6>
                                <h6 class="col-2">Atks/Rd</h6>
                                <h6 class="col-1">Head Mod</h6>
                                <h6 class="col-1">Head Hit</h6>
                            </div>
                            <div class="row">
                                <p class="col-2">${weapon.minDmg} </p>
                                <p class="col-2">${weapon.maxDmg} </p>
                                <p class="col-2">${weapon.ignoreArmor}%</p>
                                <p class="col-2">${weapon.armorDmg}%</p>
                                <p class="col-2">${weapon.attacks}</p>
                                <p class="col-1">${weapon.headDmgMod} </p>
                                <p class="col-1">${weapon.headHit}%</p>
                            </div>
						</div>
					</div>`
		)
		.join("");
	return html;
};

function toggleStats(btn) {
	btn.onclick = function (e) {
		const weaponStatsDiv =
			e.target.parentNode.parentNode.parentNode.nextElementSibling.classList;
		const toggleBtn = e.currentTarget.classList;
		// console.log(toggleBtn);
		toggleRotation(toggleBtn);
		toggleWeaponStats(weaponStatsDiv);
	};
}

function toggleRotation(classArr) {
	if (classArr.contains("rotateRight")) {
		classArr.remove("rotateRight");
		classArr.add("rotateDown");
	} else {
		classArr.remove("rotateDown");
		classArr.add("rotateRight");
	}
}
function toggleWeaponStats(classArr) {
	if (classArr.contains("slideUp")) {
		classArr.remove("slideUp");
		classArr.add("slideDown");
	} else {
		classArr.remove("slideDown");
		classArr.add("slideUp");
	}
}

function addFamed(btn) {
	btn.onclick = function(e){
		let form = document.getElementById("add_famed_form");
		// console.log(form);
		let type = document.getElementById('weaponType').value;
		let inputs = form.getElementsByTagName('input');
		let values = Object.values(inputs);
		let arr = [];
		for (let i = 0; i < values.length; i++) {
			arr.push(values[i].value);
		}
		let famedStats = new Weapon(...arr);
		let famedItem = [type, [famedStats]];
		// console.log(type);
		console.log(famedStats);
		// console.log(famedItem);
		displayNewFamed(famedItem);		
		document.querySelectorAll(".show_stats").forEach(toggleStats);
	}
}

function displayNewFamed(famed) {
	const weaponDiv = document.getElementById(famed[0]);
	// console.log(weaponDiv);
	// console.log(outputHtml([famed[1]]));
	console.log(famed[1]);
	weaponDiv.innerHTML += outputHtml(famed[1]);
}

function Weapon(name, minDmg, maxDmg, ignoreArmor, armorDmg, attacks, headDmgMod, headHit) {
	this.name = name;
	this.minDmg = minDmg;
	this.maxDmg = maxDmg;
	this.ignoreArmor = ignoreArmor;
	this.armorDmg = armorDmg;
	this.attacks = attacks;
	this.headDmgMod = headDmgMod;
	this.headHit = headHit;
}


function unarmoredDmg(weapon) {
	const dmg = avgDmg(weapon.minDmg, weapon.maxDmg);
	const toHead = dmgToHead(dmg, weapon.headHit, weapon.headDmgMod);
	const toBody = dmgToBody(dmg, weapon.headHit);
	// console.log(avgDmg(weapon.minDmg, weapon.maxDmg));
	return Math.round((toHead + toBody) * weapon.attacks);
}

function armorDmg(weapon) {
	const armorMod = weapon.armorDmg / 100;
	const dmg = avgDmg(weapon.minDmg, weapon.maxDmg) * armorMod;
	return Math.round(dmg * weapon.attacks);
}

function ignoreArmorDmg(weapon) {
	const ignoreArmorMod = weapon.ignoreArmor / 100;
	const dmg = avgDmg(weapon.minDmg, weapon.maxDmg) * ignoreArmorMod;
	const toHead = dmgToHead(dmg, weapon.headHit, weapon.headDmgMod);
	const toBody = dmgToBody(dmg, weapon.headHit);
	return Math.round((toBody + toHead) * weapon.attacks);
}

function avgDmg(min, max) {
	return (+min + +max) / 2;
}

function dmgToHead(dmg, headHit, modifier) {
	headPercent = headHit / 100;
	return dmg * headPercent * modifier;
}

function dmgToBody(dmg, headHit) {
	bodyPercent = (100 - headHit) / 100;
	return dmg * bodyPercent;
}
