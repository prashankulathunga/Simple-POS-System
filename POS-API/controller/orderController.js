const OrderSchema = require('../model/orderSchema');
const create = (req, resp) => {
    const order = new OrderSchema({
        date: req.body.date,
        customerDetails: req.body.customerDetails,
        totalCost: req.body.totalCost,
        products: req.body.products
    })
    order.save().then(result => {
        return resp.status(201).json({status: true, message: 'order was saved!'});
    }).catch(error => {
        return resp.status(500).json(error);
    })
}

const findById = (req, resp) => {
    OrderSchema.findOne({_id: req.params.id}).then(result => {
        if (result == null) {
            return resp.status(404).json({status: false, message: 'order was not found!'});
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

        const data = OrderSchema.find(query).limit(pageSize).skip(skip);
        return resp.status.json(data);


    } catch (e) {
        return resp.status(500).json(e);
    }
}

const deleteById = async (req, resp) => {
    const deletedData = await OrderSchema.findByIdAndDelete({_id: req.param.id});

    if (deletedData) {
        return resp.status(204).json({status: true, message: 'order was deleted!'});
    } else {
        return resp.status(500).json({message: 'internal server error!'});
    }
}

const update = async (req, resp) => {
    const updateData = await OrderSchema.findOneAndUpdate({_id: req.params.id},
        {
            $set: {
                date: req.body.date,
                customerDetails: req.body.customerDetails,
                totalCost: req.body.totalCost,
                products: req.body.products
            }
        }, {new: true});

    if (updateData) {
        return resp.status(200).json({status: true, message: 'order was updated!'});
    } else {
        return resp.status(500).json({message: 'internal server error!'});
    }
}

const findAllCount = (req, resp) => {
    try {

        OrderSchema.countDocuments().then(response => {
            return resp.status(200).json(response);
        })

    } catch (error) {
        return resp.status(500).json({message: 'internal server error!'});
    }
}
const findAllIncome = (req, resp) => {
    try {

        const result = OrderSchema.aggregate([
            {
                $group: {
                    _id: null,
                    totalCostSum: {$sum: '$$totalCost'}
                }
            }
        ]);
        console.log(result);
        const totalSum = result.length > 0 ? result[0] : 0;
        resp.json(totalSum);

    } catch (error) {
        return resp.status(500).json({message: 'internal server error!'});
    }
}

module.exports = {
    create,
    findById,
    findAll,
    deleteById,
    update,
    findAllCount,
    findAllIncome
}