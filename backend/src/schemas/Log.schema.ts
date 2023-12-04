import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.schema";
import { Printer } from "./printer.schema";

export type PrintLogDocument = HydratedDocument<PrintLog>;
@Schema()
export class PrintLog {
    @Prop({ required: true })
    timeStart: string;

    @Prop({ required: true })
    timeEnd: string;

    @Prop({ required: true })
    numPrintedPage: number;

    @Prop({})
    fileName: string;
    @Prop({})
    userBalance: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    Owner: User;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Printer" })
    Printer: Printer;
}
export const PrintLogSchema = SchemaFactory.createForClass(PrintLog);
