import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user-schema';
import { from, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  findByUsername(username: string): Observable<User> {
    return from(this.userModel.findOne({ username }).exec());
  }
}
