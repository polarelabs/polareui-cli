import chalk from "chalk";
import ora from "ora";
import fs from "fs-extra";
import path from "path";
const CSS_VARIABLES = `
/* Polare UI — Design Tokens */
:root {
  --color-background: #ffffff;
  --color-foreground: #0a0a0a;
  --color-surface: #f4f4f5;
  --color-border: #e4e4e7;
  --color-muted-foreground: #71717a;
  --color-primary: #0a0a0a;
  --color-primary-foreground: #ffffff;
  --color-secondary: #f4f4f5;
  --color-secondary-foreground: #0a0a0a;
  --color-destructive: #ef4444;
  --color-ring: #0a0a0a;
  --color-success: #16a34a;
  --color-warning: #d97706;
}
`;
export async function init() {
    console.log(chalk.bold("\n  Polare UI\n"));
    const spinner = ora("Initializing Polare UI...").start();
    try {
        // Find globals.css
        const possiblePaths = [
            "app/globals.css",
            "src/app/globals.css",
            "styles/globals.css",
            "src/styles/globals.css",
        ];
        let cssPath = null;
        for (const p of possiblePaths) {
            const full = path.join(process.cwd(), p);
            if (await fs.pathExists(full)) {
                cssPath = p;
                break;
            }
        }
        if (!cssPath) {
            // Create it
            cssPath = "app/globals.css";
            await fs.ensureDir(path.join(process.cwd(), "app"));
            await fs.writeFile(path.join(process.cwd(), cssPath), CSS_VARIABLES);
        }
        else {
            // Append to existing
            const existing = await fs.readFile(path.join(process.cwd(), cssPath), "utf-8");
            if (!existing.includes("--color-primary")) {
                await fs.appendFile(path.join(process.cwd(), cssPath), CSS_VARIABLES);
            }
        }
        spinner.succeed(chalk.green("Polare UI initialized successfully"));
        console.log(chalk.dim(`\n  CSS variables added to ${cssPath}`));
        console.log(chalk.dim("  You can now add components:\n"));
        console.log(chalk.cyan("  npx polareui add button\n"));
    }
    catch (err) {
        spinner.fail(chalk.red("Initialization failed"));
        console.error(err);
        process.exit(1);
    }
}
