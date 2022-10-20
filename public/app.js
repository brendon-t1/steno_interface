function mcReader(event){
    let mcTextInput = document.getElementById('textinput');
    if(event.type === 'click'){
        mcWriter(mcTextInput.value);
    }
    else if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        mcWriter(mcTextInput.value);
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
let mcAsterix = false;

function mcSplitter(mcWord){
    mcAsterix = false;
    mcWord = mcWord.toUpperCase();
    
    let left_keys = '';
    let right_keys = '';
    let vowel_keys = '';

    if (mcWord.includes('*')){
        mcWord.replace('*','');
        mcAsterix = true;
    }
    
    // - means no vowels
    if (mcWord.includes('-')){
        splitted = mcWord.split('-')
        left_keys = splitted[0]
        right_keys = splitted[1]
    }
    else {
        let vowels = ['A','O','E','U']
        for(let i=0; i<vowels.length; i++){
            if (mcWord.includes(vowels[i])){
                vowel_keys += vowels[i]
            }
            mcWord = mcWord.replace(vowels[i],'-');
        }
        splitted = mcWord.split(/-+/);
        left_keys = splitted[0];
        right_keys = splitted[1];        
    }

    return {
        left_keys: left_keys,
        right_keys: right_keys,
        vowel_keys: vowel_keys,
    }
    
};

function mcWriter(mcSpelling){
    let mcSplit = mcSplitter(mcSpelling);
    let left = mcSplit.left_keys;
    let right = mcSplit.right_keys;
    let vowels = mcSplit.vowel_keys;

    let retval = [];

    for(let i=0; i<left.length; i++){
        retval.push(left_keys[left[i]]);
    }
    if (mcAsterix===true){
        retval.push('keyAsk1');
    }
    for(let i=0; i<vowels.length; i++){
        retval.push(vowel_keys[vowels[i]]);
    }
    for(let i=0; i<right.length; i++){
        retval.push(right_keys[right[i]]);
    }

    mcHighlighter(retval);
};

function mcHighlighter(keyArray){
    mcClearer();
    for(let i=0; i<keyArray.length; i++){
        let mcId = keyArray[i];
        let mcElement = document.getElementById(mcId);
        mcElement.style = "background:red;"
    }
};

function mcClearer(){
    let keys = document.getElementsByClassName("key");
    for(let i=0; i<keys.length; i++){
        keys[i].style = "background:black;";
    }
}

window.addEventListener('load',function(){
    document.getElementById('textinput').addEventListener('keydown', mcReader);
    document.getElementById('mcButton').addEventListener('click', mcReader);
    document.getElementById('mcClearButton').addEventListener('click', mcClearer);
});

//STKPWHRAO*EUFRPBLGTSDZ
//"Should The King Please Wear His Red And Orange STARry 
//Elephant Underwear For Royal Purposes Before Lunch Gets Totally Super Devoured (by) Zombies?"