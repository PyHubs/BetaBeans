// Initalize a main window
kaboom({
	font: 'apl386',
	background: [76, 201, 113],
	crips: true,
})

// Sprites
loadSprite("city", "sprites/city.png");
loadSprite("lebeach", "sprites/lebeach.png");
loadSprite("tree", "sprites/tree.png");
loadSprite("mountain", "sprites/mountain.png");

// Foods
loadSprite("chicken", "sprites/foods/chicken.png");

// Bean sprites
loadSprite("angry_bean", "sprites/bean/angry_bean.png");
loadSprite("happy_bean", "sprites/bean/happy_bean.png");
loadSprite("sad_bean", "sprites/bean/sad_bean.png");

loadSprite("angry_classical", "sprites/bean/angry_classical.png");
loadSprite("happy_classical", "sprites/bean/happy_classical.png");
loadSprite("sad_classical", "sprites/bean/sad_classical.png");

loadSprite("angry_sus", "sprites/bean/angry_sus.png");
loadSprite("happy_sus", "sprites/bean/happy_sus.png");
loadSprite("sad_sus", "sprites/bean/sad_sus.png");

// Skins
loadSprite("bean_skin", "sprites/skins/bean.png");
loadSprite("classical_skin", "sprites/skins/classical.png");
loadSprite("eman_skin", "sprites/skins/eman.png");
loadSprite("bird_skin", "sprites/skins/bird.png");
loadSprite("sussy_skin", "sprites/skins/sussy.png");

// Variables
var speed = 240;
var hp = 800
var score = 0
var coins = 0

var viewport_height = document.documentElement.clientHeight;
var viewport_width = document.documentElement.clientWidth;

// Coins
if (localStorage.getItem("coins") === null) {
	coins = localStorage.setItem("coins", 1)
	console.warn(`Set ${coins}`)
} else {
	coins = localStorage.getItem("coins")
	console.info(`Get Coins ${coins}`)
}

// Skins
if (localStorage.getItem("skin") === null) {
	var skin = localStorage.setItem("skin", "classical")
	console.warn(`Set skin ${coins}`)
} else {
	var skin = localStorage.setItem("skin", localStorage.getItem('skin'))
	console.info(`Get Skin ${coins}`)
}

// Spawn obstecles
function spawns () {
	// 1-30
	var random_num = Math.floor(Math.random() * 29);
	console.log(random_num)

	/*
	1-Chicken
	6-Banana
 	14-Clown
  	24-Coconut
	28-speed
 	19-Skin selctor
	*/

	// Chicken
	if (random_num == 1) {
		var chicken = add([
			sprite("chicken"),
			area(),
			pos(width(), height() - 48),
			origin("botleft"),
			move(LEFT, speed),
			"chicken"
		])
	}

	// Skin selector
	else if (random_num == 19) {
		var rn = Math.floor(Math.random() * 6);
		//"bean_skin", "classical_skin", "eman_skin", "bird_skin", "sussy_skin"

		if (rn == 1) {
			var bean_skin = add([
				sprite("bean_skin"),
				area(),
				pos(width(), height() - 48),
				origin("botleft"),
				move(LEFT, speed),
				"bean_skin"
			])
		} else if (rn == 2) {
			var classical_skin = add([
				sprite("classical_skin"),
				area(),
				pos(width(), height() - 48),
				origin("botleft"),
				move(LEFT, speed),
				"classical_skin"
			])
		} else if (rn == 3) {
			var eman_skin = add([
				sprite("eman_skin"),
				area(),
				pos(width(), height() - 48),
				origin("botleft"),
				move(LEFT, speed),
				"eman_skin"
			])
		} else if (rn == 4) {
			var bird_skin = add([
				sprite("bird_skin"),
				area(),
				pos(width(), height() - 48),
				origin("botleft"),
				move(LEFT, speed),
				"bird_skin"
			])
		} else if (rn == 5) {
			var sussy_skin = add([
				sprite("sussy_skin"),
				area(),
				pos(width(), height() - 48),
				origin("botleft"),
				move(LEFT, speed),
				"sussy_skin"
			])
		}
	}

	// Obsticles
	else {
		add([
			rect(rand(36, 48), rand(24, 64)),
			area(),
			pos(width(), height() - 48),
			origin("botleft"),
			color(rand(0, 255), rand(0, 255), rand(0, 255)),
			move(LEFT, speed),
			outline(4),
			cleanup(),
			"obstc",
		])
	}

	// repeat
	wait(rand(0.9, 1.7), () => { spawns(); })
}

// Random item
function random_item(list) { return list[Math.floor((Math.random() * list.length))]; }

