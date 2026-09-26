import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import type { Answer } from '../../quiz/evaluation/evaluation.types.js';

export class AnswerDto implements Answer {
  @IsString()
  @IsNotEmpty()
  questionKey: string;

  @IsString()
  @IsNotEmpty()
  optionKey: string;
}

export class SubmitAttemptDto {
  @IsUUID()
  quizVersionId: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
