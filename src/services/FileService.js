const fs = require('fs').promises;

class FileService {

    static async readFile(path) {
        try {
            const data = await fs.readFile(path, "utf-8");
            
            if(data.length == 0) {
                return [];
            }

            return JSON.parse(data);
        }
        catch (error) {
            throw ("Error when trying to read from database.");
        }
    }
    
    static async writeFile(path, data) {
        try {
            await fs.writeFile(path, JSON.stringify(data, null, 2), "utf8");
        }
        catch(error) {
            throw ("Error when trying to write on database.");
        }
    }

    static async fileExists(path) {
        try {
            await fs.access(path, fs.constants.F_OK);
            return true;
        }
        catch (error) {
            return false;
        }
    }
}

module.exports = FileService;