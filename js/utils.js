export const gameMode = (diff) => {
    const speedOutput = document.getElementById('speedOutput');
    
    switch(diff){
            case 1:
                speedOutput.innerHTML = "Baby Game";
            break;
            case 2:
                speedOutput.innerHTML = "Baby Game";
            break;
            case 3:
                speedOutput.innerHTML = "Amateur";
            break;
            case 4:
                speedOutput.innerHTML = "Amateur";
            break;
            case 5:
                speedOutput.innerHTML = "Professional";
            break;
            case 6:
                speedOutput.innerHTML = "Professional";
            break;
            case 7:
                speedOutput.innerHTML = "Veteran";
            break;
            case 9:
                speedOutput.innerHTML = "Veteran";
            break;
            case 10:
                speedOutput.innerHTML = "God Tier";    
            break;
        }
};

export const random = (min, max) => {
    return Math.floor(Math.random() * ((max - min) + min));
}; //provides random number between min and max

export const randomBackground = () => {
    let starsInt = random(0, 5);
    return starsInt;
}; //used to randomly cycle through stars array for background customisation

export const restart = () => {
    window.location.reload(); //reloads page on restart but keeps local difficulty

    //hiding html elements on returning to start screen
    modal.style.visibility = "hidden";
    highScoreLabel.style.visibility = "hidden";
    multiplierElement.style.visibility = "hidden";
    scoreElement.style.visibility = "hidden";
};

export const removeObjectFromArray = (obj, arr) => { //needs testing as will break according to my mentor
    let i = arr.indexOf(obj);
    if (i !== -1) {
        let _obj = arr[i];
        arr.splice(i, 1);
		return _obj;
    }
};