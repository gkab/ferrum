module.exports = {
    AbstractMethodCall: function AbstractMethodCall()
    {
        throw new Error("Abstract method call");
    }
    NotImplementedMethodCall: function NotImplementedMethodCall()
    {
        throw new Error("Not implemented method call");
    }
}
