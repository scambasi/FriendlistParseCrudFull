import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import {User} from '../../model/user-model';
import Parse from 'parse';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  user:User=
  {
    name:"",
    username:"",
    email:"",
    password:""
  };
  confirmPassword:string;
  url:string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertController:AlertController,private toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  goToLogin()
  {
    this.navCtrl.pop();
  }
  signup()
  {
    if(this.confirmPassword!=this.user.password)
    {
      this.alertController.create({
        title:"Hata",
        message:"şifreler uyuşmuyor kontrol ediniz!",
        buttons:['Ok']
      }).present();
      return ;
    }
    // this.url="";
    // this.http.post(this.url,this.user,{headers:this.headers}).map(res=>res.toString())
    // .subscribe(res=>{console.log(res)},err=>{console.log(err)});
  //   Parse.User.signUp(this.user.username, this.user.password).then((resp) => {
  //     console.log('Logged in successfully', resp);

  //     // Clears up the form
  //     this.user.username = '';
  //     this.user.password = '';

  //     this.toastCtrl.create({
  //       message: 'Account created successfully',
  //       duration: 2000
  //     }).present();
  //   }, err => {
  //     console.log('Error signing in', err);

  //     this.toastCtrl.create({
  //       message: err.message,
  //       duration: 2000
  //     }).present();
  //   });
  const Kullanici = Parse.Object.extend('Kullanici');
  let kullanici = new Kullanici();
  kullanici.set('adi',this.user.name);
  kullanici.set('kullaniciAdi',this.user.username);
  kullanici.set('email',this.user.email);
  kullanici.set('sifre',this.user.password);
  kullanici.save(null, {
  success: function (kullanicim) {
    console.log('Kullanici Eklendi'+kullanicim);
    this.alertController.create(
      {
        title:"Başarılı",
        message:"Tebrikler .Kayıt oldunuz.Lütfen Giriş yapınız! ",
        buttons:[{text:'Giriş',handler:()=>{this.navCtrl.pop()}}]
      }
    ).present();
  },
  error: function (kullanicim, error) {
    console.log(error);
    this.alertController.
    create(
      {title:"HATA",message:error.text(), 
      buttons:[{text:'OK'}]}).present();
  }
});
  }
}
