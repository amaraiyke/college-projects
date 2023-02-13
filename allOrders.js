db.customers.aggregate([
    {$lookup:{from:"orders_new", localField:"CustomerID", foreignField:"CustomerID", as:"allOrders"}},
        {$out:"CustomerOrder_Details"}])
        
        
        
db.CustomerOrder_Details.aggregate([
    {$unwind: "$allOrders"}, 
    {$project:{CustomerID:1, "allOrders.TotalPrice":1, "allOrders.OrderID": 1  }}
    ])