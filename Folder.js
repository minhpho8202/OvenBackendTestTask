import File from "./File.js";
import chalk from "chalk";

class Folder {
    constructor(name, path = "") {
        this.name = name;
        this.path = path;
        this.files = [];
        this.folders = [];
    }

    addFile(file) {
        if (!file.name) {
            throw new Error(`File name can not be empty`);
        }
        if (this.files.some(f => f.name === file.name)) {
            throw new Error(`File "${file.name}" is existed!`);
        }
        file.path = this.path + "/" + file.name;
        this.files.push(file);
    }

    addFolder(folder) {
        if (!folder.name) {
            throw new Error(`Folder name can not be empty`);
        }
        if (this.folders.some(f => f.name === folder.name)) {
            throw new Error(`Folder "${folder.name}" is existed!`);
        }
        folder.path = this.path + "/" + folder.name;
        this.folders.push(folder);
    }

    removeFile(path) {
        const fileIndex = this.files.findIndex(file => file.path === path);
        if (fileIndex !== -1) {
            this.files.splice(fileIndex, 1);
            return true;
        }

        for (const folder of this.folders) {
            if (folder.removeFile(path)) {
                return true;
            }
        }

        return false;
    }

    removeFolder(path) {
        const folderIndex = this.folders.findIndex(folder => folder.path === path);
        if (folderIndex !== -1) {
            this.folders.splice(folderIndex, 1);
            return true;
        }

        for (const folder of this.folders) {
            if (folder.removeFolder(path)) {
                return true;
            }
        }

        return false;
    }


    searchFile(fileName) {
        let results = [];

        for (const file of this.files) {
            if (file.name === fileName) {
                results.push(file);
            }
        }

        for (const folder of this.folders) {
            results = results.concat(folder.searchFile(fileName));
        }

        return results;
    }


    searchFolder(folderName) {
        let results = [];

        for (const folder of this.folders) {
            if (folder.name === folderName) {
                results.push(folder);
            }
            results = results.concat(folder.searchFolder(folderName));
        }

        return results;
    }

    displayTree(indent = 0) {
        console.log(`${" ".repeat(indent)}📁 ${chalk.blue(this.name)}`);
        for (const file of this.files) {
            console.log(`${" ".repeat(indent + 2)}📄 ${chalk.green(file.name)}`);
        }
        for (const folder of this.folders) {
            folder.displayTree(indent + 2);
        }
    }
}

export default Folder;
