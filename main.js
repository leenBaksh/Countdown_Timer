#! /usr/bin/env node
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
import chalk from "chalk";
const res = await inquirer.prompt({
    type: "number",
    name: "userInput",
    message: "Please enter the number of seconds (max 60):",
    validate: (input) => {
        if (typeof input === "undefined" || isNaN(input)) {
            return "Please enter a valid number";
        }
        else if (input !== undefined && (input > 60 || input < 0)) {
            return "Seconds must be between 0 and 60";
        }
        else {
            return true;
        }
    },
});
let input = res.userInput; // Using non-null assertion
function startTime(val) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    const timerInterval = setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.red("Timer has expired!"));
            clearInterval(timerInterval);
            process.exit();
        }
        const min = Math.floor(timeDiff / 60);
        const sec = timeDiff % 60;
        console.log(chalk.yellow(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
    }, 1000);
}
startTime(input);
