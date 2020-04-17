'use strict';

import { MyServer } from './dummy_server';

//const theDatabase = new Database('syoung20'); // CHANGE THIS
const theServer = new MyServer();

theServer.server.listen(8080);
