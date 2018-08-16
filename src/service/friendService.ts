import { Injectable } from "@angular/core";
import { Friend } from "../model/friend";
import Parse from 'parse';
import { DateTime } from "ionic-angular";

@Injectable()
export class FriendService
{
    friends:Friend[]=[];
    friend:Friend;
    addFriend(adi:string,email:string,ceptelefon:string,image:string)
    {
        console.log('FriendService:addFriend');

        const Friend = Parse.Object.extend('Friend');
        let friend = new Friend();
        friend.set('adi',adi);
        friend.set('email',email);
        friend.set('ceptelefon',ceptelefon);
        friend.set('image',image);
        friend.save(null, {
        success: function (f) {
            return true;         
        },
        error: function (error) {
            console.log(error);
            return false;
        }
        });
    }
    public getFriends()
    {
        this.friends=[];
        console.log('FriendService:getFriends');
        const Friends= Parse.Object.extend('Friend');
        let query = new Parse.Query(Friends);
        query.find().then((sonuc) => {
          
            for (var i = 0; i < sonuc.length; i++) {
                console.log('Friends Sayısı='+sonuc.length)
                        var object = sonuc[i];
                       this.friends.push(new Friend(object.id,object.get('adi'),
                       object.get('email'),object.get('ceptelefon')));
                       }
                       console.log(this.friends);
                       return this.friends;
          }, (error) => {
              return error;
          });
        console.log(this.friends);
        return this.friends;

    }
    updateFriend(id:string,adi:string,email:string,
        ceptelefonu:string)
    {
        console.log('FriendService:updateFriend');
         const Friends= Parse.Object.extend('Friend');
         let query = new Parse.Query(Friends);
        query.get(id).then(
            function(obj) {
                console.log("Update GET"+obj.get('adi'));
                let friend =obj;
                friend.set('adi',adi);
                friend.set('email',email);
                friend.set('ceptelefon',ceptelefonu);
                friend.save().then(
                    function(obj){
                        console.log("updated SAVE"+obj.get('adi')); 
                    },
                    function(error){
                        console.log(error);
                    }

                );
            },
            function(error)
            {
                console.log("*****"+error);
            }
        );
    
            
    }
          
          
    deleteFriend(id:number)
    {
        console.log('FriendService:deleteFriend');
        console.log('FriendService:updateFriend');
        const Friends= Parse.Object.extend('Friend');
        let query = new Parse.Query(Friends);
        query.get(id).then(
           function(obj) {
               console.log("Delete GET"+obj.get('adi'));
               let friend =obj;
               friend.destroy().then(
                   function(obj){
                       console.log("DELETED SAVE"+obj.get('adi')); 
                   },
                   function(error){
                       console.log(error);
                   }

               );
           },
           function(error)
           {
               console.log("*****"+error);
           }
       );
    }

}