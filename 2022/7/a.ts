import { readInputFile } from "../utils";

const testInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

// const input = testInput;
const input = readInputFile(7);

const commands = input.split("$ ").filter(Boolean);

type Directory = {
  files: Record<string, number>;
  directories: Record<string, Directory>;
};

const changeDirectory = (currentPath: string, path: string): string => {
  switch (path) {
    case "/":
      return "/";

    case "..":
      return currentPath.split("/").slice(0, -1).join("/");

    default: {
      const paths = currentPath.split("/");
      paths.push(path);
      return paths.join("/");
    }
  }
};

const openPath = (directory: Directory, path: string): Directory => {
  const parts = path.split("/");
  let cwd = directory;

  parts.forEach(part => {
    if (part) {
      cwd = cwd.directories[part];
    }
  });

  return cwd;
};

const parseCommands = (commands: Array<string>): Directory => {
  const rootDirectory: Directory = { files: {}, directories: {} };
  let currentDirectory: string = "";

  commands.forEach(commandAndOutput => {
    const [command, ...outputs] = commandAndOutput.split("\n").filter(Boolean);
    const [commandName, input] = command.split(" ");

    switch (commandName) {
      case "ls": {
        const cwd = openPath(rootDirectory, currentDirectory);
        outputs.forEach(output => {
          const isDir = output.startsWith("dir");
          if (isDir) {
            const [, dirName] = output.split(" ");
            // TODO: Check if dir exists
            cwd.directories[dirName] ??= { files: {}, directories: {} };
          } else {
            const [fileSize, fileName] = output.split(" ");
            cwd.files[fileName] ??= parseInt(fileSize, 10);
          }
        });
        break;
      }

      case "cd": {
        currentDirectory = changeDirectory(currentDirectory, input);
        break;
      }
    }
  });

  return rootDirectory;
};

const dirsWithLessThan100kB: Array<number> = [];

const getAllFileSizesFromDirectory = (directory: Directory): Array<number> => {
  const fileSizes: Array<number> = [];

  fileSizes.push(...Object.values(directory.files));

  Object.values(directory.directories).forEach(d => {
    fileSizes.push(...getAllFileSizesFromDirectory(d));
  });

  const dirSize = fileSizes.reduce((acc, size) => acc + size, 0);
  if (dirSize <= 100_000) {
    dirsWithLessThan100kB.push(dirSize);
  }

  return fileSizes;
};

const rootDirectory = parseCommands(commands);
getAllFileSizesFromDirectory(rootDirectory);
console.log(dirsWithLessThan100kB.reduce((acc, size) => acc + size, 0));
