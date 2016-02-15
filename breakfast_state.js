var breakfast_state = {
    ellipse_center_x: 300,
    ellipse_center_y: 300,
    scenes: [
	    {
			id: 0,
            dialogue: ["Hey, I made too much for breakfast. You can have the rest."],
            retries: 3,
            OnLoad: function(correctness){
            },
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
                    CUP: 90, 	EUP: 10, 	response: 1,
                    crucial_words: [2],
                    non_crucial_words: [1],
                    trivial_words: [0],
                    words: ["Oh", "Cool", "Thanks"],
					OnCorrect: function(correctness){
						console.log(correctness);
					}
                },
                {
                    CUP: 70,	EUP: 30, 	response: 3,
                    crucial_words: [0, 2],
                    non_crucial_words: [1],
                    trivial_words: [],
                    words: ["What's", "In", "It"]
                },
                {
                    CUP: 70, 	EUP: 30,	response: 2,
                    crucial_words: [1, 2, 3],
                    non_crucial_words: [0, 4],
                    trivial_words: [5, 6],
                    words: ["You", "Didn't", "Have", "To", "Do", "That", "It"]
                }
            ]
        },
        {
			id: 1,
            dialogue: [
				"Yeah of course! Guess what it is.",
				"Yeah. Wanna know what it is?",
				"Guess what."
			],
            retries: 3,
            OnLoad: function(correctness){
                anxiety += 2;
                console.log(anxiety);
            },
            wordbank: [
                {text: "What", 		anxiety: 50},
                {text: "Is", 		anxiety: 50},
                {text: "It",    	anxiety: 50},
                {text: "Why", 		anxiety: 50},
                {text: "Don't",		anxiety: 50},
                {text: "You",		anxiety: 50},
                {text: "Just",		anxiety: 50},
                {text: "Tell", 		anxiety: 50},
                {text: "Me", 		anxiety: 50}
            ],
            sentences: [
                {
                    CUP: 100, 	EUP: 0,	response: 3,
                    crucial_words: [0],
                    non_crucial_words: [],
                    trivial_words: [1, 2],
                    words: ["What", "Is", "It"]
                },
                {
                    CUP: 70,	EUP: 30,	response: 4,
                    crucial_words: [1, 2, 3],
                    non_crucial_words: [0, 4],
                    trivial_words: [5, 6],
                    words: ["Why", "Don't", "You", "Just", "Tell", "Me"]
                }
            ]
        },
        {
			id: 2,
            dialogue: [
				"Oh it's no biggie! Better than letting it go to waste.",
				"Yeah sure. Wouldn't want it to go to waste.",
				"Yeah..."
			],
            retries: 3,
            wordbank: [
                {text: "What", 		anxiety: 50},
                {text: "Is", 		anxiety: 50},
                {text: "It",    	anxiety: 50},
                {text: "Yeah", 		anxiety: 50},
                {text: "That's",	anxiety: 50},
                {text: "True",		anxiety: 50}
            ],
            sentences: [
                {
                    CUP: 95, 	EUP: 5,	response: 3,
                    crucial_words: [0],
                    non_crucial_words: [],
                    trivial_words: [1, 2],
                    words: ["What", "is", "it?"]
                },
                {
                    CUP: 90,	EUP: 10,	response: 5,
                    crucial_words: [2],
                    non_crucial_words: [1],
                    trivial_words: [0],
                    words: ["Yeah", "That's", "True"]
                }
            ]
		},
        {
			id: 3,
            dialogue: [
				"Eggs Bitch!!!",
				"Eggs Bitch!!!",
				"Eggs Bitch!!!"
			],
            retries: 3,
            wordbank: [
                {text: "God", 		anxiety: 50},
                {text: "Fucking",	anxiety: 50},
                {text: "Damnit",   	anxiety: 50},
                {text: "Are", 		anxiety: 50},
                {text: "Kidding",	anxiety: 50},
                {text: "Serious",	anxiety: 50},
                {text: "Me",		anxiety: 50},
                {text: "You",		anxiety: 50},
                {text: "Motherfucker",	anxiety: 50}
            ],
            sentences: [
                {
                    CUP: 90, 	EUP: 10,	response: 6,
                    crucial_words: [0, 2],
                    non_crucial_words: [],
                    trivial_words: [1],
                    words: ["God", "Fucking", "Damnit"]
                },
                {
                    CUP: 90,	EUP: 10,	response: 6,
                    crucial_words: [1, 3],
                    non_crucial_words: [2],
                    trivial_words: [0],
                    words: ["Are", "You", "Fucking", "Serious"]
                },
                {
                    CUP: 90,	EUP: 10,	response: 6,
                    crucial_words: [1, 3, 4],
                    non_crucial_words: [2],
                    trivial_words: [0],
                    words: ["Are", "You", "Fucking", "Kidding", "Me"]
                },
                {
                    CUP: 95,	EUP: 5,	response: 6,
                    crucial_words: [1],
                    non_crucial_words: [],
                    trivial_words: [0],
                    words: ["You", "Motherfucker"]
                }
            ]
		},
        {
			id: 4,
            dialogue: [
				"I didn't know you were so excited for eggs!!!",
				"I didn't know you were so excited for eggs!!!",
				"I didn't know you were so excited for eggs!!!"
			],
            retries: 3,
            wordbank: [
                {text: "God", 		anxiety: 50},
                {text: "Fucking",	anxiety: 50},
                {text: "Damnit",   	anxiety: 50},
                {text: "Are", 		anxiety: 50},
                {text: "Kidding",	anxiety: 50},
                {text: "Serious",	anxiety: 50},
                {text: "Me",		anxiety: 50},
                {text: "You",		anxiety: 50},
                {text: "Motherfucker",	anxiety: 50}
            ],
            sentences: [
                {
                    CUP: 90, 	EUP: 10,	response: 6,
                    crucial_words: [0, 2],
                    non_crucial_words: [],
                    trivial_words: [1],
                    words: ["God", "Fucking", "Damnit"]
                },
                {
                    CUP: 90,	EUP: 10,	response: 6,
                    crucial_words: [1, 3],
                    non_crucial_words: [2],
                    trivial_words: [0],
                    words: ["Are", "You", "Fucking", "Serious"]
                },
                {
                    CUP: 95,	EUP: 5,	response: 6,
                    crucial_words: [1],
                    non_crucial_words: [],
                    trivial_words: [0],
                    words: ["You", "Motherfucker"]
                }
            ]
		},
        {
			id: 5,
            dialogue: [
				"Yeah wouldn't want these EGGS to go to waste.",
				"Yeah wouldn't want these EGGS to go to waste.",
				"Yeah wouldn't want these EGGS to go to waste."
			],
            retries: 3,
            wordbank: [
                {text: "God", 		anxiety: 50},
                {text: "Fucking",	anxiety: 50},
                {text: "Damnit",   	anxiety: 50},
                {text: "Are", 		anxiety: 50},
                {text: "Kidding",	anxiety: 50},
                {text: "Serious",	anxiety: 50},
                {text: "Me",		anxiety: 50},
                {text: "You",		anxiety: 50},
                {text: "Motherfucker",	anxiety: 50},
                {text: "Let",		anxiety: 50},
                {text: "Them",		anxiety: 50},
                {text: "Rot",		anxiety: 50}
            ],
            sentences: [
                {
                    CUP: 90, 	EUP: 10,	response: 6,
                    crucial_words: [0, 2],
                    non_crucial_words: [],
                    trivial_words: [1],
                    words: ["God", "Fucking", "Damnit"]
                },
                {
                    CUP: 90,	EUP: 10,	response: 6,
                    crucial_words: [1, 3],
                    non_crucial_words: [2],
                    trivial_words: [0],
                    words: ["Are", "You", "Fucking", "Serious"]
                },
                {
                    CUP: 95,	EUP: 5,		response: 6,
                    crucial_words: [1],
                    non_crucial_words: [],
                    trivial_words: [0],
                    words: ["You", "Motherfucker"]
                },
                {
                    CUP: 80,	EUP: 20,	response: 6,
                    crucial_words: [0, 3],
                    non_crucial_words: [1, 2],
                    trivial_words: [],
                    words: ["Let", "Them", "Fucking", "Rot"]
                }
            ]
		},
        {
			id: 6,
            dialogue: [
				"BAHAHAHAHAHAHAHA!!!",
				"BAHAHAHAHAHAHAHA!!!",
				"BAHAHAHAHAHAHAHA!!!"
			],
            retries: -1,
            wordbank: [],
            sentences: []
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
        game.stage.backgroundColor = "#ff5c33";
		// this will be pre-defined per level state
        this.manager = new SceneManager(
                this.scenes,
                this.ellipse_center_x,
                this.ellipse_center_y,
				"Roommate",
                "office");
    },
    update: function(){
        this.manager.Update();
    },
    resize: function(){
    },
    shutdown: function(){
    }
}
