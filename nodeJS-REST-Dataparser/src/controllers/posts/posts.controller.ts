import * as express from 'express'
import { Request, Response } from 'express'
import Customer from '../../model/customer'
import Result from '../../model/response'
import IPost from '../../model/post.interface'

class PostsController {
    public path = '/api'
    public router = express.Router()

    private posts: IPost[] = [
        {
            "data": "JOHN0000MICHAEL0009994567"
        }
    ]

    constructor() {
        this.router.get(this.path, this.getAllPosts)
        this.router.post(this.path + '/v1/parse', this.createPostV1)
        this.router.post(this.path + '/v2/parse', this.createPostV2)
    }



    getAllPosts = (req: Request, res: Response) => {
        //console.log("Hello get")
        res.send(this.posts)
    }



    createPostV1 = (req: Request, res: Response) => {
        const post: IPost = req.body
        this.posts.push(post)

        let person: Customer = this.getCustomerV1(post.data)
        if (person)
            res.send(new Result(200, person))
        else
            res.send(new Result(400, "Invalid input format. The length of data must be 25 chars (firstName = 8 chars, lastName = 10 chars, clientID = 7 chars)."))


    }



    createPostV2 = (req: Request, res: Response) => {
        const post: IPost = req.body
        this.posts.push(post)

        let person: Customer = this.getCustomerV2(post.data)
        if (person)
            res.send(new Result(200, person))
        else
            res.send(new Result(400, "Invalid input format. The length of data must be 25 chars (firstName = 8 chars, lastName = 10 chars, clientID = 7 chars)."))

    }



    getCustomerV1(data: string) {
        if (data.length != 25)
            return null
        return new Customer(data.substring(0, 8), data.substring(8, 18), data.substring(18))
    }

    getCustomerV2(data: string) {
        let customer = this.getCustomerV1(data);
        if (customer) {
            customer.firstName = customer.firstName.replace(/0/g, '')
            customer.lastName = customer.lastName.replace(/0/g, '')
            customer.clientId = customer.clientId.substring(0, 3) + '-' + customer.clientId.substring(3)
        }
        return customer
    }




}

export default PostsController