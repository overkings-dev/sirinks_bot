module.exports = function(robot) {
	this.VERGELAND 	= 'VERGELAND'
	this.KRONSLIHT 	= 'KRONSLIHT'
	this.ONSLAND   	= 'ONSLAND'
	this.TOYRE 		= 'TOYRE'
	this.ERIGE 		= 'ERIGE'
	this.TRORHEIM 	= 'TRORHEIM'
	this.UTSALA 	= 'UTSALA'

	this.robot = robot
	this.HOTKEY_TELEPORT
	this.HOTKEY_TELEPORT_SHIFT
	this.HOTKEY_SPELL_1
	this.HOTKEY_SPELL_1_SHIFT

	this.CHANNELING_DELAY = 0.7

	this.hotkeys_to_check = ['teleport', 'sigil', 'spell_1', 'spell_2', 'spell_3', 'spell_4', 'spell_5', 'spell_6', 'spell_7', 'spell_8', 'spell_9']

	const fs = require('fs')
	const readline = require('readline');

	this.loadHotkeys = async function() {
		try {
		  const fileStream = fs.createReadStream('hotkeys.cfg');

		  const rl = readline.createInterface({
		    input: fileStream,
		    crlfDelay: Infinity
		  });

		  for await (const line of rl) {
		    for (let hotkey of this.hotkeys_to_check) {
			    if (line.includes(`${hotkey}=`)) {
			    	let parts = line.split('=')
			    	hotkey = hotkey.toUpperCase()

			    	this[`HOTKEY_${hotkey}`] = parts[1][0]

			    	if (parts[1].includes('+')) {
			    		this[`HOTKEY_${hotkey}_SHIFT`] = true
			    	} else {
			    		this[`HOTKEY_${hotkey}_SHIFT`] = false
			    	}
			    }
			}
		  }
		} catch(e) {
			console.log(e.message)
			return false
		}

		console.log(`Teleport: ${this.HOTKEY_TELEPORT}, shift: ${this.HOTKEY_TELEPORT_SHIFT}`)

		return true
	}

	this.loadBosses = async function() {

		try {
		let rawdata = fs.readFileSync('./bosses.json')
		let bosses = JSON.parse(rawdata)['bosses']

	  	for (let boss of bosses) {
		    console.log(`Loading boss: ${boss.name}`)
		    let boss_name = boss['name'].toLowerCase()

	    	this[`${boss_name}`] = boss
		  }
		} catch(e) {
			console.log(e.message)
			return false
		}

		return true
	}

	this.portal_x = 1441
	this.portal_y = 371

	this.portal_x_low = 1430
	this.portal_y_low = 425


	this.olfradi = {
		name: 'OLFRADI',
		mini_x: 0,
		mini_y: 0,
		map_x: 0,
		map_y: 0,
		confirm_x: 1368,
		confirm_y: 437,
		delay: 0,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low
	}

	this.kniaz = {
		name: 'KNIAZ',
		mini_x: 0,
		mini_y: 0,
		map_x: 1223,
		map_y: 125,
		confirm_x: 1221,
		confirm_y: 181,
		delay: 2,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		stun_first_floor: 1,
		stun_second_floor: 1,
	}

	this.gorm = {
		name: 'GORM',
		mini_x: 1424,
		mini_y: 159,
		map_x: 1053,
		map_y: 310,
		confirm_x: 1080,
		confirm_y: 263,
		delay: 8,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		stun_first_floor: false,
		stun_second_floor: false,
	}

	this.vergranda = {
		name: 'VERGRANDA',
		mini_x: 1420,
		mini_y: 175,
		map_x: 1000,
		map_y: 310,
		confirm_x: 1100,
		confirm_y: 300,
		delay: 9,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		stun_first_floor: 1,
		stun_sedond_floor: 2,
		second_floor_delay: 22,
		first_floor_delay: 10,
		extra_steps_first_floor: 14,
		extra_steps_second_floor: 6,
	}

	this.nils = {
		name: 'NILS',
		mini_x: 1366,
		mini_y: 200,
		map_x: 1000,
		map_y: 385,
		confirm_x: 787,
		confirm_y: 410,
		delay: 8,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		stun_first_floor: 2,
		stun_sedond_floor: 2,
		first_floor_delay: 13,
		second_floor_delay: 30,
		extra_steps_first_floor: 20,
		extra_steps_second_floor: 13,
	}

	this.erdhorn = {
		name: 'ERDHORN',
		mini_x: 1405,
		mini_y: 140,
		map_x: 945,
		map_y: 310,
		confirm_x: 915,
		confirm_y: 390,
		delay: 12,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		stun_first_floor: 1,
		stun_sedond_floor: 2,
		second_floor_delay: 7,
		extra_steps_first_floor: 11,
		extra_steps_second_floor: 8,
		after_fight_move: 3
	}

	this.alva = {
		name: 'ALVA',
		mini_x: 1300,
		mini_y: 110,
		map_x: 530,
		map_y: 435,
		confirm_x: 530,
		confirm_y: 290,
		delay: 6,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		stun_first_floor: 2,
		stun_sedond_floor: 2,
		second_floor_delay: 25,
		first_floor_delay: 15,
		extra_steps_first_floor: 13,
		extra_steps_second_floor: 10,
	}

	this.urdi = {
		name: 'URDI',
		mini_x: 0,
		mini_y: 0,
		map_x: 1023,
		map_y: 388,
		confirm_x: 1025,
		confirm_y: 400,
		delay: 3,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		stun_first_floor: false,
		stun_second_floor: 1,
		first_floor_delay: 5,
	}

	this.ilding = {
		name: 'ILDING',
		mini_x: 0,
		mini_y: 0,
		map_x: 836,
		map_y: 405,
		confirm_x: 921,
		confirm_y: 187,
		delay: 6,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		stun_first_floor: 1,
		stun_second_floor: false,
	}

	this.skriga = {
		name: 'SKRIGA',
		mini_x: 0,
		mini_y: 0,
		map_x: 510,
		map_y: 310,
		confirm_x: 535,
		confirm_y: 258,
		delay: 3,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		stun_first_floor: false,
		stun_second_floor: 1,
		second_floor_delay: 5,
	}

	this.vorfturm = {
		name: 'VORFTURM',
		mini_x: 1304,
		mini_y: 121,
		map_x: 535,
		map_y: 429,
		confirm_x: 505,
		confirm_y: 415,
		delay: 7,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		stun_first_floor: false,
		stun_second_floor: false,
	}

	this.brost = {
		name: 'BROST',
		mini_x: 1317,
		mini_y: 108,
		map_x: 915,
		map_y: 380,
		confirm_x: 910,
		confirm_y: 400,
		delay: 7,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		stun_first_floor: false,
		stun_second_floor: false,
	}

	this.yarl = {
		name: 'YARL',
		mini_x: 0,
		mini_y: 0,
		map_x: 0,
		map_y: 0,
		confirm_x: 730,
		confirm_y: 370,
		delay: 0,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		stun_first_floor: false,
		stun_second_floor: 1,
		first_floor_delay: 5,
	}

	this.heo = {
		name: 'HEO',
		mini_x: 0,
		mini_y: 0,
		map_x: 1095,
		map_y: 145,
		confirm_x: 1065,
		confirm_y: 265,
		delay: 3,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		stun_first_floor: 2,
		stun_second_floor: 2,
		first_floor_delay: 5,
		second_floor_delay: 10,
		after_fight_move: 3
	}

	this.ogg = {
		name: 'OGG',
		mini_x: 0,
		mini_y: 0,
		map_x: 1355,
		map_y: 255,
		confirm_x: 1150,
		confirm_y: 300,
		delay: 6,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		stun_first_floor: 2,
		stun_second_floor: 2,
		first_floor_delay: 11,
		second_floor_delay: 15,
	}

	this.meraban = {
		name: 'MERABAN',
		mini_x: 0,
		mini_y: 0,
		map_x: 1110,
		map_y: 35,
		confirm_x: 1100,
		confirm_y: 110,
		delay: 4,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		stun_first_floor: 0,
		stun_second_floor: 1,
	}

	this.smerla = {
		name: 'SMERLA',
		mini_x: 1435,	
		mini_y: 210,
		map_x: 1365,
		map_y: 330,
		confirm_x: 1365,
		confirm_y: 330,
		delay: 7,
		portal_x: this.portal_x,
		portal_y: this.portal_y,
		stun_first_floor: 0,
		stun_second_floor: 1,
	}

	this.baal = {
		name: 'BAAL',
		mini_x: 0,	
		mini_y: 0,
		map_x: 0,
		map_y: 0,
		confirm_x: 815,
		confirm_y: 235,
		delay: 0.5,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		first_floor_delay: 5,
		stun_first_floor: 0,
		stun_second_floor: 1,
	}

	this.gorgelad = {
		name: 'GORGELAD',
		mini_x: 1405,	
		mini_y: 85,
		map_x: 1000,
		map_y: 160,
		confirm_x: 1000,
		confirm_y: 130,
		delay: 7,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		stun_first_floor: 2,
		stun_second_floor: 2,
	}

	this.mardonius = {
		name: 'MARDONIUS',
		mini_x: 1405,	
		mini_y: 85,
		map_x: 1200,
		map_y: 125,
		confirm_x: 1085,
		confirm_y: 120,
		delay: 9,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		stun_first_floor: 0,
		stun_second_floor: 1,
		first_floor_delay: 5,
	}

	this.marzuba = {
		name: 'MARZUBA',
		mini_x: 1425,	
		mini_y: 130,
		map_x: 1150,
		map_y: 310,
		confirm_x: 1150,
		confirm_y: 330,
		delay: 12,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		stun_first_floor: 0,
		stun_second_floor: 1,
		portal_delay: 1
	}

	this.cumamba = {
		name: 'CUMAMBA',
		mini_x: 0,	
		mini_y: 0,
		map_x: 720,
		map_y: 120,
		confirm_x: 700,
		confirm_y: 100,
		delay: 2,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		stun_first_floor: 2,
		stun_second_floor: 2,
		first_floor_delay: 10,
	}

	this.ogdenhag = {
		name: 'OGDENHAG',
		mini_x: 0,	
		mini_y: 0,
		map_x: 570,
		map_y: 410,
		confirm_x: 580,
		confirm_y: 420,
		delay: 4,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		stun_first_floor: 0,
		stun_second_floor: 1,
		first_floor_delay: 5,
	}

	this.garmfuldi = {
		name: 'GARMFULDI',
		mini_x: 0,	
		mini_y: 0,
		map_x: 1270,
		map_y: 430,
		confirm_x: 1100,
		confirm_y: 350,
		delay: 8,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		stun_first_floor: 0,
		stun_second_floor: 1,
		first_floor_delay: 5,
	}

	this.jurda = {
		name: 'JURDA',
		mini_x: 1330,	
		mini_y: 110,
		map_x: 1140,
		map_y: 315,
		confirm_x: 1120,
		confirm_y: 325,
		delay: 7,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		stun_first_floor: 0,
		stun_second_floor: 1,
		first_floor_delay: 5,
	}

	this.loghorn = {
		name: 'LOGHORN',
		mini_x: 1305,	
		mini_y: 130,
		map_x: 850,
		map_y: 345,
		confirm_x: 820,
		confirm_y: 430,
		delay: 8,
		portal_x: this.portal_x_low,
		portal_y: this.portal_y_low,
		stun_first_floor: 0,
		stun_second_floor: 1,
		first_floor_delay: 5,
	}
	 

	this.location_normal = {
		x: 927,
		y: 470
	}

	this.location_middle_position = {
		x: 1175,
		y: 380,
		start_x: 660,
		start_y: 410,
		teleport_x: 1391,
		teleport_y: 392
	}

	this.sleep = function(s) {
		let ms = s * 1000
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	}

	this.farmBoss = async function(boss, teleport_region = 5)
	{
		console.log('Going to location:', boss.name)
		console.log('Boss:', boss)

		if (boss.mini_x) {
			console.log(`Mini Map`)
			this.robot.moveMouse(boss.mini_x, boss.mini_y)
			this.robot.mouseClick()

			await this.sleep(2)
		} else {
			console.log('Skip Mini Map')
		}

		if (boss.map_x) {
			console.log(`Map`)
			await this.confirmClick(boss.map_x, boss.map_y)

			await this.sleep(boss.delay)
		} else {
			console.log('Skip Map')
		}

		console.log(`Location_confirm`)
		await this.confirmClick(boss.confirm_x, boss.confirm_y)

		await this.sleep(1.5)

		console.log(`Difficulty_confirm`)

		if (boss.name !== 'BAAL') {
			await this.confirmClick(this.location_normal.x, this.location_normal.y)
		} else {
			await this.confirmClick(this.location_normal.x, this.location_normal.y + 30)
		}

		await this.sleep(2)

		let steps_first_floor = boss.extra_steps_first_floor ? 14 + boss.extra_steps_first_floor : 14
		await this.move(steps_first_floor)

		await this.sleep(1) // wait mobs to come

		if (boss.stun_first_floor) {
			await this.fightFirstFloor(10, boss.stun_first_floor)
		} else {
			await this.fightFirstFloor()
		}

		if (boss.first_floor_delay) {
			await this.sleep(boss.first_floor_delay)
		}

		if (boss.after_fight_move) {
			await this.move(boss.after_fight_move)
		}

		// move to 2nd floor
		if (boss.portal_x && boss.portal_y) {
			await this.confirmClick(boss.portal_x, boss.portal_y)
		} else {
			await this.confirmClick(this.location_middle_position.teleport_x, this.location_middle_position.teleport_y)
		}
		// if char moved away too far
		await this.sleep(2)

		// for marzuba too far from portal
		if (boss.portal_delay) {
			await this.sleep(boss.portal_delay)
		}

		let steps_second_floor = boss.extra_steps_second_floor ? 11 + boss.extra_steps_second_floor : 11
		await this.move(steps_second_floor, false)
		await this.sleep(2)

		if (boss.stun_second_floor) {
			await this.fightSecondFloor(15, boss.stun_second_floor)
		} else {
			await this.fightSecondFloor()	
		}

		if (boss.second_floor_delay) {
			await this.sleep(boss.second_floor_delay)
		}

		await this.sleep(5)

		await this.teleport(teleport_region, 1)
		await this.sleep(5)

		// switch to hand 2
		this.robot.keyToggle('tab', 'down')
		this.robot.keyToggle('tab', 'up')

		// switch to hand 1
		this.robot.keyToggle('tab', 'down')
		this.robot.keyToggle('tab', 'up')
		await this.sleep(1)
	}

	this.teleport = async function(region_number, default_sleep = 0)
	{
		console.log(`Teleporting to ${region_number}, waiting ${default_sleep}`)

		await this.toggleShift(this.HOTKEY_TELEPORT, this.HOTKEY_TELEPORT_SHIFT)
		await this.sleep(1.5)

		let y = 405 + 30 * region_number

		await this.confirmClick(825, y)
		await this.sleep(1)

		// click TP
		await this.confirmClick(870, 660)
		await this.sleep(1)
	}

	this.confirmClick = async function(x, y, double = false)
	{
		this.robot.moveMouse(x, y)
		await this.sleep(0.5)
		this.robot.mouseToggle("down")
		await this.sleep(0.5)
		this.robot.moveMouse(x - 5, y + 5)
		this.robot.mouseToggle("up")
		this.robot.mouseClick()	

		if (double) {
			this.robot.moveMouse(x, y)
			await this.sleep(0.5)
			this.robot.mouseToggle("down")
			await this.sleep(0.5)
			this.robot.moveMouse(x - 5, y + 5)
			this.robot.mouseToggle("up")
			this.robot.mouseClick()	
		}
	}

	this.altClick = function(x, y)
	{
		this.robot.keyToggle('alt', 'down')
		this.robot.moveMouse(x, y)
		this.robot.mouseClick()
		this.robot.keyToggle('alt', 'up')
	}

	this.click = function(x, y)
	{
		this.robot.moveMouse(x, y)
		this.robot.mouseClick()	
	}

	this.move = async function(steps = 14, isFirst = true)
	{
		console.log(`Move to start`)
		if (isFirst) {
			await this.sleep(3)
		}

		await this.confirmClick(this.location_middle_position.start_x, this.location_middle_position.start_y)
		await this.sleep(0.5)

		await this.toggleShift(this.HOTKEY_SPELL_1, this.HOTKEY_SPELL_1_SHIFT)
		await this.sleep(0.7)

		for (let i = 0; i < steps; i++) {
			console.log(`${i + 1} Move`)

			this.altClick(this.location_middle_position.x, this.location_middle_position.y)
			if (i === 0 && isFirst) {
				await this.sleep(1.6)
			} else {
				await this.sleep(1)
			}
		}
	}

	this.fightFirstFloor = async function(sleep_after_fight = 7, spells = 0)
	{
		await this.toggleShift(this.HOTKEY_SPELL_1, this.HOTKEY_SPELL_1_SHIFT)
		await this.sleep(1)

		await this.toggleShift(this.HOTKEY_SIGIL, this.HOTKEY_SIGIL_SHIFT)

		await this.toggleShift(this.HOTKEY_SPELL_2, this.HOTKEY_SPELL_2_SHIFT)
		await this.sleep(2)

		await this.toggleShift(this.HOTKEY_SPELL_3, this.HOTKEY_SPELL_3_SHIFT)
		await this.sleep(this.CHANNELING_DELAY)

		if (spells) {
			await this.toggleShift(this.HOTKEY_SPELL_4, this.HOTKEY_SPELL_4_SHIFT)
			await this.sleep(this.CHANNELING_DELAY)

			await this.toggleShift(this.HOTKEY_SPELL_5, this.HOTKEY_SPELL_5_SHIFT)
			await this.sleep(this.CHANNELING_DELAY)	

			this.robot.keyToggle('space', 'down')
			this.robot.keyToggle('space', 'up')
			await this.toggleShift(this.HOTKEY_SPELL_6, this.HOTKEY_SPELL_6_SHIFT)
			await this.sleep(this.CHANNELING_DELAY)	

			await this.toggleShift(this.HOTKEY_SPELL_7, this.HOTKEY_SPELL_7_SHIFT)
			await this.sleep(this.CHANNELING_DELAY)	
		}

		if (spells > 1) {
			await this.toggleShift(this.HOTKEY_SPELL_3, this.HOTKEY_SPELL_3_SHIFT)
			await this.sleep(this.CHANNELING_DELAY)

			this.robot.keyToggle('space', 'down')
			this.robot.keyToggle('space', 'up')
			await this.toggleShift(this.HOTKEY_SPELL_8, this.HOTKEY_SPELL_8_SHIFT)
			await this.sleep(this.CHANNELING_DELAY)

			await this.toggleShift(this.HOTKEY_SPELL_9, this.HOTKEY_SPELL_9_SHIFT)
			await this.sleep(this.CHANNELING_DELAY)	

			await this.toggleShift(this.HOTKEY_SPELL_7, this.HOTKEY_SPELL_7_SHIFT)
			await this.sleep(this.CHANNELING_DELAY)

			this.robot.keyToggle('space', 'down')
			this.robot.keyToggle('space', 'up')
			await this.toggleShift(this.HOTKEY_SPELL_6, this.HOTKEY_SPELL_6_SHIFT)
			await this.sleep(this.CHANNELING_DELAY)	
		}

		this.robot.keyToggle('space', 'down')
		this.robot.keyToggle('space', 'up')
		await this.toggleShift(this.HOTKEY_SPELL_6, this.HOTKEY_SPELL_6_SHIFT)

		await this.sleep(sleep_after_fight)
	}

	this.fightSecondFloor = async function(sleep_after_fight = 0, spells = 0)
	{
		await this.toggleShift(this.HOTKEY_SPELL_1, this.HOTKEY_SPELL_1_SHIFT)
		await this.sleep(1)

		// sigil
		await this.toggleShift(this.HOTKEY_SIGIL, this.HOTKEY_SIGIL_SHIFT)

		this.robot.keyToggle('space', 'down')
		this.robot.keyToggle('space', 'up')
		await this.toggleShift(this.HOTKEY_SPELL_2, this.HOTKEY_SPELL_2_SHIFT)
		await this.sleep(2.2)

		await this.toggleShift(this.HOTKEY_SPELL_3, this.HOTKEY_SPELL_3_SHIFT)
		await this.sleep(1)

		if (spells) {
			await this.toggleShift(this.HOTKEY_SPELL_4, this.HOTKEY_SPELL_4_SHIFT)
			await this.sleep(this.CHANNELING_DELAY)

			await this.toggleShift(this.HOTKEY_SPELL_5, this.HOTKEY_SPELL_5_SHIFT)
			await this.sleep(this.CHANNELING_DELAY)	

			await this.toggleShift(this.HOTKEY_SPELL_4, this.HOTKEY_SPELL_4_SHIFT)
			await this.sleep(this.CHANNELING_DELAY)

			await this.toggleShift(this.HOTKEY_SPELL_5, this.HOTKEY_SPELL_5_SHIFT)
			await this.sleep(this.CHANNELING_DELAY)	

			this.robot.keyToggle('space', 'down')
			this.robot.keyToggle('space', 'up')
			await this.toggleShift(this.HOTKEY_SPELL_6, this.HOTKEY_SPELL_6_SHIFT)
			await this.sleep(1)	

			this.robot.keyToggle('3', 'down')
			this.robot.keyToggle('3', 'up')
			await this.sleep(this.CHANNELING_DELAY)	
		}

		if (spells > 1) {
			await this.toggleShift(this.HOTKEY_SPELL_1, this.HOTKEY_SPELL_1_SHIFT)
			await this.sleep(1)

			await this.toggleShift(this.HOTKEY_SPELL_8, this.HOTKEY_SPELL_8_SHIFT)
			await this.sleep(this.CHANNELING_DELAY)

			await this.toggleShift(this.HOTKEY_SPELL_9, this.HOTKEY_SPELL_9_SHIFT)
			await this.sleep(this.CHANNELING_DELAY)	

			await this.toggleShift(this.HOTKEY_SPELL_7, this.HOTKEY_SPELL_7_SHIFT)
			await this.sleep(this.CHANNELING_DELAY)

			await this.toggleShift(this.HOTKEY_SPELL_3, this.HOTKEY_SPELL_3_SHIFT)
			await this.sleep(this.CHANNELING_DELAY)	

			this.robot.keyToggle('space', 'down')
			this.robot.keyToggle('space', 'up')
			await this.toggleShift(this.HOTKEY_SPELL_6, this.HOTKEY_SPELL_6_SHIFT)
			await this.sleep(10)
		}

		this.robot.keyToggle('space', 'down')
		this.robot.keyToggle('space', 'up')
		await this.toggleShift(this.HOTKEY_SPELL_6, this.HOTKEY_SPELL_6_SHIFT)

		await this.sleep(sleep_after_fight)
	}

	this.toggleShift = async function(hotkey, shift = false, delay = 0) {
		console.log('pressing: ', hotkey, ' shift: ', shift)

		if (shift) {
			// await this.robot.keyToggle('shift', 'down')
			// await this.sleep(0.1 + delay)
			// await this.robot.keyToggle(hotkey, 'down')
			// await this.sleep(0.1)
			// await this.robot.keyToggle(hotkey, 'up')
			// await this.robot.keyToggle('shift', 'up')
			await this.robot.keyTap(hotkey, 'shift')
		} else {
			await this.robot.keyTap(hotkey)
			// await this.robot.keyToggle(hotkey, 'down')
			// await this.sleep(0.1)
			// await this.robot.keyToggle(hotkey, 'up')
		}
	}
}