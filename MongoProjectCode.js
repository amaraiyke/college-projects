db.orders_new.find({}).forEach(function(doc) {
		var total = 0;
		for (i = 0; i < doc.order_details_doc.length; i++)
			{total += doc.order_details_doc[i].extendedPrice};
		total += doc.Freight;
		db.orders_new.updateOne(
                {_id: doc._id},  
                 {$set:{"TotalPrice": total}}
                );
		})

db.orders_new.aggregate([
    {$lookup:{from:"customers", localField:"CustomerID", foreignField:"CustomerID", as:"orders_country"}},
        {$out:"cus_orders"}])

