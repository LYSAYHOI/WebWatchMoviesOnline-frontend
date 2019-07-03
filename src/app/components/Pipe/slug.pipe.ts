import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'slug'
})
export class SlugPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        // Chuyển hết sang chữ thường
        value = value.toLowerCase();

        // xóa dấu
        value = value.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        value = value.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        value = value.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        value = value.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        value = value.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        value = value.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        value = value.replace(/(đ)/g, 'd');

        // Xóa ký tự đặc biệt
        value = value.replace(/([^0-9a-z-\s])/g, '');

        // Xóa khoảng trắng thay bằng ký tự -
        value = value.replace(/(\s+)/g, '-');

        // xóa phần dự - ở đầu
        value = value.replace(/^-+/g, '');

        // xóa phần dư - ở cuối
        value = value.replace(/-+$/g, '');

        // return
        return value;
    }

}
