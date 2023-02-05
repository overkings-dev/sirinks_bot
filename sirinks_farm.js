
(async () => {
	var robot = require("robotjs")
	var Overkings = require("./Overkings")
	
	// Speed up the mouse.
	// robot.setMouseDelay(10)
	let overkings = new Overkings(robot)
	
	if (!await overkings.loadHotkeys()) {
		console.log('Cannot load Hotkeys... exit')
		process.exit(1)
	}

	if (!await overkings.loadBosses()) {
		console.log('Cannot load Bosses... exit')
		process.exit(1)
	}

	let args = process.argv.slice(2)

	let isVerg = false
	let isFiord = false
	let isHeim = false

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

	overkings.sayHi()

	await overkings.sleep(10)

	if (isVerg) {
			// Vergerland		--------------------------- 18 bosses
		// ERIGE - KZ
		await overkings.teleport(4, 1)
		await overkings.farmBoss(overkings.minga)

		await overkings.teleport(4, 1)
		await overkings.farmBoss(overkings.lungret)

		await overkings.teleport(4, 1)
		await overkings.farmBoss(overkings.yurvi)

		await overkings.teleport(4, 1)
		await overkings.farmBoss(overkings.vorsivul)

		await overkings.teleport(4, 1)
		await overkings.farmBoss(overkings.foldrit)

		// ONSLAND
		await overkings.farmBoss(overkings.borgar)

		await overkings.teleport(2, 1)
		await overkings.farmBoss(overkings.irm)

		// UTSALA
		await overkings.teleport(6, 1)
		await overkings.farmBoss(overkings.ludogriz)

		await overkings.teleport(6, 1)
		await overkings.farmBoss(overkings.berfegar)

		await overkings.teleport(6, 1)
		await overkings.farmBoss(overkings.guldholder)

		await overkings.teleport(6, 1)
		await overkings.farmBoss(overkings.frigg)

		await overkings.teleport(6, 1)
		await overkings.farmBoss(overkings.kyuki)

		await overkings.teleport(6, 1)
		await overkings.farmBoss(overkings.frityof)

		// TOYRE
		await overkings.teleport(3, 1)
		await overkings.farmBoss(overkings.gruder)

		// KRONSLIHT
		await overkings.teleport(1, 1)
		await overkings.farmBoss(overkings.digra)

		await overkings.teleport(1, 1)
		await overkings.farmBoss(overkings.nyolf)

		await overkings.teleport(1, 1)
		await overkings.farmBoss(overkings.brol)

		await overkings.teleport(1, 1)
		await overkings.farmBoss(overkings.saam)
	}

	if (isFiord) {
			// HARANGER FIORD 		------------------------------- 13 bosses
		//Hrogland
		await overkings.teleport(2, 1)
		await overkings.farmBoss(overkings.olfradi)

		await overkings.teleport(2, 1)
		await overkings.farmBoss(overkings.kniaz)

		await overkings.farmBoss(overkings.gorm)

		await overkings.farmBoss(overkings.vergranda)

		await overkings.farmBoss(overkings.nils)

		await overkings.farmBoss(overkings.erdhorn)

		// Verstve
		await overkings.teleport(1, 1)
		await overkings.farmBoss(overkings.urdi)

		await overkings.teleport(1, 1)
		await overkings.farmBoss(overkings.ilding)

		// Ruini
		await overkings.teleport(3, 1)
		await overkings.farmBoss(overkings.vorfturm)

		await overkings.teleport(3, 1)
		await overkings.farmBoss(overkings.brost)

		await overkings.teleport(3, 1)
		await overkings.farmBoss(overkings.alva)

		await overkings.teleport(3, 1)
		await overkings.farmBoss(overkings.skriga)

		// Zaliv
		await overkings.teleport(4, 1)
		await overkings.farmBoss(overkings.yarl)
	}

	if (isHeim) {
			// HEIMSKRINGLA		------------------------------- 13 bosses
		// Razlom
		await overkings.farmBoss(overkings.heo, 4)

		await overkings.farmBoss(overkings.ogg, 4)

		// Gorod Vetrov
		await overkings.teleport(2, 1)
		await overkings.farmBoss(overkings.smerla, 4)

		await overkings.teleport(2, 1)
		await overkings.farmBoss(overkings.meraban, 4)

		// Drevo
		await overkings.teleport(5, 1)
		await overkings.farmBoss(overkings.baal, 4)

		await overkings.teleport(5, 1)
		await overkings.farmBoss(overkings.gorgelad, 4)

		await overkings.teleport(5, 1)
		await overkings.farmBoss(overkings.mardonius, 4)

		await overkings.teleport(5, 1)
		await overkings.farmBoss(overkings.marzuba, 4)

		// Gorod Purgi
		await overkings.teleport(3, 1)
		await overkings.farmBoss(overkings.ogdenhag, 4)

		await overkings.teleport(3, 1)
		await overkings.farmBoss(overkings.cumamba, 4)

		await overkings.teleport(3, 1)
		await overkings.farmBoss(overkings.garmfuldi, 4)

		await overkings.teleport(3, 1)
		await overkings.farmBoss(overkings.jurda, 4)

		await overkings.teleport(3, 1)
		await overkings.farmBoss(overkings.loghorn, 4)
	}
})();

function delay(seconds) {
	setTimeout(() => {
	  console.log(`Delayed for ${seconds} second.`);
	}, `${seconds * 1000}`)
}