/**
 * 数据库操作：CRUD
 * 1. 增
 * 2. 删
 * 3. 改
 * 4. 查
 * 
 * 5. 连接
 * 6. 关闭
 */
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const database_url = 'mongodb://localhost:27017';

const database_name = 'BMS';

async function connect() {
    let client = await MongoClient.connect(database_url);
    let db = client.db(database_name);
    return {db,client}
}

exports.insert = async (colName,data)=>{
    let {db,client} = await connect();

    let collection = db.collection(colName);
    let res = await collection[Array.isArray(data)?'insertMany':'insertOne'](data);

    client.close();
    // console.log(res);
    return res;
    
}

exports.delete = async (colName,query)=>{

    let {db,client} = await connect();

    let collection = db.collection(colName);
    let res = await collection['deleteMany'](query);

    client.close();

    return res;
}

exports.update = async (colName,query,newData)=>{

    let {db,client} = await connect();

    let collection = db.collection(colName);
    let res = await collection['updateMany'](query,{$set : newData});
    // db.user.updateMany( { age: { $gt : 18 } } , { $set : { description : "成年"} } );

    client.close();

    return res;
}

exports.find = async (colName,query)=>{

    let {db,client} = await connect();

    let collection = db.collection(colName);
    let res = await collection.find(query).toArray();
    client.close();

    // 返回查询结果
    return res;
}

// insert('user',{name:'laoxie'});