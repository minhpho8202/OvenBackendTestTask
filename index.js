import inquirer from "inquirer";
import chalk from "chalk";
import Folder from "./Folder.js";
import File from "./File.js";

const root = new Folder("root");

async function pause() {
    await inquirer.prompt([{ name: "continue", message: "Press enter to continue...", type: "input" }]);
}

async function showMenu() {
    // await initTestData();

    while (true) {
        const { choice } = await inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: "Chose action:",
                choices: [
                    "📂 Add folder",
                    "📄 Add file",
                    "🗑 Remove folder",
                    "🗑 Remove file",
                    "🔍 Search file",
                    "🔍 Search folder",
                    "📜 Show root folder",
                    "❌ Exit",
                ],
            },
        ]);

        switch (choice) {
            case "📂 Add folder": {
                try {
                    const { name, parent } = await inquirer.prompt([
                        { type: "input", name: "name", message: "Name:" },
                        { type: "input", name: "parent", message: "Parent folder (blank = root):" },
                    ]);

                    let parentFolder = root;

                    if (parent) {
                        const foundFolders = root.searchFolder(parent);

                        if (foundFolders.length === 0) {
                            console.log(chalk.red("❌ Parent folder is not found!"));
                            break;
                        }

                        if (foundFolders.length > 1) {
                            const { selectedParent } = await inquirer.prompt([
                                {
                                    type: "list",
                                    name: "selectedParent",
                                    message: `${foundFolders.length} folders are found. Choose the parent folder:`,
                                    choices: foundFolders.map(folder => ({
                                        name: folder.name + " (Path: " + folder.path + ")",
                                        value: folder
                                    })),
                                },
                            ]);
                            parentFolder = selectedParent;
                        } else {
                            parentFolder = foundFolders[0];
                        }
                    }


                    console.log(parentFolder.path);
                    parentFolder.addFolder(new Folder(name));
                    console.log(chalk.green("✔ Folder is added successfully!"));
                } catch (error) {
                    console.log(chalk.red(error.message));
                }
                break;
            }

            case "📄 Add file": {
                try {
                    const { name, content, parent } = await inquirer.prompt([
                        { type: "input", name: "name", message: "Name:" },
                        { type: "input", name: "content", message: "Content:" },
                        { type: "input", name: "parent", message: "Parent folder (blank = root):" },
                    ]);

                    let parentFolder = root;

                    if (parent) {
                        const foundFolders = root.searchFolder(parent);

                        if (foundFolders.length === 0) {
                            console.log(chalk.red("❌ Parent folder is not found!"));
                            break;
                        }

                        if (foundFolders.length > 1) {
                            const { selectedParent } = await inquirer.prompt([
                                {
                                    type: "list",
                                    name: "selectedParent",
                                    message: `${foundFolders.length} folders are found. Choose the parent folder:`,
                                    choices: foundFolders.map(folder => ({
                                        name: folder.name + " (Path: " + folder.path + ")",
                                        value: folder
                                    })),
                                },
                            ]);
                            parentFolder = selectedParent;
                        } else {
                            parentFolder = foundFolders[0];
                        }
                    }


                    parentFolder.addFile(new File(name, content));
                    console.log(chalk.green("✔ File is added successfully!"));
                } catch (error) {
                    console.log(chalk.red(error.message));
                }

                break;
            }


            case "🗑 Remove folder": {
                try {
                    const { name } = await inquirer.prompt([
                        { type: "input", name: "name", message: "Name:" },
                    ]);

                    const foundFolders = root.searchFolder(name);

                    if (foundFolders.length === 0) {
                        console.log(chalk.red("❌ Folder is not found!"));
                        break;
                    }


                    let folderToRemove;

                    if (foundFolders.length > 1) {
                        const { selectedFolder } = await inquirer.prompt([
                            {
                                type: "list",
                                name: "selectedFolder",
                                message: `${foundFolders.length} folders are found. Choose the folder you want to remove:`,
                                choices: foundFolders.map(folder => ({
                                    name: folder.name + " (Path: " + folder.path + ")",
                                    value: folder.path
                                })),
                            },
                        ]);
                        folderToRemove = foundFolders.find(folder => folder.path === selectedFolder);
                    } else {
                        folderToRemove = foundFolders[0];
                    }

                    if (root.removeFolder(folderToRemove.path)) {
                        console.log(chalk.green("✔ Folder is removed successfully!"));
                    } else {
                        console.log(chalk.red("❌ Folder could not be removed!"));
                    }
                } catch (error) {
                    console.log(chalk.red(error.message));
                }
                break;
            }

            case "🗑 Remove file": {
                try {
                    const { name } = await inquirer.prompt([
                        { type: "input", name: "name", message: "Name:" },
                    ]);

                    const foundFiles = root.searchFile(name);

                    if (foundFiles.length === 0) {
                        console.log(chalk.red("❌ File is not found!"));
                        break;
                    }
                    let fileToRemove;

                    if (foundFiles.length > 1) {
                        const { selectedFile } = await inquirer.prompt([
                            {
                                type: "list",
                                name: "selectedFile",
                                message: `${foundFiles.length} files are found. Choose the file you want to remove:`,
                                choices: foundFiles.map(file => ({
                                    name: file.name + " (Path: " + file.path + ")",
                                    value: file.path
                                })),
                            },
                        ]);
                        fileToRemove = foundFiles.find(file => file.path === selectedFile);
                    } else {
                        fileToRemove = foundFiles[0];
                    }

                    const isRemoved = root.removeFile(fileToRemove.path);
                    if (isRemoved) {
                        console.log(chalk.green("✔ File is removed successfully!"));
                    } else {
                        console.log(chalk.red("❌ File could not be removed!"));
                    }
                } catch (error) {
                    console.log(chalk.red(error.message));
                }
                break;
            }

            case "🔍 Search file": {
                try {
                    const { name } = await inquirer.prompt([
                        { type: "input", name: "name", message: "Name:" },
                    ]);
                    const foundFiles = root.searchFile(name);
                    if (foundFiles.length === 0) {
                        console.log(chalk.red("❌ File is not found!"));
                        break;
                    }

                    if (foundFiles.length > 1) {
                        const { selectedFile } = await inquirer.prompt([
                            {
                                type: "list",
                                name: "selectedFile",
                                message: `${foundFiles.length} files are found, select one:`,
                                choices: foundFiles.map((file, index) => ({
                                    name: `📄 ${file.name} (Path: ${file.path || "Unknown"})`,
                                    value: index,
                                })),
                            },
                        ]);

                        const file = foundFiles[selectedFile];
                        console.log(chalk.green(`File: ${file.name}`));
                        console.log(chalk.green(`Content: ${file.content}`));
                    } else {
                        const file = foundFiles[0];
                        console.log(chalk.green(`File: ${file.name}`));
                        console.log(chalk.green(`Content: ${file.content}`));
                        console.log(chalk.green(`Path: ${file.path}`));
                    }
                } catch (error) {
                    console.log(chalk.red(error.message));
                }
                break;
            }

            case "🔍 Search folder": {
                const { name } = await inquirer.prompt([
                    { type: "input", name: "name", message: "Name:" },
                ]);
                const foundFolders = root.searchFolder(name);

                if (foundFolders.length === 0) {
                    console.log(chalk.red("❌ Folder is not found!"));
                    break;
                }

                if (foundFolders.length > 1) {
                    const { selectedFolder } = await inquirer.prompt([
                        {
                            type: "list",
                            name: "selectedFolder",
                            message: `${foundFolders.length} folders are found. Choose the folder you want to view:`,
                            choices: foundFolders.map(folder => ({
                                name: folder.name + " (Path: " + folder.path + ")",
                                value: folder
                            })),
                        },
                    ]);

                    selectedFolder.displayTree();
                } else {
                    foundFolders[0].displayTree();
                }
                break;
            }

            case "📜 Show root folder": {
                root.displayTree();
                break;
            }

            case "❌ Exit":
                console.log(chalk.yellow("👋 Bye!"));
                process.exit();
        }

        await pause();
    }
}

async function initTestData() {
    try {
        const folder1 = new Folder("Folder 1");
        const folder2 = new Folder("Folder 2");
        const folder3 = new Folder("Folder 3");

        root.addFolder(folder1);
        folder1.addFolder(folder2);
        folder2.addFolder(folder3);

        const file1 = new File("File 1", "This is the content of File 1 in root.");
        const file2 = new File("File 2", "This is the content of File 2 in Folder 1.");
        const file3 = new File("File 3", "This is the content of File 3 in Folder 2.");
        const file4 = new File("File 4", "This is the content of File 4 in root.");
        const file5 = new File("File 5", "This is the content of File 5 in Folder 3.");

        root.addFile(file1);
        folder1.addFile(file2);
        folder2.addFile(file3);
        root.addFile(file4);
        folder3.addFile(file5);

        console.log(chalk.green("✔ Test data initialized successfully!"));
    } catch (error) {
        console.log(chalk.red("❌ Error initializing test data:", error.message));
    }
}


showMenu();