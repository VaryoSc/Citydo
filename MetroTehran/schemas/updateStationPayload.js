module.exports = {
  type: 'object',
  properties:  {
  stationCode: {
    type: 'string',
},
lineNumber: { 
  type: 'string'
},
stationName: { 
  type: 'string'
},
baseTime1: {
    type: 'string',
},
baseTime2: {
    type: 'string',
},
isMultiline:{
    type: 'string',
},
  additionalProperties: false
}
};