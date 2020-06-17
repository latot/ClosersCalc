import {Pool, Probability, Stat, CStat} from './JSMathPool/JSMathPool.mjs';

//call main function when we finish

Master = {}

{

let Load =  [
        {"name": "Core", "file": "Core.json"},
        {"name": "Module", "file": "Module.json"},
        {"name": "Trinket", "file": "Trinket.json"},
        {"name": "Ampli", "file": "Ampli.json"},
        {"name": "Trigger", "file": "Trigger.json"},
        {"name": "PNA", "file": "PNA.json"}
        {"name": "Character", "file": "Character.json"}
        {"name": "Tunes", "file": "Tunes.json"}
]

let PLoad = []


for (var i = 0; i < Load.length){
    PLoad.push($.getJSON(Load[i]["file"])
}

$.when.apply(null, Pload).then(function (){
    for (var i = 0; i < arguments.length;i++){
        Master[Load[i]] = arguments[i];
    }
    main();
})

}

class Buff {
	constructor(options){
		this.CD = options["CD"]
		this.probability = options["probability"]
		this.stack = options["stack"]
		//this.type = options["type"] //on hit or when be hitten
		this.speed = options["speed"]
		this.Time = options["Time"]
		this.Effect = options["Effect"]
	}
}

class Effect {
	constructor(options){
		this.CD = options["CD"]
		this.probability = options["probability"]
		this.type = options["type"]
		this.Effect = options["Effect"]
	}
}

function WriteMixTxt2(item1, item2) {
	ret = []
	for (var i = 0; i < item1.length; i++) {
		for (var j = 0 < item2.length; j++) {
			ret.push(item1[i] + item2[j]);
		}
	}
	return ret;
}

function WriteMixTxt(list) {
	ret = list[0];
	list.splice(0, 1);
	while (list.length > 0) {
		ret = WriteMixTxt2(ret, list[0]);
		list.splice(0, 1); //remove first element splice(element, 1)
	}
	return ret;
}


CoreTuning = {}
ModTuning = {}

//There is a problem in the buff of the core
Gear = 	{{'Base':	{'Name': 'Gluttony Improved Agile Core',
						'Type': 'Core',
						'Chips': 3,
						'Damage_Base': 3361,
						'Damage': 5979',
						'Effi': 0,96
						'Enha lvl': 17,
						'Tunning': 5,
						'Tunning-Set': CoreTunning},
			'Stats-Enha':	{'Total Physical Power': 0.34,
							'Total Psi Power': 0.34},
			'Stats-1':	{'Attack Speed Base': 0.9,
						'Physical Defense Penetration': 0.15,
						'Physical Crit Damage Bonus': 0.5,
						'Air Strike Damage Increase': 0.1},
			'Buff-1':	{'Duration': 24,
						'Probability': 0.05,
						'CD': 12,
						'Condition': 'on_hit',
						'Effect':	{'Physical Attack': 300,
									'Physical Crit Damage': 0.24}
						},
			'Stats-2':	{'Physical Crit Rate': 0.3,
						'Physical Crit Damage Bonus': 1.15,
						'Damage Bonus during Empower State': 0.16,
						'Air Strike Damage Increase': 0.16,
						'Chase Damage Increase': 0.16}
			},
			
			{'Base':	{'Name': 'Gluttony Improved Booster',
						'Type': 'Module',
						'Chips': 2,
						'Damage_Base': 1497,
						'Damage': 1644,
						'Effi': 0.95,
						'Enha lvl': 17,
						'Tunning': 4,
						'Tunning-Set': ModTunning},
			'Stats-Enha':	{'Total Physical Power': 0.135},
			'Stats-1':	{'Physical Power': 531,
						'Physical Crit Damage Bonus': 0.48},
			'Set-1':	{'Name': 'Epicure\'s Choice [Physical]'}
			},

			{'Base':	{'Name': 'Gluttony Improved Engine',
						'Type': 'Module',
						'Chips': 2,
						'Damage_Base': 1496,
						'Damage': 1644,
						'Effi': 0.94,
						'Enha lvl': 17,
						'Tunning': 4,
						'Tunning-Set': ModTunning},
			'Stats-Enha':	{'Total Physical Power': 0.135},
			'Stats-1':	{'Physical Power': 405,
						'Physical Crit Damage Bonus': 0.58},
			'Set-1':	{'Name': 'Epicure\'s Choice [Physical]'}
			},
			
			{'Base':	{
}

//Error in crit damage translation and buff effect
Sets = {{'Base':	{'Type': 'Set',
								'Name': 'Epicure\'s Choice [Physical]'},
					2:	{'Physical Power': 700,
						'Physical Crit Rate': 0.35,
						'Physical Critical Damage': 1,
						'Air Strike Damaga Increase': 0.2,
						'Back Attack Damaga Increase': 0.2,
						'Chase Damaga Increase': 0.2,
						'Air Strike Crit Damaga Increase': 0.2,
						'Back Attack Crit Damaga Increase': 0.2,
						'Chase Damaga Crit Increase': 0.2,
						'Transcendent Damage Increase': 0.15,
						'Buff-1':	{'Duration': 24,
									'Probability': 0.1,
									'CD': 30,
									'Condition': 'on_hit',
									'Effect':	{1: {'Damage to all types': 0.2}}
									}
					}
		}
}


						
StatsDR = [
"Physical Crit Rate",
"Psi Crit Rate",
"Attack Speed",
"Damage Bonus during Empower State",
"Air Strike Damage Increase",
"Air Strike Crit Rate",
"Back Attack Damage Increase",
"Back Attack Crit Rate",
"Chase Damage Increase",
"Chase Crit Rate",
"Physical Crit Defense Rate",
"Psi Crit Defense Rate",
"Skill Cooldown Reduction"
]

function Same(data){
	return data
}

function Plus(data){
	var i = 0;
	for (var j = 0;j < data.values.length;j++) {
		i = i + data.values[j]
	}
	return new Stat(data.properties, i)
}

function DR(data){
	var i = 1;
	for (var j = 0;j < data.values.length;j++) {
		i = i*(1-data.values[j])
	}
	return new Stat(data.properties, 1 - i)
}

function ProfilePlus(data){
	var ret = []
	for (var i = 0;i < data.values.length;i++){
		ret.push(Plus(data.values[i]))
	}
	return ret
}

//Give a percentage of a specific stat to other, remember, this must be done when the data is already processed
function GivePer(data, input, per, out){
	id = data.properties.indexOf(input)
	return Stat(out, data.values[id].values[0]*per)
}

function ProfileCharacterEND(data){
	ret = [data]
	switch (character){
		case "Yuri":
			ret.push(GivePer(data, "Physical Power", 0.3, "Psi Power"))
			ret.push(GivePer(data, "Psi Power", 0.3, "Physical Power"))
			ret.push(GivePer(data, "Physical Crit Damage Bonus", 0.3, "Psi Crit Damage Bonus"))
			ret.push(GivePer(data, "Psi Crit Damage Bonus", 0.3, "Physical Crit Damage Bonus"))
			break;
		case "J":
			ret.push(GivePer(data, "HP", 0.03, "Physical Power"))
			ret.push(GivePer(data, "HP", 0.03, "Psi Power"))
			ret.push(GivePer(data, "HP", 0.05, "Physical Defense"))
			ret.push(GivePer(data, "HP", 0.05, "Psi Defense"))
			break;
		case "Nata":
			//Working
			break;
	}
}

function ProfileDR(data){
	var ret = []
	for (var i = 0;i < data.values.length;i++){
		if (StatsDR.includes(data.values[i].properties)){
			ret.push(DR(data.values[i]))
		}else{
			ret.push(Plus(data.values[i]))
		}
	}
    //console.log("handle")
    //print(ret)
	return ret
}

function main
