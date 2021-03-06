const { toLowCamelCase, requiresToString } = require('./utils')

let entities = [
    {
        name: "User",
        fields: `nickname: field(String),
            password: field(String)`
    }
]
module.exports = async ({ generate, options } ) => async () => {
    if (options.entities){
        // TODO: BUILD CUSTOM ENTITIES
    }
    const requires = {}
    await Promise.all(entities.map(async entity => {
        const nameInCC = toLowCamelCase(entity.name)
        
        await generate({
            template: `entities/${nameInCC}.ejs`,
            target: `src/domain/entities/${nameInCC}.js`,
            props: entity
        })
        requires[entity.name] = `require('./${nameInCC}.js')` 
    }))

    await generate({
        template: 'entities/index.ejs',
        target: `src/domain/entities/index.js`,
        props: { requires: requiresToString(requires) }
    })
}
