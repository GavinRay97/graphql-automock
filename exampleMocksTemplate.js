export default `
import { addMockFunctionsToSchema } from 'graphql-tools'
import { graphql, buildClientSchema} from 'graphql'
import introspectionResult from './schema.json'

// Need to pass the value of data key here
const schema = buildClientSchema(introspectionResult)

// Add mocks, modifies schema in place
addMockFunctionsToSchema({ schema })

// Replace with real query using your GraphQL data types
const query = '...'

// Lets go ahead and test it!
graphql(schema, query).then((result) => console.log('Got result', result))
`