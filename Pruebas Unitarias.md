l> npm test

> blog_abc_retail@1.0.0 test
> jest

 PASS  __tests__/posts.test.js
 PASS  __tests__/dbConnection.test.js
  ● Console

    console.log
      Conexión exitosa a la base de datos

      at log (utils/dbConnect.js:6:13)

    console.error
      Error de conexión: MongoServerError: bad auth : Authentication failed.
          at Connection.sendCommand (C:\Users\agata\Documents\Adri\Education\BA - Tecnicatura Superior\04_Desarrollo de sistemas Web - BackEnd\Parcial2\HI5-blog-ABCRetail\node_modules\mongodb\src\cmap\connection.ts:525:17)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at Connection.command (C:\Users\agata\Documents\Adri\Education\BA - Tecnicatura Superior\04_Desarrollo de sistemas Web - BackEnd\Parcial2\HI5-blog-ABCRetail\node_modules\mongodb\src\cmap\connection.ts:597:22)
          at executeScram (C:\Users\agata\Documents\Adri\Education\BA - Tecnicatura Superior\04_Desarrollo de sistemas Web - BackEnd\Parcial2\HI5-blog-ABCRetail\node_modules\mongodb\src\cmap\auth\scram.ts:113:20)
          at ScramSHA256.auth (C:\Users\agata\Documents\Adri\Education\BA - Tecnicatura Superior\04_Desarrollo de sistemas Web - BackEnd\Parcial2\HI5-blog-ABCRetail\node_modules\mongodb\src\cmap\auth\scram.ts:60:12)
          at performInitialHandshake (C:\Users\agata\Documents\Adri\Education\BA - Tecnicatura Superior\04_Desarrollo de sistemas Web - BackEnd\Parcial2\HI5-blog-ABCRetail\node_modules\mongodb\src\cmap\connect.ts:163:7)
          at connect (C:\Users\agata\Documents\Adri\Education\BA - Tecnicatura Superior\04_Desarrollo de sistemas Web - BackEnd\Parcial2\HI5-blog-ABCRetail\node_modules\mongodb\src\cmap\connect.ts:43:5) {
        errorResponse: {
          ok: 0,
          errmsg: 'bad auth : Authentication failed.',
          code: 8000,
          codeName: 'AtlasError'
        },
        ok: 0,
        code: 8000,
        codeName: 'AtlasError',
        connectionGeneration: 0,
        [Symbol(errorLabels)]: Set(2) { 'HandshakeError', 'ResetPool' }
      }

       6 |     console.log('Conexión exitosa a la base de datos');
       7 |   } catch (error) {
    >  8 |     console.error('Error de conexión:', error);
         |             ^
       9 |     throw new Error('No se pudo conectar a la base de datos');
      10 |   }
      11 | }
      }

       6 |     console.log('Conexión exitosa a la base de datos');
       7 |   } catch (error) {
    >  8 |     console.error('Error de conexión:', error);
         |             ^
       9 |     throw new Error('No se pudo conectar a la base de datos');
      10 |   }
      11 | }
       6 |     console.log('Conexión exitosa a la base de datos');
       7 |   } catch (error) {
    >  8 |     console.error('Error de conexión:', error);
         |             ^
       9 |     throw new Error('No se pudo conectar a la base de datos');
      10 |   }
      11 | }
    >  8 |     console.error('Error de conexión:', error);
         |             ^
       9 |     throw new Error('No se pudo conectar a la base de datos');
      10 |   }
      11 | }
         |             ^
       9 |     throw new Error('No se pudo conectar a la base de datos');
      10 |   }
      11 | }
       9 |     throw new Error('No se pudo conectar a la base de datos');
      10 |   }
      11 | }

      10 |   }
      11 | }

      at error (utils/dbConnect.js:8:13)
      11 | }

      at error (utils/dbConnect.js:8:13)
      at Object.<anonymous> (__tests__/dbConnection.test.js:29:5)


      at error (utils/dbConnect.js:8:13)
      at Object.<anonymous> (__tests__/dbConnection.test.js:29:5)

 PASS  __tests__/users.test.js
      at error (utils/dbConnect.js:8:13)
      at Object.<anonymous> (__tests__/dbConnection.test.js:29:5)

 PASS  __tests__/users.test.js

      at Object.<anonymous> (__tests__/dbConnection.test.js:29:5)

 PASS  __tests__/users.test.js

 PASS  __tests__/users.test.js


Test Suites: 3 passed, 3 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        3.576 s, estimated 4 s
Ran all test suites.