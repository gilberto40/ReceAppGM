let nextId = 0

class User {    
    constructor(data){
        this.name = data.name
        this.lastname = data.lastname
        this.email = data.email
        this.password = data.password
        this.inventory = data.inventory //de stockitems
        this.id = nextId++   
    }
}

export default User