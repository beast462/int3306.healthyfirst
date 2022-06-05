import {
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
} from '@/common/entity-constraints/user.entity-constraint';
import {
  IsEmail,
  IsNumber,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';

export class CreateUserBodyDTO {
  @Matches(/^[a-z0-9]+$/i)
  @Length(MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH, {
    message: `username must be between ${MIN_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters`,
  })
  @IsString()
  username!: string;

  @Length(1, 64, {
    message: 'display name must be between 1 and 64 characters',
  })
  @IsString()
  displayName!: string;

  @IsEmail()
  @IsString()
  email!: string;

  @Min(1)
  @IsNumber()
  role!: number;

  @IsNumber()
  responsibleLocationCode!: number;
}
