class MongoDbService {
    
    // Public Methods

    static async getAll(model) {
        try {
            const items = await model.find().lean();

            if(items.length === 0) {
                return [];
            }

            if(!items) {
                return null;
            }

            return items;
        }
        catch(error) {
            throw(error);
        }
    }

    static async getById(model, id) {
        try {

            const item = await model.findById(id).lean();

            if(!item) {
                return null;
            }

            return item;
        }
        catch(error) {
            throw(error);
        }
    }

    static async createOne(model, item = []) {
        try {
            const newItem = new model({
                ...item
            });

            const savedItem = await newItem.save();

            if(!savedItem) {
                return null;
            }

            return savedItem;
        }
        catch(error) {
            throw(error);
        }
    }

    static async updateById(model, item, id) {
        try {
            const updatedItem = await model.findByIdAndUpdate(id, item, {new: true});

            if(!updatedItem) {
                return null;
            }

            return updatedItem;
        }
        catch(error) {
            throw(error);
        }
    }

    static async deleteById(model, id) {
        try {
            const item = await model.findByIdAndDelete(id);

            if(!item) {
                return null;
            }

            return item;
        }
        catch(error) {
            throw(error);
        }
    }

    static async deleteAll(model) {
        try {
            const result = await model.deleteMany();

            if(result.deletedCount == 0) {
                throw("There are no items to delete in the collection");
            }

            return true;
        }
        catch(error) {
            throw(error);
        }
    }

    static async aggregate(model, options) {
        try {

            const pipeline = [];

            if(options.query) {
                pipeline.push({$match: options.query});
            }

            if(options.sort) {
                pipeline.push({$sort: options.sort});
            }

            if(options.page && options.limit) {
                const skip = (options.page - 1) * options.limit;
                pipeline.push({$skip: skip});
            }

            if(options.limit) {
                pipeline.push({$limit: options.limit});
            }

            return await model.aggregate(pipeline);
        }
        catch(error) {
            throw(error);
        }
    }

    static async getWithPaginate(model, query, options) {
        try {
            return await model.paginate(query, {...options, lean: true });
        }
        catch(error) {
            throw error;
        }
    }
}

module.exports = MongoDbService;