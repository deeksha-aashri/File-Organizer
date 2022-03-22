function help() {
    console.log(`
        These are some myCLI commands used in various situations:
            1. node main.js tree <path>
            2. node main.js organize <path>
            3. node main.js help
    `);
}

// function abc() {
//     console.log("in help.js");
// }

module.exports = {
    help: help,                    //key :value Here value is the name of the function and key is to be used in main.js to call this exported value
}
