import { NgModule } from '@angular/core';
import { MenuItems } from './menu-items/menu-items';
import { ListPlantResolver } from './resolvers/list-plant.resolvers';
import { ModalConfirmComponent } from './helpers/modal-confirm/modal-confirm.component';
import { ListProductResolver } from './resolvers/list-product-resolvers';
import { DetailProductResolver } from './resolvers/detail-product-resolvers';
import { ListCategoryResolver } from './resolvers/list-category-resolvers';
import { DetailCategoryResolver } from './resolvers/detail-category-resolvers';
import { SeparationService } from './services/separation.service';
import { ListSeparationResolver } from './resolvers/list-separation-resolvers';
import { DetailSeparationResolver } from './resolvers/detail-separation-resolvers';
import { AlertifyService } from './services/alertify.service';
import { MatDialogModule } from '@angular/material';
import { ListUserResolver } from './resolvers/list-user-resolvers';
import { DetailUserResolver } from './resolvers/detail-user-resolvers';
import { AuthGuard } from './guards/auth.guard';


@NgModule({
  declarations: [
    ModalConfirmComponent,

  ],
  imports: [
    MatDialogModule
  ],
  exports: [],

  providers: [ MenuItems ,

    AlertifyService,

    ListPlantResolver,

    ListProductResolver,
    DetailProductResolver,

    ListCategoryResolver,
    DetailCategoryResolver,

    SeparationService,
    ListSeparationResolver,
    DetailSeparationResolver,

    DetailUserResolver,
    ListUserResolver,

    AuthGuard

  ],
  entryComponents: [ModalConfirmComponent],
})
export class SharedModule { }
