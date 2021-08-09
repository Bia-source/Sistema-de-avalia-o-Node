import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm"
import { User } from "../entities/User";
import { UserRepositories } from "../repositories/UserRepositories"

interface IRequestSearch{
    searchUser: {
        type:string;
        value:string;
    }
}

class UserSearchService{
   async execute(searchUser:string,admin:boolean){
     const userRepository = getCustomRepository(UserRepositories);
     let user;
     if(!user){
        user = await userRepository.findOne({
         where: {
         id:searchUser
        }
        });         
     }
     if(!user){
        user = await userRepository.findOne({
          where: {
          email:searchUser
        }
        });   
     }  
     if(!user){
        user = await userRepository.findOne({
          where: {
          name:searchUser
        }
        });   
     };
     return classToPlain(mapResponseUser(user,admin));
   }
}

 async function mapResponseUser(user:User, admin:boolean){
   if(admin === true){
      return user;
   }
   const userMap = await {
        id: user.id,
        name: user.name,
        email: user.email
    }
    return userMap;
 }

export { UserSearchService }