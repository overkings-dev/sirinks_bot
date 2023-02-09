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

	this.CHANNELING_DELAY = 0.8

	this.hotkeys_to_check = [
		'teleport', 'sigil', 
		'spell_1', 'spell_2', 'spell_3', 'spell_4', 'spell_5', 'spell_6', 'spell_7', 'spell_8', 'spell_9'
	]

	this.teleport_params = [
		'teleport_x', 'teleport_y', 'teleport_gap', 'teleport_confirm_x', 'teleport_confirm_y'
	]

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

	this.loadTeleportCoordinates = async function() {
		try {
		  const fileStream = fs.createReadStream('teleport.cfg');

		  const rl = readline.createInterface({
		    input: fileStream,
		    crlfDelay: Infinity
		  });

		  for await (const line of rl) {
		    for (let hotkey of this.teleport_params) {
			    if (line.includes(`${hotkey}=`)) {
			    	let parts = line.split('=')
			    	hotkey = hotkey.toUpperCase()

			    	this[`HOTKEY_${hotkey}`] = parseInt(parts[1])
			    }
			}
		  }
		} catch(e) {
			console.log(e.message)
			return false
		}
		console.log(`Teleport_X_Y: ${this.HOTKEY_TELEPORT_X}, ${this.HOTKEY_TELEPORT_Y}`)
		console.log(`Teleport_confirm_X_Y: ${this.HOTKEY_TELEPORT_CONFIRM_X}, ${this.HOTKEY_TELEPORT_CONFIRM_Y}`)

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
		try {
			console.log(`Teleporting to ${region_number}, waiting ${default_sleep}`)

			// TELEPORT COORDINATIONS from hotkeys.cfg
			await this.toggleShift(this.HOTKEY_TELEPORT, this.HOTKEY_TELEPORT_SHIFT)
			await this.sleep(1.5)

			let y = this.HOTKEY_TELEPORT_Y + this.HOTKEY_TELEPORT_GAP * region_number

			await this.confirmClick(this.HOTKEY_TELEPORT_X, y)
			await this.sleep(1)

			// click TP
			await this.confirmClick(this.HOTKEY_TELEPORT_CONFIRM_X, this.HOTKEY_TELEPORT_CONFIRM_Y)
			await this.sleep(1)
		} catch(e) {
			console.log(e.message)
			process.exit(1)
		}
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
		if (isFirst) {
			await this.sleep(3)
		}

		await this.confirmClick(this.location_middle_position.start_x, this.location_middle_position.start_y)
		await this.sleep(0.5)

		await this.toggleShift(this.HOTKEY_SPELL_1, this.HOTKEY_SPELL_1_SHIFT)
		await this.sleep(0.7)

		for (let i = 0; i < steps; i++) {

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

		if (!spells) {
			await this.toggleShift(this.HOTKEY_SPELL_2, this.HOTKEY_SPELL_2_SHIFT)
			await this.sleep(2)

			await this.toggleShift(this.HOTKEY_SPELL_3, this.HOTKEY_SPELL_3_SHIFT)
			await this.sleep(this.CHANNELING_DELAY)
		}

		if (spells) {

			for (let i = 0; i < 3; i++) {
				await this.toggleShift(this.HOTKEY_SPELL_5, this.HOTKEY_SPELL_5_SHIFT)
				await this.sleep(this.CHANNELING_DELAY)	
			}

			for (let i = 0; i < 3; i++) {
				this.robot.keyToggle('space', 'down')
				this.robot.keyToggle('space', 'up')
				await this.toggleShift(this.HOTKEY_SPELL_6, this.HOTKEY_SPELL_6_SHIFT)
				await this.sleep(this.CHANNELING_DELAY)	
			}

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

		if (!spells) {
			this.robot.keyToggle('space', 'down')
			this.robot.keyToggle('space', 'up')
			await this.toggleShift(this.HOTKEY_SPELL_2, this.HOTKEY_SPELL_2_SHIFT)
			await this.sleep(2.2)

			await this.toggleShift(this.HOTKEY_SPELL_3, this.HOTKEY_SPELL_3_SHIFT)
			await this.sleep(1)
		}

		if (spells) {

			for (let i = 0; i < 3; i++) {
				await this.toggleShift(this.HOTKEY_SPELL_5, this.HOTKEY_SPELL_5_SHIFT)
				await this.sleep(this.CHANNELING_DELAY)	
			}

			for (let i = 0; i < 3; i++) {
				this.robot.keyToggle('space', 'down')
				this.robot.keyToggle('space', 'up')
				await this.toggleShift(this.HOTKEY_SPELL_6, this.HOTKEY_SPELL_6_SHIFT)
				await this.sleep(this.CHANNELING_DELAY)	
			}

			await this.toggleShift(this.HOTKEY_SPELL_7, this.HOTKEY_SPELL_7_SHIFT)
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
		// console.log('pressing: ', hotkey, ' shift: ', shift)
		try {
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
		} catch(e) {
			console.log('Cannot toggleShift:', e.message)
		}
	}
}