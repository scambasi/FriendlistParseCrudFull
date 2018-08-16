import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SignupPage} from '../signup/signup'
import { ListPage} from '../list/list'
import { User } from '../../model/user-model';
import Parse from 'parse';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,private alertController:AlertController,
    private localstorage:Storage ) {
  }
  user:User=
  {
    name:"",
    username:"",
    email:"",
    password:""
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToSignUp()
  {
    this.navCtrl.push(SignupPage);
  }

  login()
  {
    console.log('login');
    if(this.user.password=="" || this.user.username=="")
    {
      this.alertController.create({
        title:"Hata",
        message:"Şifre veya kullanıcı adı boş!",
        buttons:['Ok']
      }).present();
      return ;
    }
    const k= Parse.Object.extend('Kullanici');
    let query = new Parse.Query(k);
    query.equalTo("kullaniciAdi",this.user.username);
    query.equalTo("sifre",this.user.password);
              query.find().then((sonuc) => {
                if(sonuc.length>0)
                {
                  
                            var object = sonuc[0];
                            this.navCtrl.push(ListPage);
                            this.localstorage.set('kullaniciId',object.get('id')).
                            then(()=>{this.navCtrl.setRoot(ListPage);});
                            console.log('Kullanıcı='+object.get('adi'));
                          
                
                }
                else{
                this.alertController.create({
                  title:"Hata",
                  message:"Kullanıcı Bulunmadı",
                  buttons:['Ok']
                }).present();
              }
              }, (error) => {
                console.log(error);
                this.alertController.create({
                  title:"Hata",
                  message:error,
                  buttons:['Ok']
                }).present();
              });


    // query.get("XtsA7mquIQ").then(
    //   function(results) {
    //     console.log("Successfully retrieved");
    //     console.log(results);
    //   },
    //   function(error) {
    //     console.log("Error: " + error.code + " " + error.message);
    //   }
    // ); 
  }
}
