const ProductSchema = require('../model/productSchema');
const create = (req, resp)=>{
    const product = new ProductSchema({
        productName: req.body.productName,
        description: req.body.description,
        image: req.body.image,
        unitPrice:req.body.unitPrice,
        qtyOnHand:req.body.qtyOnHand
    })
    product.save().then(result => {
        return resp.status(201).json({status: true, message: 'product was saved!'});
    }).catch(error => {
        return resp.status(500).json(error);
    })
}

const findById = (req, resp)=>{
    ProductSchema.findOne({'_id': req.params.id}).then(result => {
        if (result == null) {
            return resp.status(404).json({status: false, message: 'product was not found!'});
        } else {
            return resp.status(200).json(result);
        }
    }).catch(error => {
        return resp.status(404).json(error);
    })
}

const findAll = (req, resp)=>{
    try {
        const {searchText, page = 1, size = 10} = req.query;

        const pageNumber = parseInt(page);
        const pageSize = parseInt(size);

        const query = {};
        if (searchText) {
            query.$text = {$search: searchText}
        }

        const skip = (pageNumber - 1) * pageSize;

        ProductSchema.find(query).limit(pageSize).skip(skip).then(
            response=>{return resp.status(200).json(response);}
        )


    } catch (e) {
        return resp.status(500).json(e);
    }
}

const deleteById = async (req, resp)=>{
    const deletedData = await ProductSchema.findByIdAndDelete({'_id': req.params.id});

    if (deletedData) {
        return resp.status(204).json({status: true, message: 'product was deleted!'});
    } else {
        return resp.status(500).json({message: 'internal server error!'});
    }
}

const update = async (req, resp)=>{
    const updateData = await ProductSchema.findOneAndUpdate({_id: req.params.id},
        {
            $set: {
                productName: req.body.productName,
                description: req.body.description,
                image: req.body.image,
                unitPrice:req.body.unitPrice,
                qtyOnHand:req.body.qtyOnHand
            }
        }, {new: true});

    if (updateData) {
        return resp.status(200).json({status: true, message: 'product was updated!'});
    } else {
        return resp.status(500).json({message: 'internal server error!'});
    }
}

module.exports = {
    create,
    findById,
    findAll,
    deleteById,
    update
}