import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';

// TODO vincular a tag ao seu criador 
// TODO apagar contas e tags criadas
class CreateUserController {
 
    async handle(request: Request, response: Response){
       try {
        const { name, email, password, admin } = request.body; 
        const userService = new CreateUserService();
        const user = await userService.execute({
         name,
         email,
         passwordUser: password, 
         admin}); 
 
        return response.json(user);
       } catch (error) {
           return response.json({message: error.message});
       }
    }
}

export { CreateUserController }