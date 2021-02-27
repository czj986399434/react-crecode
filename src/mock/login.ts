import Mock from 'mockjs'
const Random=Mock.Random
export default Mock.mock('/login','get',{
    loginUser:{
        'user_id':1,
        'username':'@cname',
        'nickname':'@cname',
        'autograph':Random.string,
        'head_portrait':Random.image,
        'type|1':['admin','common'],
        'blog_count':Random.integer,
        'diary_count':Random.integer
    }
})