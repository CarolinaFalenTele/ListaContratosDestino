sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("wb.wbprodct.controller.AdaptFiltersDialog", {
     /*   onApplyFilters: function () {
            console.log("onApplyFilters triggered"); //Verifica si este log aparece
            var aSelectedFilters = this.byId("nke").getSelectedKeys(); //Obtener filtros seleccionados 
            var oOwnerComponent = this.getOwnerComponent();
            var oModel = oOwnerComponent.getModel();

            //Actualizar los filtros seleccionados en el modelo principal
            oModel.setProperty("/selectedFilters", aSelectedFilters);

            //Cerrar el diálogo
            this.byId("dialogAdaptFilters").close();
        },

        onCancelFilters: function () {
            console.log("onCancelFilters triggered"); //Verifica si este log aparece
            // this.byId("dialogAdaptFilters").close(); //Cerrar el diálogo
        }*/
    });
});
