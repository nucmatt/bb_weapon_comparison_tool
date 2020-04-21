window.onload = loadWeapons();

function loadWeapons() {
	let xhr = new XMLHttpRequest();

	xhr.open("GET", "../data/weapons.json", true);

	xhr.onload = function () {
		if (this.status == 200) {
			const weapons = JSON.parse(this.responseText);
			displayWeapons(weapons);
			// console.log(weapons);
			// const weaponTypes = Object.entries(weapons);
			// console.log(weaponTypes);
			// const weaponList = weapons.oneHand;
			// console.log(weaponList);
			// oneHand.innerHTML += outputHtml(weaponList);

			document.querySelectorAll(".show_stats").forEach(toggleStats);
		}
	};

	xhr.send();
}

function displayWeapons(weapons) {
	weaponTypes = Object.entries(weapons);
	for (let i = 0; i < weaponTypes.length; i++) {
		let weaponSection = document.getElementById(weaponTypes[i][0]);
		let weaponList = weaponTypes[i][1];
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
		console.log(toggleBtn);
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

function unarmoredDmg(weapon) {
	const dmg = avgDmg(weapon.minDmg, weapon.maxDmg);
	const toHead = dmgToHead(dmg, weapon.headHit, weapon.headDmgMod);
	const toBody = dmgToBody(dmg, weapon.headHit);
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
	return (min + max) / 2;
}

function dmgToHead(dmg, headHit, modifier) {
	headPercent = headHit / 100;
	return dmg * headPercent * modifier;
}

function dmgToBody(dmg, headHit) {
	bodyPercent = (100 - headHit) / 100;
	return dmg * bodyPercent;
}
