import { IsString, Length } from 'class-validator';

export class GetQuestionQueryDTO {
  @IsString()
  @Length(1, 32)
  username!: string;
}
