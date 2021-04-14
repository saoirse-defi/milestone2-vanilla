export const random = (min, max) => {
    return Math.floor(Math.random() * ((max - min) + min));
}; //provides random number between min and max

export const randomBackground = () => {
    let starsInt = random(0, 5);
    return starsInt;
}; //used to randomly cycle through stars array for background customisation

export const removeObjectFromArray = (obj, arr) => { //needs testing as will break according to my mentor
    let i = arr.indexOf(obj);
    if (i !== -1) {
        let _obj = arr[i];
        arr.splice(i, 1);
		return _obj;
    }
};

export const numberWithCommas = (x) => { //credit https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};