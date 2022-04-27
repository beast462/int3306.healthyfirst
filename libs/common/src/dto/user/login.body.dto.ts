import { IsString, Length } from 'class-validator';

export class LoginBodyDTO {
  @IsString()
  @Length(64, 64, {
    message: 'Answer must be equal to 64 characters',
  })
  answer!: string;
}