// GAME
scene("game", () => {
	const bg = random_item(['city', 'tree', 'lebeach', 'mountain'])
	console.warn(bg)

	// Set the background image
	var w3 = width()/2
	var h3 = height()/2-48

	var background = add([
		sprite(bg),
		pos(w3, h3),
		origin("center"),
		scale(1),
		fixed(),
		"background"
	])

	// Add a platform
	add([
		rect(width(), 48),
		outline(4),
		pos(0, height() - 48),
		area(), // adds colider
		solid(),
		color(rand(0, 255), rand(0, 255), rand(0, 255)),
	])

	// Warn the tutorial
	var tl = add([
		text("T > Tutorial"),
		pos(center()),
		origin("center"),
		area(),
		color(255, 255, 255),
		"tutorialLabel"
	])

	setTimeout(
    	function() {
	      destroy(tl)
	    }, 10000);

	// Tutorial
	onKeyPress("t", () => {
		debug.paused = true;
		let question = confirm("Welcome to The Bean. You must be playing on laptop/PC?")

		if (question == true) {
			alert("Good. More features here. So click SPACE to JUMP or RIGHT-CLICK the mouse to JUMP. And pause menu click the TOP-SCORE/HP BAR. Use the keys Z, X, C, V to change background in game :) Mobile just TAP THE SCREEN")
		} else {
			alert("Oh ok. So you must be using keyboard or mouse? Anyways...\n More features here. So click SPACE to JUMP or RIGHT-CLICK the mouse to JUMP. And pause menu click the TOP-SCORE/HP BAR. Use the keys Z, X, C, V to change background in game :) Mobile just TAP THE SCREEN")
		}

		debug.paused = false;
	})

	// Main bean character
	var bean = add([
		sprite(`happy_${localStorage.getItem('skin')}`),
		pos(80, 40),
		area(),
		body(),
		outline(4),
	])

	// .jump() once when "space" is just being pressed
	onKeyPress("space", () => { if (bean.isGrounded()) { bean.jump() } })
	onClick(() => { if (bean.isGrounded()) { bean.jump() } })
	onTouchStart(() => { if (bean.isGrounded()) { bean.jump() } })

	// Collisions
	bean.onCollide("obstc", () => {
		navigator.vibrate(500);
		addKaboom(bean.pos);
		hp -= 100

		if (hp <= 0) {
			console.warn("ERROR: BELOW HP 0")
			go("fail")
		}
		
		if (hp < 200) { bean.use(sprite(`angry_${localStorage.getItem("skin")}`)) }
		else { bean.use(sprite(`sad_${localStorage.getItem("skin")}`)) }

		healthbar.text = `HP:${hp} S:${score} C:${coins} SP: ${speed}`

		setTimeout(
    	function() {
	      bean.use(sprite(`happy_${localStorage.getItem("skin")}`))
	    }, 7000);
		
		shake();
	})

	// Colide with chicken
	bean.onCollide("chicken", () => { hp += 90; })

	// Colide with skin selectors
	bean.onCollide("bean_skin", () => { localStorage.setItem("skin", "bean") })
	bean.onCollide("classical_skin", () => { localStorage.setItem("skin", "classical") })
	bean.onCollide("eman_skin", () => { localStorage.setItem("skin", "eman") })
	bean.onCollide("bird_skin", () => { localStorage.setItem("skin", "bird") })
	bean.onCollide("sussy_skin", () => { localStorage.setItem("skin", "sussy") })

	// Spawn obstecles
	wait(rand(0.9, 1.7), () => { spawns(); })

	// Health bar
	var healthbar = add([
		text(`HP:${hp} S:${score} C:${coins} SP: ${speed}`), {
			width: width(),
			size: 1,
			font: 'apl386',
		}, area(), 'healthbar',
	])

	onUpdate("healthbar", (hbar) => {
		score += 1;
		hbar.text = `HP:${hp} S:${score} C:${coins} SP: ${speed}`
	})

	// Set Backgrounds
	onKeyPress("z", () => { background.use(sprite('city')) })
	onKeyPress("x", () => { background.use(sprite('lebeach')) })
	onKeyPress("c", () => { background.use(sprite('tree')) })
	onKeyPress("v", () => { background.use(sprite('mountain')) })
})

go("game")

// Fails
scene("fail", () => {
	if (coins == undefined) { coins=1; localStorage.setItem('coins', coins); }
	else { localStorage.setItem('coins', coins); }
	
	localStorage.setItem('skin', localStorage.getItem('skin'))

	// Set the highscore
	if (localStorage.getItem('highscore') === null) {
		localStorage.setItem('highscore', score);

		add([
			text(`New Score!\n Score: ${score}\nCoins: ${coins}`),
			pos(center()),
			origin("center"),
		])


	} else if (localStorage.getItem('highscore') < score) {		
		localStorage.setItem('highscore', score);

		add([
			text(`New Score!\n Score: ${score}\nCoins: ${coins}\nHighscore: ${localStorage.getItem('highscore')}`),
			pos(center()),
			origin("center"),
		])

	} else {
		add([
			text(`What a failiure!\n Score: ${score}\nCoins: ${coins}\nHighscore: ${localStorage.getItem('highscore')}`),
			pos(center()),
			origin("center"),
		])
	}

	// click key to continue
	onKeyPress(() => {
		show_score = true
		score = 0
		hp = 800
		go("game")
	})

	 onTouchStart(() => {
		show_score = true
		score = 0
		hp = 800
		go("game")
	})
})