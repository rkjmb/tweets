import util from 'util';
import request from 'request';

const get = util.promisify(request.get);

export { get }