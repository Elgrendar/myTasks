export class User {
  public id_user: number;
  public user_name: string;
  public user_pass: string;
  public user_email: string;
  public user_image: string;
  private users = new Array<User>();

  constructor(
    user_name: string,
    user_pass: string,
    user_email: string,
    user_image?: string
  ) {
    this.user_pass = user_pass;
    this.user_email = user_email;
    this.user_name = user_name;
    this.user_image = user_image !== undefined ? user_image : 'default.svg';
    this.users = JSON.parse(window.localStorage.getItem('users') || '{}');
    //Le asignamos el id del último elemento del array + 1
    //a no ser que sea el primero que añadimos que entonces le asignamos
    this.id_user = this.users.length;
  }
}
