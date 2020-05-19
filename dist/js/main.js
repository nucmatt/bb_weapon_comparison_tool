document.getElementById("add_famed_btn").addEventListener('click', addFamed);
let famedList;
window.onload = loadWeapons();

function loadWeapons() {
	let xhr = new XMLHttpRequest();

	xhr.open("GET", "../data/weapons.json", true);

	xhr.onload = function () {
		if (this.status == 200) {
			const weapons = JSON.parse(this.responseText);
			const famedWeapons = getSavedFamed();
			famedList = Object.keys(localStorage);
			displayWeapons(weapons);
			displayWeapons(famedWeapons);
			addDeleteBtn();
			addEventsDragAndDrop();
			document.querySelectorAll(".show_stats").forEach(toggleStats);
			document.querySelectorAll(".delete").forEach(removeFamed);
			
		}
	};

	xhr.send();
}

// Drag and Drop

function addEventsDragAndDrop(el) {
	let weapons = document.querySelectorAll('.weapon');
	for (const weapon of weapons) {
		weapon.addEventListener('dragstart', dragStart);
		weapon.addEventListener('dragend', dragEnd);
		weapon.addEventListener('dragover', dragOver);
		weapon.addEventListener('dragenter', dragEnter);
		weapon.addEventListener('dragleave', dragLeave);
		weapon.addEventListener('drop', dragDrop);
	}
}

function dragStart(e) {
	console.log('drag start');
	dragSrcEl = this;
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('text/html', this.innerHTML);
};
function dragEnd() {
	console.log('drag end');
	this.classList.remove('hovered');
};
function dragOver(e) {
	console.log('drag Over');
	e.preventDefault();
	e.dataTransfer.dropEffect = 'move';
	return false;
};
function dragEnter() {
	console.log('drag Enter');
	this.classList.add('hovered');
};
function dragLeave(e) {
	console.log('drag Leave');
	this.classList.remove('hovered');
};
function dragDrop(e) {
	console.log('drag Drop');
	if (dragSrcEl != this) {
		dragSrcEl.innerHTML = this.innerHTML;
		this.innerHTML = e.dataTransfer.getData('text/html');
		this.classList.remove('hovered');
	};
	document.querySelectorAll(".show_stats").forEach(toggleStats);
	document.querySelectorAll(".delete").forEach(removeFamed);
	return false;
};

// Build HTML
function displayWeapons(weapons) {
	let weaponTypes = Array.isArray(weapons) ? weapons : Object.entries(weapons);
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
                    <div class="weapon" draggable="true">
                        <div class="row">
                            <p class="col-4 wpn-name"><span class=${famedList.includes(weapon.name) ? `${weapon.name.toLowerCase().replace(/\s/g, "")} style=font-style:italic;font-weight:bold`  : "standard"}>${
															weapon.name
														}</span><span class="buttons"><button type="button" class="toggle"><i class="fa fa-chevron-right show_stats rotateRight"></i></button></span>
                            </p>
                            <p class="col-2">${unarmoredDmg(weapon)}</p>
                            <p class="col-2">${armorDmg(weapon)}</p>
                            <p class="col-2">${ignoreArmorDmg(weapon)}</p>
                            <p class="col-2">${
															armorDmg(weapon) + ignoreArmorDmg(weapon)
														}</p>
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

function getSavedFamed() {
	let famedItems = [],
		keys = Object.keys(localStorage),
		i = keys.length;
	while (i--) {
		let famedItem = JSON.parse(localStorage.getItem(keys[i]));
		famedItems.unshift(famedItem);
	}
	return famedItems;
}

function addDeleteBtnHtml(famedHtml) {
	const html = `<button type="button" class="delete"><i class="fa fa-trash fa-lg"></i></button>`;
	return famedHtml.innerHTML = html + famedHtml.innerHTML;
}

// Button Actions
function toggleStats(btn) {
	btn.onclick = function (e) {
		const weaponStatsDiv =
			e.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling.classList;
		const toggleBtn = e.currentTarget.classList;
		console.log('button clicked');
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

function removeFamed(btn) {
	btn.onclick = function(e) {
		console.log("Delete button clicked!");
		let famed = e.target.parentNode.parentNode.previousSibling.innerHTML;
		localStorage.removeItem(famed);
		location.reload();
	}
}

// Adding new famed weapons
function addFamed() {
		let form = document.getElementById("add_famed_form");
		let type = document.getElementById("weaponType").value;
		let inputs = form.getElementsByTagName("input");
		let values = Object.values(inputs);
		let arr = [];
		for (let i = 0; i < values.length; i++) {
			arr.push(values[i].value);
		}
		let famedStats = new Weapon(...arr);
		let famedItem = [type, [famedStats]];
		console.log(famedItem);
		saveFamed(famedItem);
		displayNewFamed(famedItem);
		document.querySelectorAll(".show_stats").forEach(toggleStats);
		document.querySelectorAll(".delete").forEach(removeFamed);
		location.reload();
	};

function displayNewFamed(famed) {
	const weaponDiv = document.getElementById(famed[0]);
	console.log(famed[1]);
	weaponDiv.innerHTML += outputHtml(famed[1]);
}

function saveFamed(famed) {
	if (typeof Storage !== undefined) {
		let name = famed[1][0].name;
		let weapon = JSON.stringify(famed);
		console.log(weapon);
		(name !== "") ? localStorage.setItem(name, weapon) : alert("Please enter a name for your famed item!");
	} else {
		alert("No local storage option. Please see readme (link in footer) for more details.");
	}
}

function addDeleteBtn() {
	let famedHtml;
	for (let i = 0; i < famedList.length; i++) {
		famedHtml = document.querySelector(`.${famedList[i].toLowerCase().replace(/\s/g, "")}`);
		addDeleteBtnHtml(famedHtml.nextSibling)
	}
}

// Weapon calculations
function Weapon(
	name,
	minDmg,
	maxDmg,
	ignoreArmor,
	armorDmg,
	attacks,
	headDmgMod,
	headHit
) {
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
