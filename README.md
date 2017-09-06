# fcc-tests-generator

Basic script to generate tests for jasmine.

I'm using it to generate the tests for exercises I'm doing in Free code camp.

This script does not checking, so it is brittle.

The script will accepts a list of JSON files and will produce a spec file for each JSON file given.

The configuration file must have the following structure:

````
{
  "code-file":"intermediate/boo-who.js",
  "test-folder":"intermediate-tests",
  "function-under-test":"booWho",
  "test-descriptions": [
    "booWho(true) should return true.",
    "booWho(false) should return true.",
  ]
}
````

and it assumes:
  *  `code-file` will give you the file under test from the place were the test is run, as the property is used to define the
`require` statement in the form: `<function-under-test> = require (<code-file>).<function-under-test>`. 
  * `test-folder` is the place where the spec files will be created. The spec file name is generated from the `code-file`
   by adding `-spec` at the end.
  * `function-under-test` the script assumes this name is exported from the code file and it is the name of the variable
   used to call the code to run the test against.
  *  `test-descriptions` is an array with all teh tests to be generated, the script depends on the sentence format to be
  `<function as to be called> should return <expected value>.`, where the spaces and the final period are expected.
  
  
  
# Licence

MIT License
