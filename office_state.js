var office_state = {
    ellipse_center_x: 300,
    ellipse_center_y: 300,
    scenes: [
        {
            id: 0,
            dialogue: ["Sup"],
            retries: 0,
            wordbank: [{text: "Sup", anxiety: 10}],
            sentences: [
                {
                    CUP: 90, 	EUP: 10, 	response: 1,
                    crucial_words: [0],
                    non_crucial_words: [],
                    trivial_words: [],
					words: ["Sup"]
                }
            ]
        },
        {
            id: 1,
            dialogue: ["How's it going"],
            retries: 1,
            wordbank: [
                {text: "It's",          anxiety: 50},
                {text: "Going",         anxiety: 60},
                {text: "All",           anxiety: 50},
                {text: "Right",         anxiety: 50},
                {text: "Good",          anxiety: 30},
                {text: "How",           anxiety: 30},
                {text: "Are",           anxiety: 30},
                {text: "You",           anxiety: 30},
                {text: "Could",         anxiety: 75},
                {text: "Be",            anxiety: 75},
                {text: "Better",        anxiety: 75}
            ],
            sentences: [
                {
                    CUP: 90,    EUP: 10,    response: 2,
                    crucial_words: [2, 3],
                    non_crucial_words: [1],
                    trivial_words: [0],
                    words: ["It's", "Going", "All", "Right"]
                },
				{
                    CUP: 90,    EUP: 10,    response: 2,
                    crucial_words: [1, 2],
                    non_crucial_words: [0],
                    trivial_words: [],
                    words: ["Going", "All", "Right"]
				},
				{
                    CUP: 70,    EUP: 30,    response: 3,
                    crucial_words: [1, 2, 5],
                    non_crucial_words: [0, 3, 4],
                    trivial_words: [],
                    words: ["Going", "All", "Right", "How", "Are", "You"]
				},
                {
                    CUP: 80,    EUP: 20,    response: 3,
                    crucial_words: [0, 2],
                    non_crucial_words: [1, 2],
                    trivial_words: [],
                    words: ["Good", "How", "Are", "You"]
                },
                {
                    CUP: 80,    EUP: 20,    response: 4,
                    crucial_words: [2, 3, 5],
                    non_crucial_words: [1, 2, 4],
                    trivial_words: [0],
                    words: ["It's", "Good", "Could", "Be", "Going", "Better"]
                } 
            ]
        },
        {
            id: 2,
            dialogue: ["Good to hear!", "That's good.", "That's good."],
            retries: 1,
            wordbank: [
                {text: "Yeah",          anxiety: 20},
                {text: "How",           anxiety: 40},
                {text: "About",         anxiety: 40},
                {text: "You",           anxiety: 40},
                {text: "Traffic",       anxiety: 60},
                {text: "Was",           anxiety: 60},
                {text: "Hella",         anxiety: 60},
                {text: "Busy",          anxiety: 60},
                {text: "Have",          anxiety: 15},
                {text: "Checked",       anxiety: 15},
                {text: "Email",         anxiety: 15},
                {text: "Your",          anxiety: 15}
            ],
            sentences: [
                {
                    CUP: 100,    EUP: 0,    response: 3,
                    crucial_words: [0, 1, 2],
                    non_crucial_words: [],
                    trivial_words: [],
                    words: ["How", "About", "You"]
                },
                {
                    CUP: 80,    EUP: 20,    response: 5,
                    crucial_words: [0, 3],
                    non_crucial_words: [1],
                    trivial_words: [2],
                    words: ["Traffic", "Was", "Hella", "Busy"]
                },
                {
                    CUP: 80,    EUP: 20,    response: 6,
                    crucial_words: [1, 2, 4],
                    non_crucial_words: [0],
                    trivial_words: [3],
                    words: ["Have", "You", "Checked", "Your", "Email"]
                } 
            ]
        },
        {
            id: 3,
            dialogue: [
                "Not too bad. Pretty excited for tonight.",
                "Not too bad.",
                "Not too bad."],
            retries: 1,
            wordbank: [
                {text: "Cool",          anxiety: 5},
                {text: "What",          anxiety: 75},
                {text: "Are",           anxiety: 75},
                {text: "You",           anxiety: 15},
                {text: "Up",            anxiety: 75},
                {text: "To",            anxiety: 75},
                {text: "Tonight",       anxiety: 75},
                {text: "Have",          anxiety: 25},
                {text: "Checked",       anxiety: 25},
                {text: "Email",         anxiety: 25},
                {text: "Your",          anxiety: 25}
            ],
            sentences: [
                {
                    CUP: 100,    EUP: 0,    response: 4,
                    crucial_words: [0],
                    non_crucial_words: [],
                    trivial_words: [],
                    words: ["Cool"]
                },
                {
                    CUP: 80,    EUP: 20,    response: 6,
                    crucial_words: [1, 2, 4],
                    non_crucial_words: [0],
                    trivial_words: [3],
                    words: ["Have", "You", "Checked", "Your", "Email"]
                },
                {
                    CUP: 80,    EUP: 20,    response: 7,
                    crucial_words: [0, 2, 3, 4],
                    non_crucial_words: [5],
                    trivial_words: [],
                    words: ["What", "Are", "You", "Up", "To", "Tonight"]
                }
            ]
        },
        {
            id: 4,
            dialogue: [
                "So moody! You caught Jeff's emails?",
                "Jeez, you catch Jeff's emails?",
                "Uhh, seems like you read Jeff's email."],
            retries: 1,
            wordbank: [
                {text: "Yeah",          anxiety: 5},
                {text: "Guess",         anxiety: 15},
                {text: "We'll",         anxiety: 15},
                {text: "Have",          anxiety: 15},
                {text: "To",            anxiety: 15},
                {text: "Deal",          anxiety: 15},
                {text: "With",          anxiety: 15},
                {text: "It",            anxiety: 15},
                {text: "God",           anxiety: 55},
                {text: "Clients",       anxiety: 55},
                {text: "Never",         anxiety: 55},
                {text: "Know",          anxiety: 55},
                {text: "What",          anxiety: 55},
                {text: "They",          anxiety: 55},
                {text: "Want",          anxiety: 55}
            ],
            sentences: [
                {
                    CUP: 60,    EUP: 40,    response: 8,
                    crucial_words: [1, 3, 4],
                    non_crucial_words: [0, 2, 5, 6],
                    trivial_words: [],
                    words: ["Guess", "We'll", "Have", "To", "Deal", "With", "It"]
                },
                {
                    CUP: 80,    EUP: 20,    response: 10,
                    crucial_words: [0, 2, 3, 4],
                    non_crucial_words: [5],
                    trivial_words: [],
                    words: ["God", "Clients", "Never", "Know", "What",
                            "They", "Want"]
                }
            ]
        },
        {
            id: 5,
            dialogue: [
                "It's because of the festival! Pretty excited myself.",
                "It's because of the festival.",
                "Well I mean the festival is today."],
            retries: 1,
            wordbank: [
                {text: "What",          anxiety: 75},
                {text: "Are",           anxiety: 75},
                {text: "You",           anxiety: 15},
                {text: "Doing",         anxiety: 75},
                {text: "Anything",      anxiety: 75},
                {text: "Up",            anxiety: 75},
                {text: "To",            anxiety: 75},
                {text: "Tonight",       anxiety: 75},
                {text: "Have",          anxiety: 25},
                {text: "Checked",       anxiety: 25},
                {text: "Email",         anxiety: 25},
                {text: "Your",          anxiety: 25},
                {text: "It's",          anxiety: 50},
                {text: "Still",         anxiety: 50},
                {text: "Annoying",      anxiety: 50}
            ],
            sentences: [
                {
                    CUP: 80,    EUP: 20,    response: 6,
                    crucial_words: [1, 2, 4],
                    non_crucial_words: [0],
                    trivial_words: [3],
                    words: ["Have", "You", "Checked", "Your", "Email"]
                },
                {
                    CUP: 80,    EUP: 20,    response: 7,
                    crucial_words: [0, 2, 3, 4],
                    non_crucial_words: [5],
                    trivial_words: [],
                    words: ["What", "Are", "You", "Up", "To", "Tonight"]
                },
                {
                    CUP: 80,    EUP: 20,    response: 7,
                    crucial_words: [1, 2, 3],
                    non_crucial_words: [4],
                    trivial_words: [0],
                    words: ["Are", "You", "Doing", "Anything", "Tonight"]
                },
                {
                    CUP: 100,    EUP: 0,    response: 9,
                    crucial_words: [1, 2],
                    non_crucial_words: [],
                    trivial_words: [0],
                    words: ["It's", "Still", "Annoying"]
                }
            ]
        },
        {
            id: 6,
            dialogue: [
                "Yeah! These clients are ridiculous.",
                "The clients are ridiculous.",
                "Jeez these clients."], //THIS IS FUCKING AWFUL ARE YOU KIDDING ME
            retries: 1,
            wordbank: [
                {text: "Yeah",          anxiety: 5},
                {text: "Guess",         anxiety: 15},
                {text: "We'll",         anxiety: 15},
                {text: "Have",          anxiety: 15},
                {text: "To",            anxiety: 15},
                {text: "Deal",          anxiety: 15},
                {text: "With",          anxiety: 15},
                {text: "It",            anxiety: 15},
                {text: "God",           anxiety: 55},
                {text: "Clients",       anxiety: 55},
                {text: "Never",         anxiety: 55},
                {text: "Know",          anxiety: 55},
                {text: "What",          anxiety: 55},
                {text: "They",          anxiety: 55},
                {text: "Want",          anxiety: 55}
            ],
            sentences: [
                {
                    CUP: 60,    EUP: 40,    response: 8,
                    crucial_words: [1, 3, 4],
                    non_crucial_words: [0, 2, 5, 6],
                    trivial_words: [],
                    words: ["Guess", "We'll", "Have", "To", "Deal", "With", "It"]
                },
                {
                    CUP: 80,    EUP: 20,    response: 10,
                    crucial_words: [1, 2, 3, 6],
                    non_crucial_words: [4, 5],
                    trivial_words: [0],
                    words: ["God", "Clients", "Never", "Know", "What",
                            "They", "Want"]
                }
            ]
        },
        {
            id: 7,
            dialogue: [
                "Going to see a show! Forgot what it was called...",
                "Seein' a show.",
                "Seein' a show."], //THIS IS FUCKING AWFUL ARE YOU KIDDING ME
            retries: 1,
            wordbank: [
                {text: "Yeah",          anxiety: 10},
                {text: "Oh",            anxiety: 10},
                {text: "It",            anxiety: 10},
                {text: "Cool",          anxiety: 10},
                {text: "That",          anxiety: 10},
                {text: "You",           anxiety: 15},
                {text: "Have",          anxiety: 25},
                {text: "Checked",       anxiety: 25},
                {text: "Email",         anxiety: 25},
                {text: "Your",          anxiety: 25},
                {text: "Mind",          anxiety: 75},
                {text: "If",            anxiety: 75},
                {text: "I",             anxiety: 75},
                {text: "Tag",           anxiety: 75},
                {text: "Along",         anxiety: 75}
            ],
            sentences: [
                {
                    CUP: 80,    EUP: 20,    response: 6,
                    crucial_words: [1, 2, 4],
                    non_crucial_words: [0],
                    trivial_words: [3],
                    words: ["Have", "You", "Checked", "Your", "Email"]
                },
                {
                    CUP: 100,    EUP: 0,    response: 13,
                    crucial_words: [1, 2, 3],
                    non_crucial_words: [],
                    trivial_words: [0],
                    words: ["That", "Should", "Be", "Fun"]
                },
                {
                    CUP: 80,    EUP: 20,    response: 11,
                    crucial_words: [0, 2, 3, 4],
                    non_crucial_words: [1],
                    trivial_words: [],
                    words: ["Mind", "If", "I", "Tag", "Along"]
                }
            ]
        },
        {
            id: 8,
            dialogue: [
                "Man, you always seem to just take things.",
                "Taking it as always I see.",
                "Taking it as always i see."],
            retries: 1,
            wordbank: [
                {text: "What",          anxiety: 15},
                {text: "The",           anxiety: 15},
                {text: "Fuck",          anxiety: 15},
                {text: "Else",          anxiety: 15},
                {text: "Am",            anxiety: 15},
                {text: "I",             anxiety: 15},
                {text: "Supposed",      anxiety: 15},
                {text: "To",            anxiety: 15},
                {text: "Do",            anxiety: 15},
                {text: "Are",           anxiety: 40},
                {text: "You",           anxiety: 50},
                {text: "Trying",        anxiety: 75},
                {text: "To",            anxiety: 75},
                {text: "Say",           anxiety: 75}
            ],
            sentences: [
                {
                    CUP: 75,    EUP: 25,    response: 10,
                    crucial_words: [0, 6, 8],
                    non_crucial_words: [3, 4, 5, 7],
                    trivial_words: [1, 2],
                    words: ["What", "The", "Fuck", "Else", "Am",
                            "I", "Supposed", "To", "Do"]
                },
                {
                    CUP: 75,    EUP: 25,    response: 12,
                    crucial_words: [0, 2, 5],
                    non_crucial_words: [1, 3],
                    trivial_words: [4],
                    words: ["What", "Are", "You", "Trying", "To", "Say"]
                }
            ]
        },
        {
            id: 9,
            dialogue: [
                "Yeah, it can't be helped though.",
                "Can't be helped I guess.",
                "Same old same old."],
            retries: 1,
            wordbank: [
                {text: "Yeah",          anxiety: 15},
                {text: "I",             anxiety: 15},
                {text: "Guess",         anxiety: 15},
                {text: "You",           anxiety: 15},
                {text: "Have",          anxiety: 25},
                {text: "Checked",       anxiety: 25},
                {text: "Email",         anxiety: 25},
                {text: "Your",          anxiety: 25},
                {text: "Are",           anxiety: 75},
                {text: "Doing",         anxiety: 75},
                {text: "Anything",      anxiety: 75},
                {text: "Tonight",       anxiety: 75}
            ],
            sentences: [
                {
                    CUP: 95,    EUP: 5,    response: 13,
                    crucial_words: [1, 2],
                    non_crucial_words: [0],
                    trivial_words: [],
                    words: ["Yeah", "I", "Guess"]
                },
                {
                    CUP: 90,    EUP: 10,    response: 6,
                    crucial_words: [1, 2, 4],
                    non_crucial_words: [0],
                    trivial_words: [3],
                    words: ["Have", "You", "Checked", "Your", "Email"]
                },
                {
                    CUP: 90,    EUP: 10,    response: 7,
                    crucial_words: [2, 3, 4],
                    non_crucial_words: [0, 1],
                    trivial_words: [],
                    words: ["Are", "You", "Doing", "Anything", "Tonight"]
                }
            ]
        },
        {
            id: 10,
            dialogue: [
                "Ouch! Don't worry, you get used to it.",
                "You'll get used to it.",
                "Yeah well get used to it."],
            retries: 1,
            wordbank: [
                {text: "Whatever",      anxiety: 50},
                {text: "You",           anxiety: 50},
                {text: "Say",           anxiety: 50},
                {text: "I",             anxiety: 50},
                {text: "Sure",          anxiety: 50},
                {text: "Hope",          anxiety: 50},
                {text: "Not",           anxiety: 50},
                {text: "Guess",         anxiety: 50},
                {text: "So",            anxiety: 50}
            ],
            sentences: [
                {
                    CUP: 100,    EUP: 0,    response: 13,
                    crucial_words: [0, 1, 2],
                    non_crucial_words: [],
                    trivial_words: [],
                    words: ["Whatever", "You", "Say"]
                },
                {
                    CUP: 95,    EUP: 5,    response: 13,
                    crucial_words: [1, 2, 3],
                    non_crucial_words: [0],
                    trivial_words: [],
                    words: ["I", "Sure", "Hope", "Not"]
                },
                {
                    CUP: 95,    EUP: 5,    response: 13,
                    crucial_words: [1, 2],
                    non_crucial_words: [0],
                    trivial_words: [],
                    words: ["I", "Guess", "So"]
                }
            ]
        },
        {
            id: 11,
            dialogue: [
                "I'll have to check. We were supposed to pre-order tickets I think.",
                "Maybe. We pre-ordered tickets I think.",
                "I don't know, we pre-ordered tickets."],
            retries: 1,
            wordbank: [
                {text: "Actually",      anxiety: 40},
                {text: "Never",         anxiety: 40},
                {text: "Mind",          anxiety: 40},
                {text: "Well",          anxiety: 75},
                {text: "Just",          anxiety: 75},
                {text: "Let",           anxiety: 75},
                {text: "Me",            anxiety: 75},
                {text: "Know",          anxiety: 75},
                {text: "Then",          anxiety: 75},
                {text: "What's",        anxiety: 60},
                {text: "It",            anxiety: 60},
                {text: "About",         anxiety: 60},
                {text: "Guess",         anxiety: 50},
                {text: "I'm",           anxiety: 50},
                {text: "Not",           anxiety: 50},
                {text: "Going",         anxiety: 50},
                {text: "Then",          anxiety: 50}
            ],
            sentences: [
                {
                    CUP: 95,    EUP: 5,    response: 19,
                    crucial_words: [1, 2],
                    non_crucial_words: [0],
                    trivial_words: [],
                    words: ["Actually", "Never", "Mind"]
                },
                {
                    CUP: 85,    EUP: 15,    response: 17,
                    crucial_words: [2, 3, 4],
                    non_crucial_words: [1],
                    trivial_words: [0, 5],
                    words: ["Well", "Just", "Let", "Me", "Know", "Then"]
                },
                {
                    CUP: 100,    EUP: 0,    response: 14,
                    crucial_words: [0, 1, 2],
                    non_crucial_words: [],
                    trivial_words: [],
                    words: ["What's", "It", "About"]
                },
                {
                    CUP: 85,    EUP: 15,    response: 18,
                    crucial_words: [2, 3, 4],
                    non_crucial_words: [0, 1],
                    trivial_words: [],
                    words: ["Guess", "I'm", "Not", "Going", "Then"]
                }
            ]
        },
        {
            id: 12,
            dialogue: [
                "Nothing! Just seen that attitude come up in everyone eventually.",
                "Calm down! Just figured this attitude would come up in you.",
                "Just figured this attitude would come up in you."],
            retries: 1,
            wordbank: [
                {text: "Whatever",      anxiety: 50},
                {text: "You",           anxiety: 50},
                {text: "Say",           anxiety: 50},
                {text: "I",             anxiety: 50},
                {text: "Sure",          anxiety: 50},
                {text: "Hope",          anxiety: 50},
                {text: "Not",           anxiety: 50},
                {text: "Guess",         anxiety: 50},
                {text: "So",            anxiety: 50}
            ],
            sentences: [
                {
                    CUP: 100,    EUP: 0,    response: 13,
                    crucial_words: [0, 1, 2],
                    non_crucial_words: [],
                    trivial_words: [],
                    words: ["Whatever", "You", "Say"]
                },
                {
                    CUP: 95,    EUP: 5,    response: 13,
                    crucial_words: [1, 2, 4],
                    non_crucial_words: [0],
                    trivial_words: [],
                    words: ["I", "Sure", "Hope", "Not"]
                },
                {
                    CUP: 95,    EUP: 5,    response: 13,
                    crucial_words: [1, 2],
                    non_crucial_words: [0],
                    trivial_words: [],
                    words: ["I", "Guess", "So"]
                }
            ]
        },
        {
			id: 13,
            dialogue: [
				"Me too man. I think I can hear your coffee finishing in the break room.",
				"Me too man. I think your coffee is done.",
				"Yeah. I think your coffee is done."
			],
            retries: -1,
            wordbank: [],
            sentences: []
		},
        {
			id: 14,
            dialogue: [
				"It's a comedy show. Something about old ladies leaving their small town.",
				"It's a comedy show. Something about old ladies.",
				"It's a comedy show."
			],
            retries: 1,
            wordbank: [
                {text: "Oh",            anxiety: 50},
                {text: "Sounds",        anxiety: 50},
                {text: "Kinda",         anxiety: 50},
                {text: "Lame",          anxiety: 50},
                {text: "That",          anxiety: 50},
                {text: "Could",         anxiety: 50},
                {text: "Be",            anxiety: 50},
                {text: "Good",          anxiety: 50},
                {text: "I",             anxiety: 50},
                {text: "Guess",         anxiety: 50},
                {text: "Sounds",        anxiety: 50},
                {text: "Interesting",   anxiety: 50}
            ],
            sentences: [
                {
                    CUP: 95,    EUP: 5,    response: 16,
                    crucial_words: [3],
                    non_crucial_words: [1, 2],
                    trivial_words: [0],
                    words: ["Oh", "Sounds", "Kinda", "Lame"]
                },
                {
                    CUP: 85,    EUP: 15,    response: 17,
                    crucial_words: [1, 2, 3],
                    non_crucial_words: [4, 5],
                    trivial_words: [0],
                    words: ["That", "Could", "Be", "Good", "I", "Guess"]
                },
                {
                    CUP: 100,    EUP: 0,    response: 17,
                    crucial_words: [1, 2],
                    non_crucial_words: [],
                    trivial_words: [0],
                    words: ["That", "Sounds", "Interesting"]
                }
            ]
		},
        {
			id: 15,
            dialogue: [
				"It's a comedy show. Something about old ladies leaving their small town.",
				"It's a comedy show. Something about old ladies.",
				"It's a comedy show."
			],
            retries: 1,
            wordbank: [
                {text: "Actually",      anxiety: 40},
                {text: "Never",         anxiety: 40},
                {text: "Mind",          anxiety: 40},
                {text: "Oh",            anxiety: 60},
                {text: "Sounds",        anxiety: 60},
                {text: "Kinda",         anxiety: 60},
                {text: "Lame",          anxiety: 60},
                {text: "That",          anxiety: 20},
                {text: "Could",         anxiety: 20},
                {text: "Be",            anxiety: 20},
                {text: "Good",          anxiety: 20},
                {text: "I",             anxiety: 20},
                {text: "Guess",         anxiety: 20},
                {text: "Sounds",        anxiety: 40},
                {text: "Interesting",   anxiety: 40}
            ],
            sentences: [
                {
                    CUP: 95,    EUP: 5,    response: 19,
                    crucial_words: [1, 2],
                    non_crucial_words: [0],
                    trivial_words: [],
                    words: ["Actually", "Never", "Mind"]
                },
                {
                    CUP: 95,    EUP: 5,    response: 16,
                    crucial_words: [3],
                    non_crucial_words: [1, 2],
                    trivial_words: [0],
                    words: ["Oh", "Sounds", "Kinda", "Lame"]
                },
                {
                    CUP: 85,    EUP: 15,    response: 17,
                    crucial_words: [1, 2, 3],
                    non_crucial_words: [4, 5],
                    trivial_words: [0],
                    words: ["That", "Could", "Be", "Good", "I", "Guess"]
                },
                {
                    CUP: 100,    EUP: 0,    response: 17,
                    crucial_words: [1, 2],
                    non_crucial_words: [],
                    trivial_words: [0],
                    words: ["That", "Sounds", "Interesting"]
                }
            ]
		},
        {
			id: 16,
            dialogue: [
                "Be glad you're not going then! By the way I think your" +
					"coffee is ready.",
                "Oh you don't have to go I guess. By the way I think your" +
					"coffee is ready.",
                "Oh well. I think your coffee is ready."],
            retries: -1,
            wordbank: [
            ],
            sentences: [
            ]
		},
        {
			id: 17,
            dialogue: [
                "I'll definitely let you know. By the way I think your" +
					"coffee is ready.",
                "I'll let you know. By the way I think your coffee is ready.",
                "Uh, yeah. I think your coffee is ready."],
            retries: -1,
            wordbank: [
            ],
            sentences: [
            ]
		},
        {
			id: 18,
            dialogue: [
                "Yeah sorry. I'll let you know though.",
                "Probably, sorry. I'll let you know",
                "Probably."],
            retries: -1,
            wordbank: [
                {text: "Actually",      anxiety: 60},
                {text: "Never",         anxiety: 60},
                {text: "Mind",          anxiety: 60},
                {text: "It's",          anxiety: 60},
                {text: "Ok",            anxiety: 60},
                {text: "I",             anxiety: 60},
                {text: "Understand",    anxiety: 60}
            ],
            sentences: [
                {
                    CUP: 95,    EUP: 5,    response: 19,
                    crucial_words: [1, 2],
                    non_crucial_words: [0],
                    trivial_words: [],
                    words: ["Actually", "Never", "Mind"]
                },
                {
                    CUP: 100,    EUP: 0,    response: 19,
                    crucial_words: [2, 3],
                    non_crucial_words: [],
                    trivial_words: [0, 1],
                    words: ["It's", "Ok", "I", "Understand"]
                }
            ]
		},
        {
			id: 19,
            dialogue: [
                "Yeah, sorry dude. By the way I think your coffee is ready.",
                "Ah, that's a shame. By the way I think your coffee is ready.",
                "Aight. I think your coffee is ready."],
            retries: -1,
            wordbank: [
            ],
            sentences: [
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
        game.stage.backgroundColor = "#3385ff";
        InitializeLayers(this);
        this.manager = new SceneManager(
                this,
                this.scenes,
                this.ellipse_center_x,
                this.ellipse_center_y,
				"Co-Worker",
                "end");
    },
    update: function(){
        this.manager.Update();
    },
    resize: function(){
    },
    shutdown: function(){
        DestroyLayers(this);
    }
}
