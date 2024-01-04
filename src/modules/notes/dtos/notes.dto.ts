import { IsString, MinLength } from "class-validator";

export class CreateNoteDto{
    @IsString()
    @MinLength(1)
    title:string;
    @IsString()
    content:string;
}

export class UpdateNoteDto{
    @IsString()
    @MinLength(1)
    title:string;
    @IsString()
    content:string;
}

export class AddOrUpdateNotesToElasticDto{
    title:string;
    content:string;
    userId:string;
}