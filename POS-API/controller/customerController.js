const CustomerSchema = require('../model/customerSchema');
const create = (req, resp) => {
    const customer = new CustomerSchema({
        name: req.body.name,
        address: req.body.address,
        salary: req.body.salary
    })
    customer.save().then(result => {
        return resp.status(201).json({status: true, message: 'customer was saved!'});
    }).catch(error => {
        return resp.status(500).json(error);
    })
}

const findById = (req, resp) => {
    CustomerSchema.findOne({_id: req.params.id}).then(result => {
        if (result == null) {
            return resp.status(404).json({status: false, message: 'customer was not found!'});
        } else {
            return resp.status(200).json(result);
        }
    }).catch(error => {
        return resp.status(404).json(error);
    })
}

const findAll = (req, resp) => {

    try {
        const {searchText, page = 1, size = 10} = req.query;

        const pageNumber = parseInt(page);
        const pageSize = parseInt(size);

        const query = {};
        if (searchText) {
            query.$text = {$search: searchText}
        }

        const skip = (pageNumber - 1) * pageSize;

        CustomerSchema.find(query).limit(pageSize).skip(skip).then(
            response=>{return resp.status(200).json(response);}
        )


    } catch (e) {
        return resp.status(500).json(e);
    }

}


const findAllCount = (req, resp)=>{
    try{

        CustomerSchema.countDocuments().then(response=>{
            return resp.status(200).json(response);
        })


    }catch (error){
        return resp.status(500).json({message: 'internal server error!'});
    }
}

const deleteById = async (req, resp) => {
    const deletedData = await CustomerSchema.findByIdAndDelete({'_id': req.params.id});

    if (deletedData) {
        return resp.status(204).json({status: true, message: 'customer was deleted!'});
    } else {
        return resp.status(500).json({message: 'internal server error!'});
    }
}

const update = async (req, resp) => {
    const updateData = await CustomerSchema.findOneAndUpdate({_id: req.params.id},
        {
            $set: {
                name: req.body.name,
                address: req.body.address,
                salary: req.body.salary
            }
        }, {new: true});

    if (updateData) {
        return resp.status(200).json({status: true, message: 'customer was updated!'});
    } else {
        return resp.status(500).json({message: 'internal server error!'});
    }

}

module.exports = {
    create,
    findById,
    findAll,
    deleteById,
    update,
    findAllCount
}