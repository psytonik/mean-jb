import { NgModule } from "@angular/core";

import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ChartModule } from "primeng/chart";
import { ColorPickerModule } from "primeng/colorpicker";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DropdownModule } from "primeng/dropdown";
import { EditorModule } from "primeng/editor";
import { FieldsetModule } from "primeng/fieldset";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { PasswordModule } from "primeng/password";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";

@NgModule({
  imports:[
    ToolbarModule,
    CardModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    ColorPickerModule,
    InputNumberModule,
    InputTextareaModule,
    InputSwitchModule,
    DropdownModule,
    EditorModule,
    TagModule,
    PasswordModule,
    InputMaskModule,
    FieldsetModule,
    ChartModule
  ],
  exports:[
    ToolbarModule,
    CardModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    ColorPickerModule,
    InputNumberModule,
    InputTextareaModule,
    InputSwitchModule,
    DropdownModule,
    EditorModule,
    TagModule,
    PasswordModule,
    InputMaskModule,
    FieldsetModule,
    ChartModule
  ],
  declarations:[],
  providers:[]
})
export class AppUxModule {}
