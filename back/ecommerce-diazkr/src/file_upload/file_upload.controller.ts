import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file_upload.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Rol } from 'src/auth/roles.enum';

@ApiTags('products')
@Controller('files')
export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService){}


    @Post('uploadImage/:id')
    @Roles(Rol.Admin)
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(
        @Param('id') productId: string,
        @UploadedFile(
            new ParseFilePipe({
                validators:[
                    new MaxFileSizeValidator({
                        maxSize:200000,
                        message: 'supera el peso maximo permitido'
                    }), 
                    new FileTypeValidator({
                        fileType: /(jpg|jpeg|png|webp)/,
                    }),
                ]
            })
        ) file: Express.Multer.File,
    ){
        return await this.fileUploadService.uploadImage(file, productId)
    }
    

}
