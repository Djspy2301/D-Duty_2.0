import {NgModule} from '@angular/core'
import {MatInputModule} from '@angular/material/input'
import {MatToolbarModule} from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatCardModule } from '@angular/material/card'
import { MatRadioModule } from '@angular/material/radio'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatDialogModule } from '@angular/material/dialog'

@NgModule({
    exports: [
        MatInputModule,
        MatToolbarModule,
        MatButtonModule,
        MatSelectModule,
        MatCardModule,
        MatRadioModule,
        MatCheckboxModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
    ]
})
export class MaterialModule{

}