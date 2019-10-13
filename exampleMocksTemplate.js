export default `
import { addMockFunctionsToSchema } from 'graphql-tools'
import { graphql, buildClientSchema} from 'graphql'
import * as rawSchema from './schema.json'

// Parse introspection query results JSON
const introspectionResult = JSON.parse(rawSchema)

// Need to pass the value of data key here
const schema = buildClientSchema(introspectionResult.data)

// Add mocks, modifies schema in place
addMockFunctionsToSchema({ schema })

// Replace with real query using your GraphQL data types
const query = '...'

// Lets go ahead and test it!
graphql(schema, query).then((result) => console.log('Got result', result))
`