module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            fullName: String,
            email: String,
            phone: String,
            class: String,
            answer: String,
            message: String
        },
        { timestamps: true }
    )
    schema.method("toJSON", function () {
        const { _v, _id, ...object } = this.toOject();
        object.id = _id;
        return object;
    })
    const CTV = mongoose.model("CTV", schema);
    return CTV;
};