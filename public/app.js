function reader(event){
    let textInput = document.getElementById('textinput');
    if(event.type === 'click'){
        writer(textInput.value);
    }
    else if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        writer(textInput.value);
    }
};

let left_keys = {
    S:'keyS1',
    T:'keyT1',
    P:'keyP1',
    H:'keyH1',
    K:'keyK',
    W:'keyW',
    R:'keyR1',
};

let right_keys = {
    F:'keyF',
    P:'keyP2',
    L:'keyL',
    T:'keyT2',
    D:'keyD',
    R:'keyR2',
    B:'keyB',
    G:'keyG',
    S:'keyS3',
    Z:'keyZ',
};

let vowel_keys = {
    A: 'keyA',
    O: 'keyO',
    E: 'keyE',
    U: 'keyU',
};

let asterix = false;

function splitter(word){
    asterix = false;
    word = word.toUpperCase();
    
    let left_keys = '';
    let right_keys = '';
    let vowel_keys = '';

    if (word.includes('*')){
        word.replace('*','');
        asterix = true;
    }
    
    // - means no vowels
    if (word.includes('-')){
        splitted = word.split('-')
        left_keys = splitted[0]
        right_keys = splitted[1]
    }
    else {
        let vowels = ['A','O','E','U']
        for(let i=0; i<vowels.length; i++){
            if (word.includes(vowels[i])){
                vowel_keys += vowels[i]
            }
            word = word.replace(vowels[i],'-');
        }
        splitted = word.split(/-+/);
        left_keys = splitted[0];
        right_keys = splitted[1];        
    }

    return {
        left_keys: left_keys,
        right_keys: right_keys,
        vowel_keys: vowel_keys,
    }
    
};

function writer(spelling){
    let split = splitter(spelling);
    let left = split.left_keys;
    let right = split.right_keys;
    let vowels = split.vowel_keys;

    let retval = [];

    for(let i=0; i<left.length; i++){
        retval.push(left_keys[left[i]]);
    }
    if (asterix===true){
        retval.push('keyAsk1');
    }
    for(let i=0; i<vowels.length; i++){
        retval.push(vowel_keys[vowels[i]]);
    }
    for(let i=0; i<right.length; i++){
        retval.push(right_keys[right[i]]);
    }

    highlighter(retval);
};

function highlighter(keyArray){
    clearer();
    for(let i=0; i<keyArray.length; i++){
        let id = keyArray[i];
        let element = document.getElementById(id);
        element.style = "background:red;"
    }
};

function clearer(){
    let keys = document.getElementsByClassName("key");
    for(let i=0; i<keys.length; i++){
        keys[i].style = "background:black;";
    }
}

window.addEventListener('load',function(){
    document.getElementById('textinput').addEventListener('keydown', reader);
    document.getElementById('goButton').addEventListener('click', reader);
    document.getElementById('ClearButton').addEventListener('click', clearer);
});

//STKPWHRAO*EUFRPBLGTSDZ
//"Should The King Please Wear His Red And Orange STARry 
//Elephant Underwear For Royal Purposes Before Lunch Gets Totally Super Devoured (by) Zombies?"