class AppError {
    constructor(msg){
        this.message=msg
        this.status="error"
    }
}

module.exports=AppError