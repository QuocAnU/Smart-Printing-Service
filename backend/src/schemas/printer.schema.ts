import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as mongoose from "mongoose";
import { FileP } from "./File.schema";
import { PrinterLocationDto } from "src/Account/DTO/printer.dto";

export type PrinterDocument = HydratedDocument<Printer>;

@Schema()
export class Printer {
    // @Prop({
    //   required: true,
    //   index: true,
    //   unique: true,
    //   min: 0,
    // })
    // ID: number;

    @Prop()
    Brand: string;

    @Prop()
    PrinterModel: string;

    @Prop()
    ShortDescription: string;

    @Prop({
        type: Object,
        required: true,
    })
    location: Object;

    @Prop({ required: true, default: true })
    Enabled: boolean;

    @Prop({
        required: true,
        enum: {
            values: ["Idle", "Printing", "Error"],
            message: "{VALUE} is not supported",
        },
    })
    PrinterStatus: string; //isIn: ['Idle', 'Printing', 'Error']

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: "FileP" }])
    PrinterQueue: FileP[];

    @Prop({ default: "0.0.0.0" })
    IPAddress: string;

    @Prop({ default: "255.255.0.0" })
    IPMask: string;

    AddToQueue(file: FileP): any {
        this.PrinterQueue.push(file);
    }

    GetQueueLength() {
        return this.PrinterQueue.length;
    }
    GetTop() {
        return this.PrinterQueue[0];
    }

    Pop() {
        var Top = this.PrinterQueue[0];
        this.PrinterQueue.shift();
        return Top;
    }

    Enable() {
        this.Enabled = true;
    }

    Disable = function () {
        this.Enabled = false;
    };

    UpdateLocation = function (newLocation: PrinterLocationDto) {
        this.location = newLocation;
    };
}

export const PrinterSchema = SchemaFactory.createForClass(Printer);

PrinterSchema.methods.AddToQueue = function (object: FileP) {
    console.log(object);
    this.PrinterQueue.push(object);
    console.log(this.PrinterQueue);
    this.save();
};

PrinterSchema.methods.GetQueueLength = function () {
    return this.PrinterQueue.length;
};

PrinterSchema.methods.GetTop = async function (): Promise<FileP> {
    return this.PrinterQueue[0];
};

PrinterSchema.methods.Pop = async function (): Promise<FileP> {
    var Top = this.PrinterQueue[0];
    this.PrinterQueue.shift();
    return Top;
};

PrinterSchema.methods.Enable = async function () {
    this.Enabled = true;
};

PrinterSchema.methods.Disable = async function () {
    this.Enabled = false;
};

PrinterSchema.methods.UpdateLocation = function (newLocation: PrinterLocationDto) {
    this.location = newLocation;
};
