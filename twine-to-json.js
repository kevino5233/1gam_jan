// Copy and paste this into your twine javascript section

var output_json = [];

function PassageToJson(passage){
	if (!passage)
		return;
	var has_speaker = false;
	var has_retries = false;
	var has_dialogue = false;
	var dialogue_only = false;
	var has_wordbank = false;
	var wordbank_mode = false;
	var has_sentences = false;
	var has_fallback = false;
    var has_fall_in = false;
	var scene_json = {
        id: passage.id - 1,
        dialogue: [],
        sentences: [],
        wordbank: []
    };
	var tags = passage.tags;
	for (var i = 0; i < tags.length; i++){
		if (tags[i] == "high-pressure"){
			scene_json.retries = 1;
			has_retries = true;
		} else if (tags[i] == "normal-pressure"){
			scene_json.retries = 2;
			has_retries = true;
		} else if (tags[i] == "low-pressure"){
			scene_json.retries = 3;
			has_retries = true;
		} else if (tags[i] == "dialogue-only"){
            scene_json.retries = -1;
			has_retries = true;
			dialogue_only = true;
		} else if (tags[i] == "end-passage"){
            scene_json.retries = -2;
			has_retries = true;
			dialogue_only = true;
        }
	}
	if (!has_retries){
		scene_json.retries = 3;
	}
	var passage_lines = passage.source.split(/\n/);
	for (var i = 0; i < passage_lines.length; i++){
		var line = passage_lines[i].trim();
		if (line.length == 0){
			continue;
		}
		if (line.startsWith("```")){
			wordbank_mode = !wordbank_mode;
			if (wordbank_mode && has_wordbank){
				alert("Warning: Multiple wordbanks at passage "
                    + passage.name
                    + ".");
			}
			has_wordbank = true;
		} else if (wordbank_mode){
			var word = line.split(" ");
			if (word.length != 2){
				alert("Error: Malformed wordbank at passage "
                    + passage.name + ".\n"
					+ word.toString());
				return;
			}
			scene_json.wordbank.push({text: word[0], anxiety: parseInt(word[1])});
		} else if (line[0] == '#'){
			scene_json.speaker = line.substring(2);
			has_speaker = true;
		} else if (line[0] == '[') {
			has_sentences = true;
			var reached_details = false;
			var sentence = line.split(/\[+|\]+\s*|\s+/);
			var sentence_json = {
                crucial_words: [],
                non_crucial_words: [],
                trivial_words: [],
                words: []
            };
			for (var j = 0; j < sentence.length; j++){
				var sentence_word = sentence[j];
				if (sentence_word.trim().length == 0){
					continue;
				} else if (reached_details){
					if (sentence_json.CUP){
						sentence_json.EUP = parseInt(sentence_word);
					} else {
						sentence_json.CUP = parseInt(sentence_word);
					}
				} else {
					if (sentence_word[0] == "|"){
						sentence_json.response =
							story.passage(sentence_word.substring(1)).id - 1;
						reached_details = true;
					} else {
						if (sentence_word.startsWith("*")){
							sentence_json.crucial_words.push(j - 1);
							sentence_word =
                                sentence_word.substring(
                                    1, sentence_word.length - 1);
						} else if (sentence_word.startsWith("~~")){
							sentence_json.trivial_words.push(j - 1);
							sentence_word = 
								sentence_word.substring(
                                    2, sentence_word.length - 2);
						} else {
							sentence_json.non_crucial_words.push(j - 1);
						}
						sentence_json.words.push(sentence_word);
					}
				}
			}
			scene_json.sentences.push(sentence_json);
		} else if (line[0] == '+'){
			has_dialogue = true;
			scene_json.dialogue.push(line.substring(2));
		} else if (line[0] == '-'){
			if (!has_dialogue){
				alert("Fallback dialogue before regular dialogue at passage "
					+ passage.name);
			}
			has_fallback = true;
            var pipe_split_line = line.split("|");
			scene_json.fallback = pipe_split_line[0].substring(2).trim();
			var fallback_passage_name = pipe_split_line[1].trim();
			var fallback_passage = story.passage(pipe_split_line[1].trim())
			if (!fallback_passage){
				alert("Error: Fallback scene is invalid at passage " + passage.name);
				return;
			} else {
				scene_json.fallback_scene = fallback_passage.id - 1;
			}
		} else if (line[0] == '*'){
			if (!has_dialogue){
				alert("Fall-in dialogue before regular dialogue at passage "
					+ passage.name);
			}
			if (!has_fallback){
				alert("Fall-in dialogue before fallback dialogue at passage "
					+ passage.name);
			}
            has_fall_in = true;
            scene_json.fall_in = line.substring(2);
        }
	}
	if (!has_speaker){
		alert("Warning: No speaker in passage " + passage.name);
		return;
	}
	if (!has_dialogue){
		alert("Error: No dialogue in passage " + passage.name);
		return;
	}
	if (!dialogue_only){
		if (!has_wordbank){
			alert("Error: missing wordbank in passage " + passage.name);
			return;
		}
		if (!has_sentences){
			alert("Error: missing sentence options in passage " + passage.name);
			return;
		}
		if (!has_fallback && scene_json.id != 0){
			alert("Error: missing fallback dialogue in passage " + passage.name);
			return;
		}
	} else if (has_sentences){
        alert("Error: Dialogue-only passage has sentence options in passage "
            + passage.name);
        return;
    }
	output_json.push(scene_json);
}

var twine_passages = story.passages;
twine_passages.forEach(PassageToJson);

var blob = new Blob(
	["var " + story.name + "_scene=" + JSON.stringify(output_json)],
	{type: "application/json"});

var download_link = document.createElement("A");
download_link.innerHTML = "Download story JSON";
download_link.id = "story-json-link";
download_link.href = window.URL.createObjectURL(blob);
document.body.insertBefore(download_link, document.getElementById("passage"));
