var test_state = {
    scenes: [
	    {
            dialogue: ["Hey I made extra breakfast,\nyou can have the rest"],
            retries: 3,
            wordbank: [
                {text: "Oh", 		anxiety: 50},
                {text: "Cool", 		anxiety: 50},
                {text: "Thanks", 	anxiety: 50},
                {text: "What's", 	anxiety: 50},
                {text: "In", 		anxiety: 50},
                {text: "It", 		anxiety: 50},
                {text: "You", 		anxiety: 50},
                {text: "Didn't", 	anxiety: 50},
                {text: "Have", 		anxiety: 50},
                {text: "To", 		anxiety: 50},
                {text: "Do", 		anxiety: 50},
                {text: "That", 		anxiety: 50}
            ],
            sentences: [
                {
                    CUP: 90,
                    EUP: 10,
                    response: 1,
                    crucial_words: [2],
                    non_crucial_words: [1],
                    trivial_words: [0],
                    words: ["Oh", "Cool", "Thanks"]
                },
                {
                    CUP: 70,
                    EUP: 30,
                    response: 1,
                    crucial_words: [0, 2],
                    non_crucial_words: [1],
                    trivial_words: [],
                    words: ["What's", "In", "It"]
                },
                {
                    CUP: 70,
                    EUP: 30,
                    response: 1,
                    crucial_words: [1, 2, 3],
                    non_crucial_words: [0, 4],
                    trivial_words: [5, 6],
                    words: ["You", "Didn't", "Have", "To", "Do", "That", "It"]
                }
            ]
        },
        {
            dialogue: ["I'm an NPC", "and this is a test", "lolololololol"],
            retries: 3,
            wordbank: [
                {text: "Ayy", 		anxiety: 10},
                {text: "Lmao", 		anxiety: 10},
                {text: "Wut",    	anxiety: 20},
                {text: "PogChamp", 	anxiety: 20},
                {text: "Kappa",		anxiety: 5},
                {text: "WutFace",	anxiety: 50},
                {text: "FrankerZ",	anxiety: 40},
                {text: "4Head", 	anxiety: 30},
                {text: "Go", 		anxiety: 70},
                {text: "To", 		anxiety: 70},
                {text: "The", 		anxiety: 70},
                {text: "Doctor",	anxiety: 70},
                {text: "M2K",   	anxiety: 70}
            ],
            sentences: [
                {
                    CUP: 90,
                    EUP: 10,
                    response: 1,
                    crucial_words: [2],
                    non_crucial_words: [1],
                    trivial_words: [0],
                    words: ["Oh", "Cool", "Thanks"]
                },
                {
                    CUP: 70,
                    EUP: 30,
                    response: 1,
                    crucial_words: [0, 2],
                    non_crucial_words: [1],
                    trivial_words: [],
                    words: ["What's", "In", "It"]
                },
                {
                    CUP: 70,
                    EUP: 30,
                    response: 1,
                    crucial_words: [1, 2, 3],
                    non_crucial_words: [0, 4],
                    trivial_words: [5, 6],
                    words: ["You", "Didn't", "Have", "To", "Do", "That", "It"]
                }
            ]
        }
    ],
    preload: function(){
    },
    loadUpdate: function(){
    },
    loadRender: function(){
    },
    create: function(){
        // Eventually move to initialize layer function
        game.stage.backgroundColor = "#ffff00"
		// this will be pre-defined per level state
        this.manager = new SceneManager(this.scenes);
		var key = game.input.keyboard.addKey(Phaser.Keyboard.E);
		key.state = this;
		key.onDown.add(this.manager.EvaluateQuery, this.manager);
    },
    update: function(){
        this.manager.Update();
    },
    resize: function(){
    },
    shutdown: function(){
    }
}
