const regexConfig = {
    function: "([a-zA-Z0-9_ ]+)\(([a-zA-Z0-9_,*\[\] ]*)\)([\t ]*)\{$",
    method: "(?:const\s+)?(\w+)\s+([\S]+?)\s*\((?:\s*(?:const\s+)?([\S]+?)\s+([\w\d]+?)\s*,?)*?\)\s*(?:const\s+)?",
    interface: "^public interface.*<.+>.*\{$",
    comment: "\/\*[\s\S]*?\*\/|\/\/.*",
    class: "(public\s+|private\s+)?(static\s+)?(abstract\s+)?(final\s+)?class\s+([\w_$]+)(\s*<[\w,\s]*>)?(\s+extends\s([\w\.\_\$]+))?(\s+implements\s([\w\.\_\$\,\s]+))?\s*\{"
}

module.exports = regexConfig;