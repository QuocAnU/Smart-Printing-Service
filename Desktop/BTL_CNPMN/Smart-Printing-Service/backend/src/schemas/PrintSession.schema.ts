import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import {User} from './user.schema'
import {Printer} from './printer.schema'

export type CatDocument = HydratedDocument<PrintSession>;


@Schema()
export class PrintSession{
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true})
    Opener: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Printer'})
    Target: Printer;

    @Prop({ type : Date, default: Date.now })
    OpenedDate: Date;

    @Prop({ type : Date, default: Date.now })
    ClosedDate: Date;

}

export const UserSchema = SchemaFactory.createForClass(PrintSession);