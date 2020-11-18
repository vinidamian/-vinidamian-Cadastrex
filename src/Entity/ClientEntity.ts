export class ClientEntity {
  id: number;
  name: string;
  gender: number;
  cpf: number;
  phone: number;
  email: string;
  picture: string | ArrayBuffer;
  msg: string;

  selectFile(event): void {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      this.msg = 'You must select an image';
      return;
    }

    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = ($event) => {
      this.msg = '';
      this.picture = reader.result;
    };
  }

}
