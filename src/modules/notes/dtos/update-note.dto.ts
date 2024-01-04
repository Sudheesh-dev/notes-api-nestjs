import { IsString, Length, MinLength } from "class-validator";

export class UpdateNoteDto{
    @IsString()
    @MinLength(1)
    title:string;
    @IsString()
    content:string;
}