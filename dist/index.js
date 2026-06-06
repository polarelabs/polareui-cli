import { Command } from "commander";
import { add } from "./commands/add.js";
import { init } from "./commands/init.js";
const program = new Command();
program
    .name("polareui")
    .description("Polare UI — Add quality components to your project")
    .version("0.1.0");
program
    .command("init")
    .description("Initialize Polare UI in your project")
    .action(init);
program
    .command("add")
    .description("Add a component to your project")
    .argument("<components...>", "component name(s) to add")
    .action(add);
program.parse();
