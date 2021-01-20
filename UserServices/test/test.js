import { getUser, getAllUser, postUser } from '../functions/index';
import { Connection } from '../../Connection/connection';

const connection = Connection.connect();
connection.end();
