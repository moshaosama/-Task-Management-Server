import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { scrapeLinkedIn } from '../scraper/linkedin-scraper';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async register(email: string, password: string, linkedinUrl: string) {
    if (!this.isValidLinkedInUrl(linkedinUrl)) {
      throw new UnauthorizedException('Invalid LinkedIn URL');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let linkedinData: any = null;
    try {
      // استدعاء scrapeLinkedIn للحصول على بيانات LinkedIn
      linkedinData = await scrapeLinkedIn(email, password);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while scraping LinkedIn data',
      );
    }

    // الآن يمكن استخدام linkedinData عند تسجيل المستخدم
    const user = new this.userModel({
      email,
      password: hashedPassword,
      userName: linkedinData?.subheading?.trim(),
    });

    console.log(linkedinData?.subheading);

    await user.save();
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.generateToken(user);
  }

  private generateToken(user: UserDocument) {
    return {
      user,
      access_token: this.jwtService.sign({ id: user._id, email: user.email }),
    };
  }


  private isValidLinkedInUrl(url: string): boolean {
    const linkedInPattern =
      /^(https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9_-]+)\/?$/;
    return linkedInPattern.test(url);
  }
}
