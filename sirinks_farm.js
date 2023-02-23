
(async () => {
	var robot = require("robotjs")
	var Overkings = require("./Overkings")
	
	// Speed up the mouse.
	// robot.setMouseDelay(10)
	let overkings = new Overkings(robot)

	let isVerg = false
	let isFiord = false
	let isHeim = false
	let char

	let args = process.argv.slice(2)

	if (args[0]) {
		switch(args[0]) {
		  case 'v':
		    isVerg = true
		    console.log('Running for Vergerland')
		    break;
		  case 'f':
		    isFiord = true
		    console.log('Running for FIORD')
		    break;
		  case 'h':
		    isHeim = true
		    console.log('Running for HEIMSKRINGLA')
		    break;
		  default:
		    isVerg = true
		}
	}

	char = args[1] ? args[1] : null 
	
	if (!await overkings.loadHotkeys(char)) {
		console.log('Cannot load Hotkeys... exit')
		process.exit(1)
	}

	if (!await overkings.loadBosses()) {
		console.log('Cannot load Bosses... exit')
		process.exit(1)
	}

	if (!await overkings.loadTeleportCoordinates(char)) {
		console.log('Cannot load Teleport Coordinates... exit')
		process.exit(1)
	}

	console.log('Channeling: ', overkings.CHANNELING_DELAY)

	console.log('Sleep for 5 seconds')
	await overkings.sleep(5)

	// await overkings.infinite_teleport(4)

	try {
		console.log('Running Test: type 1')
		await overkings.toggleShift('1')
	} catch (e) {
		console.log(e.message)
	}


	if (isVerg) {
		let start_time  = new Date()
		
			// Vergerland		--------------------------- 18 bosses
		if (overkings.HOTKEY_CHAR_STRONG) {
			await overkings.teleport(4, 1)
			await overkings.farmBoss(overkings.minga)
		}

		await overkings.teleport(4, 1)
		await overkings.farmBoss(overkings.vorsivul)

		await overkings.teleport(4, 1)
		await overkings.farmBoss(overkings.foldrit)

		await overkings.teleport(4, 1)
		await overkings.farmBoss(overkings.lungret)

		await overkings.teleport(4, 1)
		await overkings.farmBoss(overkings.yurvi)

		// ONSLAND
		await overkings.farmBoss(overkings.borgar)

		// if (overkings.HOTKEY_CHAR_STRONG) {
			await overkings.teleport(2, 1)
			await overkings.farmBoss(overkings.irm)
		// }

		// UTSALA
		await overkings.teleport(6, 1)
		await overkings.farmBoss(overkings.ludogriz)

		await overkings.teleport(6, 1)
		await overkings.farmBoss(overkings.berfegar)

		await overkings.teleport(6, 1)
		await overkings.farmBoss(overkings.guldholder)

		await overkings.teleport(6, 1)
		await overkings.farmBoss(overkings.frigg)

		if (overkings.HOTKEY_CHAR_STRONG) {
			await overkings.teleport(6, 1)
			await overkings.farmBoss(overkings.kyuki)

			await overkings.teleport(6, 1)
			await overkings.farmBoss(overkings.frityof)
		}

		// TOYRE
		await overkings.teleport(3, 1)
		await overkings.farmBoss(overkings.gruder)

		// KRONSLIHT
		if (overkings.HOTKEY_CHAR_STRONG) {
			await overkings.teleport(1, 1)
			await overkings.farmBoss(overkings.digra)

			await overkings.teleport(1, 1)
			await overkings.farmBoss(overkings.nyolf)
		}

		await overkings.teleport(1, 1)
		await overkings.farmBoss(overkings.brol)

		await overkings.teleport(1, 1)
		await overkings.farmBoss(overkings.saam)

		console.log('Started Verg at: ', start_time)
		console.log('Finished Verg at: ', new Date())
	}

	if (isFiord) {
		let start_time  = new Date()
		
			// HARANGER FIORD 		------------------------------- 13-2 bosses
		//Hrogland
		await overkings.farmBoss(overkings.gorm)

		await overkings.teleport(3, 1)
		await overkings.farmBoss(overkings.vorfturm)

		if (overkings.HOTKEY_CHAR_STRONG) {
			await overkings.farmBoss(overkings.vergranda)

			// await overkings.farmBoss(overkings.nils)

			// await overkings.farmBoss(overkings.erdhorn)
		}

		// Verstve
		await overkings.teleport(1, 1)
		await overkings.farmBoss(overkings.urdi)

		await overkings.teleport(3, 1)
		await overkings.farmBoss(overkings.brost)

		await overkings.teleport(1, 1)
		await overkings.farmBoss(overkings.ilding)

		if (overkings.HOTKEY_CHAR_STRONG) {
			await overkings.teleport(3, 1)
			await overkings.farmBoss(overkings.alva)
		}

		if (overkings.HOTKEY_CHAR_STRONG) {
			await overkings.teleport(2, 1)
			await overkings.farmBoss(overkings.kniaz)
		}

		await overkings.teleport(3, 1)
		await overkings.farmBoss(overkings.skriga)

		await overkings.teleport(2, 1)
		await overkings.farmBoss(overkings.olfradi)

		await overkings.teleport(4, 1)
		await overkings.farmBoss(overkings.yarl)

		console.log('Started Fiord at: ', start_time)
		console.log('Finished Verg at: ', new Date())
	}

	if (isHeim) {
		let start_time  = new Date()
		
		// HEIMSKRINGLA		------------------------------- 12 bosses

		await overkings.teleport(5, 1)
		await overkings.farmBoss(overkings.marzuba, 4)

		await overkings.teleport(3, 1)
		await overkings.farmBoss(overkings.loghorn, 4)

		await overkings.teleport(2, 1)
		await overkings.farmBoss(overkings.smerla, 4)

		await overkings.teleport(3, 1)
		await overkings.farmBoss(overkings.jurda, 4)

		await overkings.teleport(5, 1)
		await overkings.farmBoss(overkings.mardonius, 4)

		await overkings.teleport(3, 1)
		await overkings.farmBoss(overkings.garmfuldi, 4)

		await overkings.teleport(5, 1)
		await overkings.farmBoss(overkings.gorgelad, 4)

		await overkings.teleport(3, 1)
		await overkings.farmBoss(overkings.ogdenhag, 4)

		await overkings.teleport(2, 1)
		await overkings.farmBoss(overkings.meraban, 4)

		await overkings.teleport(3, 1)
		await overkings.farmBoss(overkings.cumamba, 4)

		await overkings.farmBoss(overkings.heo, 4)

		await overkings.teleport(5, 1)
		await overkings.farmBoss(overkings.baal, 4)

		console.log('Started Heim at: ', start_time)
		console.log('Finished Heim at: ', new Date())
	}
})();

function delay(seconds) {
	setTimeout(() => {
	  console.log(`Delayed for ${seconds} second.`);
	}, `${seconds * 1000}`)
}