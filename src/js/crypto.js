function mod(n, m) {
    return ((n % m) + m) % m;
}

const cryptBase = (offset) => (letter) => {
    if(typeof letter !== "string" || letter.length !== 1) return null
    if(!(/[a-z]/i).test(letter)) return letter;

    let aCode = letter === letter.toLowerCase() ? "a".charCodeAt(0) : "A".charCodeAt(0);

    const newLetterCode = mod(letter.charCodeAt(0) - aCode + offset, 26) + aCode;

    //console.log(letter, String.fromCharCode(newLetterCode), offset);

    return String.fromCharCode(newLetterCode);    
}

const cryptText = (cryptFn) => (string) => {
    if(typeof string !== "string") return null;
    return string.split("").map(c => cryptFn(c)).join("");
}

export function crypto(offset) {
    return {
        crypt: cryptText(cryptBase(offset)),
        decrypt: cryptText(cryptBase(-offset))
    }
}