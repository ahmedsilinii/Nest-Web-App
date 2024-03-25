import { ArgumentMetadata, Body, Injectable, PipeTransform, Post } from '@nestjs/common';

@Injectable()
export class UpperAndFusionPipe implements PipeTransform {
  transform(entry : {data : string[]}, metadata: ArgumentMetadata) {
    if(metadata.type === 'body'){
      return entry.data.map( (el)=> el.toUpperCase()).join('-');  
    }
    return entry.data;
  }


 
}
