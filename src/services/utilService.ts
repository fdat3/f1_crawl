import * as Ajv from 'ajv'
// @ts-ignore
import * as AjvError from 'ajv-errors'
import * as AjvKeyWords from 'ajv-keywords'
import * as _ from 'lodash'
export class UtilService {
    validateJSON(schema: any, json: any = {}) {
        const ajv = new Ajv({ allErrors: true, jsonPointers: true });
        AjvError(ajv, { singleError: true })
        AjvKeyWords(ajv, ['switch'])
        const valid = ajv.validate(schema, json);
        return {
            isValid: valid,
            message: ajv.errorsText()
        }
    }
    async parseMessengeWithInfo(params: {
        message: string,
        info: any
    }) {
        let { message } = params
        const { info } = params
        const regex = /({|})/g
        const regex2 = /({{\w+}})|({{\w+(?:\.\w+)+)}}/g
        if (regex.test(message)) {
            const replaceText = message.match(regex2)
            for (let item of replaceText) {
                item = item.replace(regex, '');
                message = message.replace(item, _.get(info, item));
            }
            message = message.replace(regex, '')
        }
        return message
    }
    async encode(data: any) {
        const arr = this.encodeObject(data)
        return arr.join(':')
    }
    encodeObject(data: any): any[] {
        const arr = [];
        const keys = Object.keys(data)
        for (const key of keys) {
            let str;
            let arrobj = [];
            if (typeof (data[key]) == 'object') {
                arrobj = this.encodeObject(data[key]);
                for (const element of arrobj) {
                    str = key + '.' + element;
                    arr.push(str);
                }
            }
            else {
                str = key + '=' + data[key];
                arr.push(str);
            }
        }
        return arr;
    }
    async decode(data: any) {
        const arr1 = [];
        const arr2 = [];
        const arr = data.split(':');
        const arrElement = [];
        for (let item of arr) {
            if (/(\.\d\.)/g.test(item)) {
                let num = item.match(/(\.\d\.)/g).join();
                num = num.replace(/\./g, '');
                item = item.replace(/(\.\d)/g, '[' + num + ']')
            }
            else if (/(\.\d)/g.test(item)) {
                let num = item.match(/(\.\d)/g).join();
                num = num.replace(/\./g, '');
                item = item.replace(/(\.\d)/g, '[' + num + ']')
            }
            const element = item.split('=');
            arr1.push(element[0]);
            arr2.push(element[1]);
        }
        arrElement.push(arr1);
        arrElement.push(arr2);
        return arrElement;
    }

    convertViToEng(string: string) {
        const obj = {
            Đ: 'D', đ: 'd', â: 'a',
            ă: 'a', ê: 'e', ô: 'o', ơ: 'o',
            ư: 'u',
            á: 'a', à: 'a', ạ: 'a', ả: 'a', ã: 'a',
            ắ: 'a', ằ: 'a', ặ: 'a', ẳ: 'a', ẵ: 'a',
            ấ: 'a', ầ: 'a', ậ: 'a', ẩ: 'a', ẫ: 'a',
            é: 'e', è: 'e', ẻ: 'e', ẽ: 'e', ẹ: 'e',
            ế: 'e', ề: 'e', ể: 'e', ễ: 'e', ệ: 'e',
            ý: 'y', ỳ: 'y', ỵ: 'y', ỷ: 'y', ỹ: 'y',
            ú: 'u', ù: 'u', ủ: 'u', ũ: 'u', ụ: 'u',
            ứ: 'u', ừ: 'u', ử: 'u', ữ: 'u', ự: 'u',
            í: 'i', ì: 'i', ị: 'i', ỉ: 'i', ĩ: 'i',
            ó: 'o', ò: 'o', ỏ: 'o', õ: 'o', ọ: 'o',
            ố: 'o', ồ: 'o', ổ: 'o', ỗ: 'o', ộ: 'o',
            ớ: 'o', ờ: 'o', ở: 'o', ỡ: 'o', ợ: 'o'
        } as any;

        string = string.trim();
        string = string.toLowerCase();

        const arr = string.split('');

        for (const i in arr) {
            if (obj[arr[i]]) {
                arr[i] = obj[arr[i]];
            }
        }

        return arr.join('');
    }

    changeToSlug(title: string, prefix: string) {
        // Đổi chữ hoa thành chữ thường
        let slug = title.toLowerCase();

        // Đổi ký tự có dấu thành không dấu
        slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
        slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
        slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
        slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
        slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
        slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
        slug = slug.replace(/đ/gi, 'd');
        // Xóa các ký tự đặt biệt
        slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
        // Đổi khoảng trắng thành ký tự gạch ngang
        slug = slug.replace(/ /gi, "-");
        // Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
        // Phòng trường hợp người nhập vào quá nhiều ký tự trắng
        slug = slug.replace(/\-\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-/gi, '-');
        slug = slug.replace(/\-\-/gi, '-');
        // Xóa các ký tự gạch ngang ở đầu và cuối
        slug = '@' + slug + '@';
        slug = slug.replace(/\@\-|\-\@|\@/gi, '');
        return `${slug}-${prefix}`
    }


    convertViToEngSlug(string: string) {
        const obj = {
            Đ: 'D', đ: 'd', â: 'a',
            ă: 'a', ê: 'e', ô: 'o', ơ: 'o',
            ư: 'u',
            á: 'a', à: 'a', ạ: 'a', ả: 'a', ã: 'a',
            ắ: 'a', ằ: 'a', ặ: 'a', ẳ: 'a', ẵ: 'a',
            ấ: 'a', ầ: 'a', ậ: 'a', ẩ: 'a', ẫ: 'a',
            é: 'e', è: 'e', ẻ: 'e', ẽ: 'e', ẹ: 'e',
            ế: 'e', ề: 'e', ể: 'e', ễ: 'e', ệ: 'e',
            ý: 'y', ỳ: 'y', ỵ: 'y', ỷ: 'y', ỹ: 'y',
            ú: 'u', ù: 'u', ủ: 'u', ũ: 'u', ụ: 'u',
            ứ: 'u', ừ: 'u', ử: 'u', ữ: 'u', ự: 'u',
            í: 'i', ì: 'i', ị: 'i', ỉ: 'i', ĩ: 'i',
            ó: 'o', ò: 'o', ỏ: 'o', õ: 'o', ọ: 'o',
            ố: 'o', ồ: 'o', ổ: 'o', ỗ: 'o', ộ: 'o',
            ớ: 'o', ờ: 'o', ở: 'o', ỡ: 'o', ợ: 'o'
        } as any;

        string = string.trim();
        string = string.toLowerCase();

        const arr = string.split('');

        for (const i in arr) {
            if (obj[arr[i]]) {
                arr[i] = obj[arr[i]];
            }
        }

        let slug = arr.join('');
        slug = slug.replace(/ /g, '-');
        // slug = slug.replace(/[^a-zA-Z0-9]/g, '');
        return slug.replace(/[^a-zA-Z0-9\-]/g, '');
    }
}
