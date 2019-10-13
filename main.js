import introspectionQuery from './introspectionQuery.js'
import exampleMocksTemplate from './exampleMocksTemplate.js'
import axios from 'axios'
import fs from 'fs'

const args = process.argv.slice(2)
const endpointUrl = args[0]

async function sendIntrospectionQuery(graphqlEndpoint) {
  try {
    console.log('Sending introspection query to', graphqlEndpoint)
    const result = await axios.post(graphqlEndpoint, { query: introspectionQuery })
    return result.data
  } catch (error) {
    console.error(error)
  }
}

async function makeExecutableMockSchemaFromIntrospection() {
  const schemaResult = await sendIntrospectionQuery(endpointUrl)

  const {
    data: {
    __schema: {
        queryType, // [Object]
        mutationType, // [Object]
        subscriptionType, // [Object]
        types, // [Array],
        directives // [Array]
      }
    }
  } = schemaResult

  // Returns an array of strings of below format for debugging information
  //
  // SmartAddressSort [INPUT_OBJECT]
  // BookingListResponse [OBJECT]
  // Booking [OBJECT]
  // Location [OBJECT]
  // ListingOrderBy [ENUM]
  const schemaTypes = types.map(type => `${type.name} [${type.kind}]`)

  console.log("Found", schemaTypes.length, "schema types")
  console.log("Attempting to write to schema.json...")

  try {
    const prettySchema = JSON.stringify(schemaResult.data, null, 2)
    fs.writeFileSync("schema.json", prettySchema)
  } catch (error) {
    console.error(error)
  }

  console.log("Successfully wrote to schema.json")
  console.log("Attempting to generate default mocking example...")

  try {
    fs.writeFileSync("exampleMocks.js", exampleMocksTemplate)
  } catch (error) {
    console.error(error)
  }

  console.log("Successfully generated mocks at ./exampleMocks.js")
}

export default makeExecutableMockSchemaFromIntrospection()