import {Md5} from 'ts-md5/dist/md5';

export function hashString(string) : string{
    return Md5.hashStr(string).toString();
}

