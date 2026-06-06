import chalk from "chalk";
import ora from "ora";
import { fetchRegistryItem } from "../utils/registry.js";
import { writeComponentFile, fileExists } from "../utils/files.js";
export async function add(components) {
    console.log(chalk.bold("\n  Polare UI\n"));
    for (const name of components) {
        const spinner = ora(`Adding ${name}...`).start();
        try {
            const item = await fetchRegistryItem(name);
            if (!item) {
                spinner.fail(chalk.red(`Component "${name}" not found in Polare UI registry.`));
                console.log(chalk.dim(`  Run ${chalk.cyan("npx polareui list")} to see available components.\n`));
                continue;
            }
            for (const file of item.files) {
                if (!file.content) {
                    spinner.fail(chalk.red(`No content found for ${file.target}`));
                    continue;
                }
                const exists = await fileExists(file.target);
                if (exists) {
                    spinner.warn(chalk.yellow(`${file.target} already exists — skipping.`));
                    continue;
                }
                await writeComponentFile(file.target, file.content);
            }
            spinner.succeed(chalk.green(`${item.title} added to components/ui/${name}.tsx`));
            if (item.dependencies?.length) {
                console.log(chalk.dim(`  Dependencies: ${item.dependencies.join(", ")}`));
                console.log(chalk.dim(`  Run: ${chalk.cyan(`pnpm add ${item.dependencies.join(" ")}`)}\n`));
            }
        }
        catch (err) {
            spinner.fail(chalk.red(`Failed to add ${name}`));
            console.error(err);
        }
    }
}
