const names = new WeakMap();

function log(label, params) {
    console.log(label + ": " + Object.getOwnPropertyNames(params).map(key => {
        const value = params[key];
        const name = names.get(value);
        const display = name ? name : JSON.stringify(value);
        return `${key} = ${display}`
    }).join(", "));
}

const example = {
    answer: 42
};
names.set(example, "example");
log("Testing 1 2 3", {value: example})