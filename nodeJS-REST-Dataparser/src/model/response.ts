import Customer from "./customer";
import IPerson from "./customer";

class Result {

    constructor(stat, person) {
        this.statusCode = stat;
        this.data = person;
    }

    statusCode: number
    data: Customer
}

export default Result