import { IsString, MinLength } from "class-validator";

export class CreateNoteDto{
    @IsString()
    @MinLength(1)
    title:string;
    @IsString()
    content:string;
}