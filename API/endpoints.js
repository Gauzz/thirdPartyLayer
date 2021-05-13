const RESTMethod = {
    GET: "GET",
    POST: "POST"
};

const CORE = {

    file: {
        get: '/file/get',
        create: '/file/create',
        list: '/file/list',
        update: '/file/update',
        updateOne: '/file/updateOne',
        count: '/file/count'
    }
}
module.exports = {
    RESTMethod, CORE
}

