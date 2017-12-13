class SolutionBuilder
{
    constructor(path, config)
    {
        this.path = path;
        this.config = config;

        // Compiler flags
        this.cflags = _generateCFlags();
        // Linker flags
        this.lflags = _generateLFlags();
    }
    buildSources() {}
    linkObjects() {}
    // Private
    _generateCFlags()
    {
        
    }
    _generateLFlags()
    {

    }
}
